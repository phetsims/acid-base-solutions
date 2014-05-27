// Copyright 2002-2014, University of Colorado Boulder

/**
 * Background of concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var yAxisString = require( 'string!ACID_BASE_SOLUTIONS/concentrationGraph.yAxis' );

  // constants
  var TICK_FONT = new PhetFont( 11 );

  function ConcentrationGraphBackgroundNode( width, height ) {

    Node.call( this );

    // rectangular background
    this.addChild( new Rectangle( 0, 0, width, height, {fill: 'white', stroke: 'black', lineWidth: 0.5} ) );

    // tick marks and horizontal dashed lines. This reuses one tick and one dashed line.
    var dh = ( height / 10 ) - 1;
    var tickNode = new Line( -2, 0, 2, 0, {stroke: 'black', lineWidth: 0.5} );
    var dashedLineNode = new Line( 0, 0, width, 0, { stroke: 'gray', lineWidth: 0.5, lineDash: [2, 1] } );
    for ( var i = 0, y; i < 11; i++ ) {

      y = height - ( dh * i );

      // tick mark and dashed line (no dash on bottom tick)
      this.addChild( new Node( { y: y, children: ( i > 0 ) ? [ tickNode, dashedLineNode ] : [ tickNode ] } ) );

      // add text
      this.addChild( new SubSupText( '10<sup>' + (i - 8) + '</sup>', {centerY: y, centerX: -16, font: TICK_FONT} ) );
    }

    // y-axis label
    var yLabel = new Text( yAxisString, { font: new PhetFont( 13 ) } );
    yLabel.rotate( -Math.PI / 2 );
    yLabel.centerY = height / 2;
    yLabel.centerX = -50;
    this.addChild( yLabel );
  }

  return inherit( Node, ConcentrationGraphBackgroundNode );
} );
