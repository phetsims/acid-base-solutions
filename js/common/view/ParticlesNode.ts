// Copyright 2020-2022, University of Colorado Boulder

/**
 * ParticlesNode draws the particles that appear in the magnifying glass.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import createMoleculeNode from './createMoleculeNode.js';
import MagnifyingGlass from '../model/MagnifyingGlass.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { MoleculeKey } from '../model/solutions/Molecule.js';

// constants
const BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some particles
const BASE_DOTS = 2;
const MAX_PARTICLES = 200;
const IMAGE_SCALE = 2; // stored images are scaled this much to improve quality

// Data structure used to store information for each unique type of particle
type ParticlesData = {
  canvas: HTMLCanvasElement | null;
  numberOfParticles: number;
  xCoordinates: Float32Array;
  yCoordinates: Float32Array;
};

export default class ParticlesNode extends CanvasNode {

  private readonly magnifyingGlass: MagnifyingGlass;
  private readonly positionRadius: number; // radius for computing random positions
  private readonly particlesDataMap: Map<MoleculeKey, ParticlesData>;

  public constructor( magnifyingGlass: MagnifyingGlass, lensBounds: Bounds2, lensLineWidth: number ) {

    super( { canvasBounds: lensBounds } );

    this.magnifyingGlass = magnifyingGlass;

    this.positionRadius = IMAGE_SCALE * ( this.magnifyingGlass.radius - ( lensLineWidth / 2 ) );

    this.particlesDataMap = new Map<MoleculeKey, ParticlesData>();

    // Generate images, to populate ParticlesData.canvas. This happens asynchronously.
    const createCanvas = ( key: MoleculeKey ) => {

      const particleNode = createMoleculeNode( key );

      // Scale up to increase quality. Remember to scale down when drawing to canvas.
      particleNode.setScaleMagnitude( IMAGE_SCALE, IMAGE_SCALE );

      particleNode.toCanvas( ( canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number ) => {
        const particlesData = this.particlesDataMap.get( key )!;
        assert && assert( particlesData );
        particlesData.canvas = canvas;
      } );
    };

    // use typed array if available, it will use less memory and be faster
    const ArrayConstructor = window.Float32Array || window.Array;

    // Iterate over all solutions, and create a ParticlesData structure for each unique particle.
    magnifyingGlass.solutionsMap.forEach( ( solution, solutionType ) => {
      solution.particles.forEach( particle => {
        const key = particle.key;

        // Skip water because it's displayed elsewhere as a static image file.
        // And since different solutions have the same particles, skip creation of duplicates.
        if ( key !== 'H2O' && !this.particlesDataMap.get( key ) ) {
          this.particlesDataMap.set( key, {
            canvas: null,
            numberOfParticles: 0,
            xCoordinates: new ArrayConstructor( MAX_PARTICLES ), // pre-allocate to improve performance
            yCoordinates: new ArrayConstructor( MAX_PARTICLES )  // pre-allocate to improve performance
          } );
          createCanvas( key ); // populate the canvas field asynchronously
        }
      } );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {

    // Reset all particle counts to zero.
    this.particlesDataMap.forEach( ( particlesData, key ) => {
      particlesData.numberOfParticles = 0;
    } );
  }

  // Updates the particles data structure and triggers a paintCanvas.
  public update(): void {

    const solutionType = this.magnifyingGlass.solutionTypeProperty.value;
    const solution = this.magnifyingGlass.solutionsMap.get( solutionType )!;
    assert && assert( solution );

    // Update the data structure for each particle that is in the current solution.
    solution.particles.forEach( particle => {

      const key = particle.key;

      // Skip water because it's displayed elsewhere as a static image file.
      if ( key !== 'H2O' ) {
        const particlesData = this.particlesDataMap.get( key )!;
        assert && assert( particlesData, `no particleData for key=${key}` );

        // map concentration to number of particles
        const concentration = particle.getConcentration();
        const numberOfParticles = getNumberOfParticles( concentration );

        // add additional particles as needed
        const currentNumberOfParticles = particlesData.numberOfParticles;
        for ( let i = currentNumberOfParticles; i < numberOfParticles; i++ ) {

          // random distance from the center of the lens
          const distance = this.positionRadius * Math.sqrt( dotRandom.nextDouble() );
          const angle = dotRandom.nextDouble() * 2 * Math.PI;
          particlesData.xCoordinates[ i ] = distance * Math.cos( angle );
          particlesData.yCoordinates[ i ] = distance * Math.sin( angle );
        }

        particlesData.numberOfParticles = numberOfParticles;
      }
    } );

    // This results in paintCanvas being called.
    this.invalidatePaint();
  }

  /*
   * Iterates over each of the current solution's particles and draws the particles directly to Canvas.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    const solutionType = this.magnifyingGlass.solutionTypeProperty.value;
    const solution = this.magnifyingGlass.solutionsMap.get( solutionType )!;
    assert && assert( solution );

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
          for ( let i = 0; i < particlesData.numberOfParticles; i++ ) {

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
 * https://github.com/phetsims/acid-base-solutions/blob/master/doc/HA_A-_ratio_model.pdf
 */
function getNumberOfParticles( concentration: number ): number {
  const raiseFactor = Utils.log10( concentration / BASE_CONCENTRATION );
  const baseFactor = Math.pow( ( MAX_PARTICLES / BASE_DOTS ), ( 1 / Utils.log10( 1 / BASE_CONCENTRATION ) ) );
  return Utils.roundSymmetric( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
}

acidBaseSolutions.register( 'ParticlesNode', ParticlesNode );