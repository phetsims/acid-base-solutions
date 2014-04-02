// Copyright 2002-2014, University of Colorado Boulder

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
    MagnifierBackgroundNode = require( 'ACID_BASE_SOLUTIONS/common/view/magnifier/MagnifierBackgroundNode' ),
    MagnifierMoleculesLayer = require( 'ACID_BASE_SOLUTIONS/common/view/magnifier/MagnifierMoleculesLayer' );

  /**
   * @param {Magnifier} magnifier
   * @constructor
   */
  function MagnifierNode( magnifier ) {
    var self = this,
      RADIUS = magnifier.radius,
      layers = {};
    Node.call( this, {pickable: false} );

    // add container for molecules
    this.addChild( this.container = new Node() );
    this.container.setClipArea( new Shape().circle( 0, 0, RADIUS - 4 ) );

    // add background
    this.magnifierBackgroundNode = new MagnifierBackgroundNode( this.container, RADIUS );
    this.addChild( this.magnifierBackgroundNode );

    // add molecules layers for each solution
    for ( var key in magnifier.solutions ) {
      var solution = magnifier.solutions[ key ];
      var solutionType = solution.type;
      if ( solutionType in magnifier.solutions ) {
        layers[solutionType] = new Node();
        solution.molecules.forEach( function( molecule ) {
          // get the property that determines the molecule's concentration
          var property = magnifier.solutions[solutionType].property( molecule.concentrationPropertyName );
          if ( molecule.key !== 'H2O' && property.get() ) {
            layers[solutionType].addChild( new MagnifierMoleculesLayer( magnifier, solutionType, property, molecule, RADIUS ) );
          }
        } );
        self.container.addChild( layers[solutionType] );
      }
    }

    this.translation = magnifier.location;
  }

  return inherit( Node, MagnifierNode, {
    setSolventVisible: function( visible ) {
      this.magnifierBackgroundNode.setSolventVisible( visible );
    }
  } );
} );
