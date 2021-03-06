// Copyright 2014-2021, University of Colorado Boulder

/**
 * Factory for creating molecule nodes.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import MinusNode from '../../../../scenery-phet/js/MinusNode.js';
import PlusNode from '../../../../scenery-phet/js/PlusNode.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';

// constants
const MOLECULE_COLORS = ABSColors.MOLECULES;

// NOTE: The field names here must correspond to the 'key' fields in AqueousSolution.molecules.
const MoleculeFactory = {

  A: function() {
    return new Node( {
      children: [
        new AtomNode( 7, MOLECULE_COLORS.A )
      ]
    } );
  },

  B: function() {
    return new Node( {
      children: [
        new AtomNode( 7, MOLECULE_COLORS.B )
      ]
    } );
  },

  BH: function() {
    return new Node( {
      children: [
        new AtomNode( 4, MOLECULE_COLORS.BH, { x: -6, y: -6 } ),
        new AtomNode( 7, MOLECULE_COLORS.BH, { x: 0, y: 0 } )
      ]
    } );
  },

  H2O: function() {
    return new Node( {
      children: [
        new AtomNode( 4, MOLECULE_COLORS.H2O, { x: 0, y: -9 } ),
        new AtomNode( 7, MOLECULE_COLORS.H2O, { x: 0, y: 0 } ),
        new AtomNode( 4, MOLECULE_COLORS.H2O, { x: -6, y: 5 } )
      ]
    } );
  },

  H3O: function() {
    return new Node( {
      children: [
        new AtomNode( 4, MOLECULE_COLORS.H3O, { x: 3, y: -7.5 } ),
        new AtomNode( 4, MOLECULE_COLORS.H3O, { x: 3, y: 7.5 } ),
        new AtomNode( 7, MOLECULE_COLORS.H3O, { x: 0, y: 0 } ),
        new AtomNode( 4, MOLECULE_COLORS.H3O, { x: -8, y: 0 } )
      ]
    } );
  },

  HA: function() {
    return new Node( {
      children: [
        new AtomNode( 7, MOLECULE_COLORS.HA, { x: 0, y: 0 } ),
        new AtomNode( 4, MOLECULE_COLORS.HA, { x: -8, y: -1 } )
      ]
    } );
  },

  M: function() {
    return new Node( {
      children: [
        new AtomNode( 7, MOLECULE_COLORS.M )
      ]
    } );
  },

  MOH: function() {
    return new Node( {
      children: [

        // M icon. Use PlusNode instead of MathSymbols.PLUS because text bounds are inaccurate.
        new AtomNode( 6, MOLECULE_COLORS.MOH, { x: 0, y: 0 } ),
        new PlusNode( {
          size: new Dimension2( 6, 1 ),
          centerX: 0,
          centerY: 10
        } ),

        // OH ion. Use MinusNode instead of MathSymbols.MINUS because text bounds are inaccurate.
        new AtomNode( 7, MOLECULE_COLORS.MOH, { x: 15, y: 0 } ),
        new AtomNode( 4, MOLECULE_COLORS.MOH, { x: 22, y: -4 } ),
        new MinusNode( {
          size: new Dimension2( 6, 1 ),
          centerX: 15,
          centerY: 10
        } )
      ]
    } );
  },

  OH: function() {
    return new Node( {
      children: [
        new AtomNode( 4, MOLECULE_COLORS.OH, { x: 8, y: -3 } ),
        new AtomNode( 7, MOLECULE_COLORS.OH, { x: 0, y: 0 } )
      ]
    } );
  }
};

acidBaseSolutions.register( 'MoleculeFactory', MoleculeFactory );

class AtomNode extends Circle {

  /**
   * @param {number} radius
   * @param {Color|String} color
   * @param {Object} [options]
   */
  constructor( radius, color, options ) {
    const gradient = new RadialGradient( -radius * 0.2, -radius * 0.3, 0.25, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, 'white' )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );
    super( radius, merge( { fill: gradient }, options ) );
  }
}

export default MoleculeFactory;