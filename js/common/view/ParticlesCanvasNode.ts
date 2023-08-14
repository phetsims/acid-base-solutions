// Copyright 2020-2023, University of Colorado Boulder

/**
 * ParticlesCanvasNode uses a canvas to draw the particles that appear in the magnifying glass.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import createParticleNode from './createParticleNode.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { ParticleKey } from '../model/solutions/Particle.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import AqueousSolution from '../model/solutions/AqueousSolution.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

// constants
const BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some particles
const BASE_DOTS = 2;
const MAX_PARTICLES = 200;
const IMAGE_SCALE = 2; // stored images are scaled this much to improve quality

// Data structure used to store information for each unique type of particle
type ParticlesData = {
  canvas: HTMLCanvasElement | null;

  // The number of particles of this type to draw
  count: number;

  // This is a Property that can be inspected in Studio and the PhET-iO data stream. We should only write to it herein,
  // and not read from it. Reading from it results in ordering problems when restoring PhET-iO state, resulting in an
  // incorrect number of particles. See https://github.com/phetsims/acid-base-solutions/issues/195.
  countProperty: Property<number>;

  // Note that particle positions are not PhET-iO stateful. See https://github.com/phetsims/acid-base-solutions/issues/201
  xCoordinates: Float32Array;
  yCoordinates: Float32Array;
};

export default class ParticlesCanvasNode extends CanvasNode {

  private readonly solutionProperty: TReadOnlyProperty<AqueousSolution>;
  private readonly positionRadius: number; // radius for computing random positions
  private readonly particlesDataMap: Map<ParticleKey, ParticlesData>;

  public constructor( solutions: AqueousSolution[], solutionProperty: TReadOnlyProperty<AqueousSolution>,
                      lensRadius: number, lensLineWidth: number, countsTandem: Tandem ) {

    super( {
      canvasBounds: new Bounds2( -lensRadius, -lensRadius, lensRadius, lensRadius ), // origin at center
      isDisposable: false
    } );

    this.solutionProperty = solutionProperty;

    this.positionRadius = IMAGE_SCALE * ( lensRadius - ( lensLineWidth / 2 ) );

    this.particlesDataMap = new Map<ParticleKey, ParticlesData>();

    // Generate images, to populate ParticlesData.canvas. This happens asynchronously.
    const createCanvas = ( key: ParticleKey ) => {

      const particleNode = createParticleNode( key );

      // Scale up to increase quality. Remember to scale down when drawing to canvas.
      particleNode.setScaleMagnitude( IMAGE_SCALE, IMAGE_SCALE );

      particleNode.toCanvas( ( canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number ) => {
        const particlesData = this.particlesDataMap.get( key )!;
        assert && assert( particlesData );
        particlesData.canvas = canvas;
      } );
    };

    // Use typed array if available. It will use less memory and be faster.
    const ArrayConstructor = window.Float32Array || window.Array;

    // Iterate over all solutions, and create a ParticlesData structure for each unique particle.
    solutions.forEach( solution => {
      solution.particles.forEach( particle => {
        const key = particle.key;

        // Skip water because it's displayed elsewhere as a static image file.
        // And since different solutions have the same particles, skip creation of duplicates.
        if ( key !== 'H2O' && !this.particlesDataMap.get( key ) ) {

          this.particlesDataMap.set( key, {
            canvas: null,
            count: 0,
            countProperty: new NumberProperty( 0, {
              isValidValue: value => Number.isInteger( value ) && ( value >= 0 ),
              tandem: countsTandem.createTandem( `count${key}Property` ),
              phetioReadOnly: true
            } ),
            xCoordinates: new ArrayConstructor( MAX_PARTICLES ), // pre-allocate to improve performance
            yCoordinates: new ArrayConstructor( MAX_PARTICLES )  // pre-allocate to improve performance
          } );

          createCanvas( key ); // populate the canvas field asynchronously
        }
      } );
    } );
  }

  public reset(): void {

    // Reset all particle counts to zero.
    this.particlesDataMap.forEach( ( particlesData, key ) => {
      particlesData.countProperty.value = 0;
      particlesData.count = 0;
    } );
  }

  // Updates the particles data structure and triggers a paintCanvas.
  public update(): void {

    const solution = this.solutionProperty.value;

    // Update the data structure for each particle that is in the current solution.
    solution.particles.forEach( particle => {

      const key = particle.key;

      // Skip water because it's displayed elsewhere as a static image file (the 'Solvent' view).
      if ( key !== 'H2O' ) {
        const particlesData = this.particlesDataMap.get( key )!;
        assert && assert( particlesData, `no particleData for key=${key}` );

        // map concentration to number of particles
        const concentration = particle.getConcentration();
        const newCount = getParticleCount( concentration );

        // add additional particles as needed
        const oldCount = particlesData.count;
        for ( let i = oldCount; i < newCount; i++ ) {

          // random distance from the center of the lens
          const distance = this.positionRadius * Math.sqrt( dotRandom.nextDouble() );
          const angle = dotRandom.nextDouble() * 2 * Math.PI;
          particlesData.xCoordinates[ i ] = distance * Math.cos( angle );
          particlesData.yCoordinates[ i ] = distance * Math.sin( angle );
        }

        particlesData.count = newCount;
        particlesData.countProperty.value = newCount;
      }
    } );

    // This results in paintCanvas being called.
    this.invalidatePaint();
  }

  /*
   * Iterates over each of the current solution's particles and draws the particles directly to Canvas.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    const solution = this.solutionProperty.value;

    // createCanvas created HTMLCanvasElement at a higher resolution to improve quality.
    // So apply the inverse scale factor, and adjust the radius.
    context.scale( 1 / IMAGE_SCALE, 1 / IMAGE_SCALE );

    // Draw each type of particle that is in the current solution.
    solution.particles.forEach( particle => {
      const key = particle.key;

      // Skip water because it's displayed elsewhere as a static image file.
      if ( key !== 'H2O' ) {
        const particlesData = this.particlesDataMap.get( key )!;
        assert && assert( particlesData );

        // Images are generated asynchronously, so test in case they aren't available when this is first called.
        if ( particlesData.canvas ) {
          for ( let i = 0; i < particlesData.count; i++ ) {

            // Use integer coordinates with drawImage to improve performance.
            const x = Math.floor( particlesData.xCoordinates[ i ] - particlesData.canvas.width / 2 );
            const y = Math.floor( particlesData.yCoordinates[ i ] - particlesData.canvas.height / 2 );
            context.drawImage( particlesData.canvas, x, y );
          }
        }
      }
    } );
  }
}

/**
 * Compute the number of particles that corresponds to some concentration.
 * This algorithm was ported from the Java implementation, and is documented in
 * https://github.com/phetsims/acid-base-solutions/blob/main/doc/HA_A-_ratio_model.pdf
 */
function getParticleCount( concentration: number ): number {
  const raiseFactor = Utils.log10( concentration / BASE_CONCENTRATION );
  const baseFactor = Math.pow( ( MAX_PARTICLES / BASE_DOTS ), ( 1 / Utils.log10( 1 / BASE_CONCENTRATION ) ) );
  return Utils.roundSymmetric( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
}

acidBaseSolutions.register( 'ParticlesCanvasNode', ParticlesCanvasNode );