// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for magnifier in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Shape = require( 'KITE/Shape' ),

    MagnifierBackground = require( './MagnifierBackground' ),
    MagnifierMoleculesLayer = require( './MagnifierMoleculesLayer' );

  function Magnifier( magnifierModel ) {
    var self = this,
      RADIUS = magnifierModel.radius,
      layers = {};
    Node.call( this, {pickable: false} );

    // add container for molecules
    this.addChild( this.container = new Node() );
    this.container.setClipArea( new Shape().circle( 0, 0, RADIUS - 4 ) );

    // add background
    this.addChild( new MagnifierBackground( magnifierModel.solvent, this.container, RADIUS ) );

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

    magnifierModel.visibility.link( function( isVisible ) {
      self.setVisible( isVisible );
    } );
  }

  return inherit( Node, Magnifier );
} );
