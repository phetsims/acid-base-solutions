// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for magnifier in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Shape = require( 'KITE/Shape' ),

    MagnifierBackground = require( './MagnifierBackground' ),
    MagnifierMoleculesLayer = require( './MagnifierMoleculesLayer' );

  function Magnifier( model, options ) {
    var self = this,
      radius = model.height / 3.6,
      layers = {};
    Node.call( this, options );
    this.model = model;

    // add container for molecules
    this.addChild( this.container = new Node() );
    this.container.setClipArea( new Shape().circle( 0, 0, radius - 4 ) );

    // add background
    this.addChild( new MagnifierBackground( model, this.container, radius ) );

    // add molecules layers for each solution
    model.SOLUTIONS.forEach( function( solution ) {
      var type = solution.type, property;
      if ( type in model.components ) {
        layers[type] = {node: new Node( {visible: false} ), layer: []};
        solution.relations.forEach( function( molecule, i ) {
          property = model.components[type].property( molecule.property );
          if ( molecule.type !== 'H2O' && property.get() ) {
            layers[type].layer[i] = new MagnifierMoleculesLayer( model, property, molecule.type, radius );
            layers[type].node.addChild( layers[type].layer[i] );
          }
        } );
        self.container.addChild( layers[type].node );
      }
    } );

    model.property( 'solution' ).link( function( newSolution, prevSolution ) {
      // show new layers
      layers[newSolution].node.setVisible( true );
      layers[newSolution].layer.forEach( function( layer ) {
        layer.update();
      } );

      // hide previous layers
      if ( prevSolution ) {
        layers[prevSolution].node.setVisible( false );
      }
    } );

    model.property( 'viewMode' ).link( this.checkVisibility.bind( this ) );
    model.property( 'testMode' ).link( this.checkVisibility.bind( this ) );
  }

  return inherit( Node, Magnifier, {
    checkVisibility: function() {
      this.setVisible( this.model.viewMode === 'MOLECULES' && this.model.testMode !== 'CONDUCTIVITY' );
    }
  } );
} );
