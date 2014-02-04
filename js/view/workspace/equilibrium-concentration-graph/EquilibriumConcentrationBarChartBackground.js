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
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Line = require( 'SCENERY/nodes/Line' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT_BIG = new PhetFont( 11 ),
    FONT_SMALL = new PhetFont( 7 ),

  // strings
    yAxisString = require( 'string!ACID_BASE_SOLUTIONS/concentrationGraph.yAxis' );

  function EquilibriumConcentrationBarChartBackground( width, height ) {
    var yLabel, dh = height / 10 - 1;
    Node.call( this );

    this.addChild( new Rectangle( 0, 0, width, height, {fill: 'white', stroke: 'black', lineWidth: 0.5} ) );

    // add y-label
    yLabel = new Text( yAxisString, {font: new PhetFont( 13 )} );
    yLabel.rotate( -Math.PI / 2 );
    yLabel.centerY = height / 2;
    yLabel.centerX = -40;
    this.addChild( yLabel );

    for ( var i = 0, y, node; i < 11; i++ ) {
      y = height - dh * i;
      // add tick
      this.addChild( node = new Node( {y: y, children: [
        new Line( -2, 0, 2, 0, {stroke: 'black', lineWidth: 0.5} )
      ]} ) );

      // add dash line for all except bottom line
      if ( i ) {
        node.addChild( new Line( 0, 0, width, 0, {stroke: 'gray', lineWidth: 0.5, lineDash: [2, 1]} ) );
      }

      // add text
      this.addChild( new Node( {centerY: y, children: [
        new Text( '10', {font: FONT_BIG, centerX: -16, centerY: 0} ),
        new Text( i - 8, {font: FONT_SMALL, x: -9.5} )
      ]} ) );
    }
  }

  return inherit( Node, EquilibriumConcentrationBarChartBackground );
} );
