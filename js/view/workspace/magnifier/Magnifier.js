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
      var type = solution.type, property;
      if ( type in magnifierModel.components ) {
        layers[type] = new Node();
        solution.relations.forEach( function( molecule ) {
          property = magnifierModel.components[type].property( molecule.property );
          if ( molecule.type !== 'H2O' && property.get() ) {
            layers[type].addChild( new MagnifierMoleculesLayer( magnifierModel, type, property, molecule.type, RADIUS ) );
          }
        } );
        self.container.addChild( layers[type] );
      }
    } );

    this.translation = magnifierModel.location;

    magnifierModel.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );
  }

  return inherit( Node, Magnifier );
} );
