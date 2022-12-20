// Copyright 2020-2022, University of Colorado Boulder

/**
 * ParticlesNode draws the molecules that appear in the magnifying glass.
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
const BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules
const BASE_DOTS = 2;
const MAX_MOLECULES = 200;
const IMAGE_SCALE = 2; // stored images are scaled this much to improve quality

// Data structure used to store information for each unique type of molecule
type MoleculesData = {
  canvas: HTMLCanvasElement | null;
  numberOfMolecules: number;
  xCoordinates: Float32Array;
  yCoordinates: Float32Array;
};

export default class ParticlesNode extends CanvasNode {

  private readonly magnifyingGlass: MagnifyingGlass;
  private readonly positionRadius: number; // radius for computing random positions
  private readonly moleculesDataMap: Map<MoleculeKey, MoleculesData>;

  public constructor( magnifyingGlass: MagnifyingGlass, lensBounds: Bounds2, lensLineWidth: number ) {

    super( { canvasBounds: lensBounds } );

    this.magnifyingGlass = magnifyingGlass;

    this.positionRadius = IMAGE_SCALE * ( this.magnifyingGlass.radius - ( lensLineWidth / 2 ) );

    this.moleculesDataMap = new Map<MoleculeKey, MoleculesData>();

    // Generate images, to populate MoleculesData.canvas. This happens asynchronously.
    const createCanvas = ( key: MoleculeKey ) => {

      const moleculeNode = createMoleculeNode( key );

      // Scale up to increase quality. Remember to scale down when drawing to canvas.
      moleculeNode.setScaleMagnitude( IMAGE_SCALE, IMAGE_SCALE );

      moleculeNode.toCanvas( ( canvas: HTMLCanvasElement, x: number, y: number, width: number, height: number ) => {
        const moleculesData = this.moleculesDataMap.get( key )!;
        assert && assert( moleculesData );
        moleculesData.canvas = canvas;
      } );
    };

    // use typed array if available, it will use less memory and be faster
    const ArrayConstructor = window.Float32Array || window.Array;

    // Iterate over all solutions, and create a MoleculesData structure for each unique molecule.
    magnifyingGlass.solutionsMap.forEach( ( solution, solutionType ) => {
      solution.molecules.forEach( molecule => {
        const key = molecule.key;

        // Skip water because it's displayed elsewhere as a static image file.
        // And since different solutions have the same molecules, skip creation of duplicates.
        if ( key !== 'H2O' && !this.moleculesDataMap.get( key ) ) {
          this.moleculesDataMap.set( key, {
            canvas: null,
            numberOfMolecules: 0,
            xCoordinates: new ArrayConstructor( MAX_MOLECULES ), // pre-allocate to improve performance
            yCoordinates: new ArrayConstructor( MAX_MOLECULES )  // pre-allocate to improve performance
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

    // Reset all molecule counts to zero.
    this.moleculesDataMap.forEach( ( moleculesData, key ) => {
      moleculesData.numberOfMolecules = 0;
    } );
  }

  // Updates the molecules data structure and triggers a paintCanvas.
  public update(): void {

    const solutionType = this.magnifyingGlass.solutionTypeProperty.value;
    const solution = this.magnifyingGlass.solutionsMap.get( solutionType )!;
    assert && assert( solution );

    // Update the data structure for each molecule that is in the current solution.
    solution.molecules.forEach( molecule => {

      const key = molecule.key;

      // Skip water because it's displayed elsewhere as a static image file.
      if ( key !== 'H2O' ) {
        const moleculesData = this.moleculesDataMap.get( key )!;
        assert && assert( moleculesData, `no moleculeData for key=${key}` );

        // map concentration to number of molecules
        const concentration = molecule.getConcentration();
        const numberOfMolecules = getNumberOfMolecules( concentration );

        // add additional molecules as needed
        const currentNumberOfMolecules = moleculesData.numberOfMolecules;
        for ( let i = currentNumberOfMolecules; i < numberOfMolecules; i++ ) {

          // random distance from the center of the lens
          const distance = this.positionRadius * Math.sqrt( dotRandom.nextDouble() );
          const angle = dotRandom.nextDouble() * 2 * Math.PI;
          moleculesData.xCoordinates[ i ] = distance * Math.cos( angle );
          moleculesData.yCoordinates[ i ] = distance * Math.sin( angle );
        }

        moleculesData.numberOfMolecules = numberOfMolecules;
      }
    } );

    // This results in paintCanvas being called.
    this.invalidatePaint();
  }

  /*
   * Iterates over each of the current solution's molecules and draws the molecules directly to Canvas.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    const solutionType = this.magnifyingGlass.solutionTypeProperty.value;
    const solution = this.magnifyingGlass.solutionsMap.get( solutionType )!;
    assert && assert( solution );

    // createCanvas created HTMLCanvasElement at a higher resolution to improve quality.
    // So apply the inverse scale factor, and adjust the radius.
    context.scale( 1 / IMAGE_SCALE, 1 / IMAGE_SCALE );

    // Draw each type of molecule that is in the current solution.
    solution.molecules.forEach( molecule => {
      const key = molecule.key;

      // Skip water because it's displayed elsewhere as a static image file.
      if ( key !== 'H2O' ) {
        const moleculesData = this.moleculesDataMap.get( key )!;
        assert && assert( moleculesData );

        // Images are generated asynchronously, so test in case they aren't available when this is first called.
        if ( moleculesData.canvas ) {
          for ( let i = 0; i < moleculesData.numberOfMolecules; i++ ) {

            // Use integer coordinates with drawImage to improve performance.
            const x = Math.floor( moleculesData.xCoordinates[ i ] - moleculesData.canvas.width / 2 );
            const y = Math.floor( moleculesData.yCoordinates[ i ] - moleculesData.canvas.height / 2 );
            context.drawImage( moleculesData.canvas, x, y );
          }
        }
      }
    } );
  }
}

/**
 * Compute the number of molecules that corresponds to some concentration.
 * This algorithm was ported from the Java implementation, and is documented in
 * https://github.com/phetsims/acid-base-solutions/blob/master/doc/HA_A-_ratio_model.pdf
 */
function getNumberOfMolecules( concentration: number ): number {
  const raiseFactor = Utils.log10( concentration / BASE_CONCENTRATION );
  const baseFactor = Math.pow( ( MAX_MOLECULES / BASE_DOTS ), ( 1 / Utils.log10( 1 / BASE_CONCENTRATION ) ) );
  return Utils.roundSymmetric( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
}

acidBaseSolutions.register( 'ParticlesNode', ParticlesNode );