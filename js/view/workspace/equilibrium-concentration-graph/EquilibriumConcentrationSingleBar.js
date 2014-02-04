// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for single bar
 * in concentration chart in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function EquilibriumConcentrationBarChart( model, options ) {
    var rectangle;
    Node.call( this );

    this.addChild( rectangle = new Rectangle( 0, 0, 25, 50, {fill: options.fill} ) );
    rectangle.rotate( Math.PI );
  }

  return inherit( Node, EquilibriumConcentrationBarChart );
} );
