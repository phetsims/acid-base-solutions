// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for magnifier in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Shape = require( 'KITE/Shape' ),
    MagnifierBackground = require( 'ACID_BASE_SOLUTIONS/view/workspace/magnifier/MagnifierBackground' ),
    MagnifierMoleculesLayer = require( 'ACID_BASE_SOLUTIONS/view/workspace/magnifier/MagnifierMoleculesLayer' );

  /**
   * @param {MagnifierModel} magnifierModel
   * @constructor
   */
  function Magnifier( magnifierModel ) {
    var self = this,
      RADIUS = magnifierModel.radius,
      layers = {};
    Node.call( this, {pickable: false} );

    // add container for molecules
    this.addChild( this.container = new Node() );
    this.container.setClipArea( new Shape().circle( 0, 0, RADIUS - 4 ) );

    // add background
    this.addChild( new MagnifierBackground( magnifierModel.solventVisibleProperty, this.container, RADIUS ) );

    // add molecules layers for each solution
    magnifierModel.solutions.forEach( function( solution ) {
      var solutionType = solution.type;
      if ( solutionType in magnifierModel.components ) {
        layers[solutionType] = new Node();
        solution.molecules.forEach( function( molecule ) {
          // get the property that determines the molecule's concentration
          var property = magnifierModel.components[solutionType].property( molecule.concentrationPropertyName );
          if ( molecule.key !== 'H2O' && property.get() ) {
            layers[solutionType].addChild( new MagnifierMoleculesLayer( magnifierModel, solutionType, property, molecule, RADIUS ) );
          }
        } );
        self.container.addChild( layers[solutionType] );
      }
    } );

    this.translation = magnifierModel.location;

    magnifierModel.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );
  }

  return inherit( Node, Magnifier );
} );
