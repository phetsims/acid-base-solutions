// Copyright 2014-2020, University of Colorado Boulder

/**
 * Visual representation of a beaker that is filled to the top with a solution.
 * Ticks on the right edge of the beaker. Origin is at the bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );

  // strings
  const litersString = require( 'string!ACID_BASE_SOLUTIONS/liters' );
  const pattern0Value1UnitsString = require( 'string!ACID_BASE_SOLUTIONS/pattern.0value.1units' );

  // constants
  const MAJOR_TICK_LENGTH = 25;
  const MINOR_TICK_LENGTH = 10;
  const MINOR_TICKS_PER_MAJOR_TICK = 5;
  const MINOR_TICK_SPACING = 0.1; // L
  const RIM_OFFSET = 10;
  const TICK_LABEL_X_SPACING = 5;

  /**
   * @param {Beaker} beaker
   * @constructor
   */
  function BeakerNode( beaker ) {

    Node.call( this, { pickable: false } );

    const BEAKER_WIDTH = beaker.size.width;
    const BEAKER_HEIGHT = beaker.size.height;

    // water, starting from upper left
    const waterShape = new Shape().lineTo( -BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
      .lineTo( -BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, -BEAKER_HEIGHT );
    this.addChild( new Path( waterShape, {
      fill: 'rgba(193,222,227,0.7)'
    } ) );

    // beaker, starting from upper left
    const beakerShape = new Shape()
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
    const ticksParent = new Node();
    this.addChild( ticksParent );

    // tick marks
    const NUMBER_OF_TICKS = Utils.roundSymmetric( 1 / MINOR_TICK_SPACING );
    const deltaY = BEAKER_HEIGHT / NUMBER_OF_TICKS;
    let isMajorTick;
    let y;
    let leftX;
    let rightX;
    let tickPath;
    for ( let i = 1; i <= NUMBER_OF_TICKS; i++ ) {

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
    const label = StringUtils.format( pattern0Value1UnitsString, '1', litersString );
    ticksParent.addChild( new Text( label, {
      font: new PhetFont( 18 ),
      fill: 'black',
      right: BEAKER_WIDTH / 2 - MAJOR_TICK_LENGTH - TICK_LABEL_X_SPACING,
      centerY: -deltaY * NUMBER_OF_TICKS,
      maxWidth: 65 // constrain width for i18n
    } ) );

    this.translation = beaker.position;
  }

  acidBaseSolutions.register( 'BeakerNode', BeakerNode );

  return inherit( Node, BeakerNode, {}, {

    // @public @static
    createIcon: function( width, height ) {
      const lipOffset = 0.1 * width;
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
