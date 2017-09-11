// Copyright 2014-2015, University of Colorado Boulder

/**
 * Visual representation of a beaker that is filled to the top with a solution.
 * Ticks on the right edge of the beaker. Origin is at the bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var litersString = require( 'string!ACID_BASE_SOLUTIONS/liters' );
  var pattern0Value1UnitsString = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1units' );

  // constants
  var MAJOR_TICK_LENGTH = 25;
  var MINOR_TICK_LENGTH = 10;
  var MINOR_TICKS_PER_MAJOR_TICK = 5;
  var MINOR_TICK_SPACING = 0.1; // L
  var RIM_OFFSET = 10;
  var TICK_LABEL_X_SPACING = 5;

  /**
   * @param {Beaker} beaker
   * @constructor
   */
  function BeakerNode( beaker ) {

    Node.call( this, { pickable: false } );

    var BEAKER_WIDTH = beaker.size.width;
    var BEAKER_HEIGHT = beaker.size.height;

    // water, starting from upper left
    var waterShape = new Shape().lineTo( -BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
      .lineTo( -BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, -BEAKER_HEIGHT );
    this.addChild( new Path( waterShape, {
      fill: 'rgba(193,222,227,0.7)'
    } ) );

    // beaker, starting from upper left
    var beakerShape = new Shape()
      .moveTo( -BEAKER_WIDTH / 2 - RIM_OFFSET, -BEAKER_HEIGHT - RIM_OFFSET )
      .lineTo( -BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
      .lineTo( -BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
      .lineTo( (BEAKER_WIDTH / 2) + RIM_OFFSET, -BEAKER_HEIGHT - RIM_OFFSET );
    this.addChild( new Path( beakerShape, {
      stroke: 'black',
      lineWidth: 3,
      lineCap: 'round',
      lineJoin: 'round'
    } ) );

    // horizontal tick marks, right edge, from bottom up
    var ticksParent = new Node();
    this.addChild( ticksParent );

    // tick marks
    var NUMBER_OF_TICKS = Math.round( 1 / MINOR_TICK_SPACING );
    var deltaY = BEAKER_HEIGHT / NUMBER_OF_TICKS;
    var isMajorTick;
    var y;
    var leftX;
    var rightX;
    var tickPath;
    for ( var i = 1; i <= NUMBER_OF_TICKS; i++ ) {

      isMajorTick = ( i % MINOR_TICKS_PER_MAJOR_TICK === 0 );
      y = -( i * deltaY );
      leftX = BEAKER_WIDTH / 2;
      rightX = leftX - ( isMajorTick ? MAJOR_TICK_LENGTH : MINOR_TICK_LENGTH );

      tickPath = new Path( new Shape().moveTo( leftX, y ).lineTo( rightX, y ), {
        stroke: 'black',
        lineWidth: 1.5,
        lineCap: 'round',
        lineJoin: 'bevel'
      } );
      ticksParent.addChild( tickPath );
    }

    // major tick label
    var label = StringUtils.format( pattern0Value1UnitsString, '1', litersString );
    ticksParent.addChild( new Text( label, {
      font: new PhetFont( 18 ),
      fill: 'black',
      right: BEAKER_WIDTH / 2 - MAJOR_TICK_LENGTH - TICK_LABEL_X_SPACING,
      centerY: -deltaY * NUMBER_OF_TICKS,
      maxWidth: 65 // constrain width for i18n
    } ) );

    this.translation = beaker.location;
  }

  acidBaseSolutions.register( 'BeakerNode', BeakerNode );

  return inherit( Node, BeakerNode, {}, {

    // @public @static
    createIcon: function( width, height ) {
      var lipOffset = 0.1 * width;
      return new Node( {
        children: [
          // water
          new Rectangle( 0, 0, width, height, { fill: 'rgb(213,231,233)' } ),
          // beaker
          new Path( new Shape()
            .moveTo( -lipOffset, -lipOffset )
            .lineTo( 0, 0 )
            .lineTo( 0, height )
            .lineTo( width, height )
            .lineTo( width, 0 )
            .lineTo( width + lipOffset, -lipOffset ),
            { stroke: 'black', lineWidth: 1.5 } )
        ]
      } );
    }
  } );
} );
