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
    ViewModes = require( 'model/ViewModes' ),
    TestModes = require( 'model/TestModes' ),

    MagnifierBackground = require( './MagnifierBackground' ),
    MagnifierMoleculesLayer = require( './MagnifierMoleculesLayer' );

  function Magnifier( model, options ) {
    var self = this,
      RADIUS = model.height / 3.6,
      layers = {};
    Node.call( this, options );
    this.setPickable( false );
    this.model = model;

    // add container for molecules
    this.addChild( this.container = new Node() );
    this.container.setClipArea( new Shape().circle( 0, 0, RADIUS - 4 ) );

    // add background
    this.addChild( new MagnifierBackground( model, this.container, RADIUS ) );

    // add molecules layers for each solution
    model.SOLUTIONS.forEach( function( solution ) {
      var type = solution.type, property;
      if ( type in model.components ) {
        layers[type] = new Node();
        solution.relations.forEach( function( molecule ) {
          property = model.components[type].property( molecule.property );
          if ( molecule.type !== 'H2O' && property.get() ) {
            layers[type].addChild( new MagnifierMoleculesLayer( model, type, property, molecule.type, RADIUS ) );
          }
        } );
        self.container.addChild( layers[type] );
      }
    } );

    model.property( 'viewMode' ).link( this.checkVisibility.bind( this ) );
    model.property( 'testMode' ).link( this.checkVisibility.bind( this ) );

    /*model.property( 'solution' ).link( function( newSolution, prevSolution ) {
      if ( prevSolution ) {
        self.container.removeChild( layers[prevSolution] );
      }
      self.container.addChild( layers[newSolution] );
    } );*/
  }

  return inherit( Node, Magnifier, {
    checkVisibility: function() {
      this.setVisible( this.model.viewMode === ViewModes.MOLECULES && this.model.testMode !== TestModes.CONDUCTIVITY );
    }
  } );
} );
