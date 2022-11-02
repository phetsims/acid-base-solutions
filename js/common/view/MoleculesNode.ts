// Copyright 2020-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * MoleculesNode draws the molecules that appear in the magnifying glass.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import MoleculeFactory from './MoleculeFactory.js';

// constants
const BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules
const BASE_DOTS = 2;
const MAX_MOLECULES = 200;
const IMAGE_SCALE = 2; // stored images are scaled this much to improve quality

class MoleculesNode extends CanvasNode {

  /**
   * @param {Magnifier} magnifier
   * @param {Bounds2} lensBounds
   * @param {number} lensLineWidth
   */
  constructor( magnifier, lensBounds, lensLineWidth ) {

    super( { canvasBounds: lensBounds } );

    // @private
    this.magnifier = magnifier;

    // @private radius for computing random positions
    this.positionRadius = IMAGE_SCALE * ( this.magnifier.radius - ( lensLineWidth / 2 ) );

    // Generate images, this happens asynchronously.
    const createImage = moleculeKey => {
      const moleculeNode = MoleculeFactory[ moleculeKey ]();
      // Scale up to increase quality. Remember to scale down when drawing to canvas.
      moleculeNode.setScaleMagnitude( IMAGE_SCALE, IMAGE_SCALE );
      moleculeNode.toCanvas( ( canvas, x, y, width, height ) => {
        this.moleculesData[ moleculeKey ].canvas = canvas;
      } );
    };

    // use typed array if available, it will use less memory and be faster
    const ArrayConstructor = window.Float32Array || window.Array;

    /*
     * Iterate over all solutions and their molecules.
     * Build a data structure that we'll use to store information for each unique type of molecule.
     * The data structure looks like:
     *
     * {
     *    A:   { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    B:   { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    BH:  { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    H3O: { canvas:..., numberOfMolecules:..., xCoordinates: [...], yCoordinates: [...] },
     *    ...
     * }
     *
     * Note that the field names of this.moleculesData will correspond to the 'key' fields in AqueousSolution.molecules.
     * We skip water because it's displayed elsewhere as a static image file.
     */
    this.moleculesData = {};
    magnifier.solutionsMap.forEach( ( solution, solutionType ) => {
      solution.molecules.forEach( molecule => {
        if ( molecule.key !== 'H2O' && !this.moleculesData.hasOwnProperty( molecule.key ) ) {
          this.moleculesData[ molecule.key ] = {
            canvas: null, // {HTMLCanvasElement}
            numberOfMolecules: 0, // {number}
            // pre-allocate arrays to improve performance
            xCoordinates: new ArrayConstructor( MAX_MOLECULES ), // {number[]}
            yCoordinates: new ArrayConstructor( MAX_MOLECULES ) // {number[]}
          };
          createImage( molecule.key ); // populate the image field asynchronously
        }
      } );
    } );
  }

  // @public Resets all molecule counts to zero.
  reset() {
    for ( const key in this.moleculesData ) {
      this.moleculesData[ key ].numberOfMolecules = 0;
    }
  }

  // @public Updates the molecules data structure and triggers a paintCanvas.
  update() {

    const solutionType = this.magnifier.solutionTypeProperty.get();
    const solution = this.magnifier.solutionsMap.get( solutionType );

    // Update the data structure for each molecule that is in the current solution.
    solution.molecules.forEach( molecule => {

      const key = molecule.key;
      const moleculesData = this.moleculesData[ key ];

      if ( key !== 'H2O' ) { // skip water because it's displayed elsewhere as a static image file
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
   * @override
   * @public
   * @param {CanvasRenderingContext2D} context
   */
  paintCanvas( context ) {

    const solutionType = this.magnifier.solutionTypeProperty.get();
    const solution = this.magnifier.solutionsMap.get( solutionType );

    /*
     * Images are stored at a higher resolution to improve their quality.
     * Apply the inverse scale factor to the graphics context, and adjust the radius.
     */
    context.scale( 1 / IMAGE_SCALE, 1 / IMAGE_SCALE );

    // Draw each type of molecule that is in the current solution.
    solution.molecules.forEach( molecule => {
      const key = molecule.key;
      if ( key !== 'H2O' ) {
        const moleculeData = this.moleculesData[ key ];
        // images are generated asynchronously, so test in case they aren't available when this is first called
        if ( moleculeData.canvas ) {
          for ( let i = 0; i < moleculeData.numberOfMolecules; i++ ) {
            const x = moleculeData.xCoordinates[ i ] - moleculeData.canvas.width / 2;
            const y = moleculeData.yCoordinates[ i ] - moleculeData.canvas.height / 2;
            context.drawImage( moleculeData.canvas, Math.floor( x ), Math.floor( y ) ); // Use integer coordinates with drawImage to improve performance.
          }
        }
      }
    } );
  }
}

/**
 * Compute the number of molecules that corresponds to some concentration.
 * This algorithm was ported from the Java implementation, and is documented in acid-base-solutions/doc/HA_A-_ratio_model.pdf.
 * @param {number} concentration
 * @returns {number}
 */
function getNumberOfMolecules( concentration ) {
  const raiseFactor = Utils.log10( concentration / BASE_CONCENTRATION );
  const baseFactor = Math.pow( ( MAX_MOLECULES / BASE_DOTS ), ( 1 / Utils.log10( 1 / BASE_CONCENTRATION ) ) );
  return Utils.roundSymmetric( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
}

acidBaseSolutions.register( 'MoleculesNode', MoleculesNode );
export default MoleculesNode;