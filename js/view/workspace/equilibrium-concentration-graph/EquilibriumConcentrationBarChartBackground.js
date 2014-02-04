// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for background of
 * concentration bar chart in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function EquilibriumConcentrationBarChartBackground( width, height ) {
    Node.call( this );

    this.addChild( new Rectangle( 0, 0, width, height, {fill: 'white', stroke: 'black', lineWidth: 0.5} ) );
  }

  return inherit( Node, EquilibriumConcentrationBarChartBackground );
} );
