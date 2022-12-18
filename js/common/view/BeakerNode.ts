// Copyright 2014-2022, University of Colorado Boulder

/**
 * Visual representation of a beaker that is filled to the top with a solution.
 * Ticks on the right edge of the beaker. Origin is at the bottom center.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Path, Rectangle, Text } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import Beaker from '../model/Beaker.js';

// constants
const MAJOR_TICK_LENGTH = 25;
const MINOR_TICK_LENGTH = 10;
const MINOR_TICKS_PER_MAJOR_TICK = 5;
const MINOR_TICK_SPACING = 0.1; // L
const RIM_OFFSET = 10;
const TICK_LABEL_X_SPACING = 5;

export default class BeakerNode extends Node {

  public constructor( beaker: Beaker ) {

    super( { pickable: false } );

    const BEAKER_WIDTH = beaker.size.width;
    const BEAKER_HEIGHT = beaker.size.height;

    // water, starting from upper left
    const waterShape = new Shape().lineTo( -BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
      .lineTo( -BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, -BEAKER_HEIGHT );
    this.addChild( new Path( waterShape, {
      fill: 'rgba( 193, 222, 227, 0.7 )'
    } ) );

    // beaker, starting from upper left
    const beakerShape = new Shape()
      .moveTo( -BEAKER_WIDTH / 2 - RIM_OFFSET, -BEAKER_HEIGHT - RIM_OFFSET )
      .lineTo( -BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
      .lineTo( -BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, 0 )
      .lineTo( BEAKER_WIDTH / 2, -BEAKER_HEIGHT )
      .lineTo( ( BEAKER_WIDTH / 2 ) + RIM_OFFSET, -BEAKER_HEIGHT - RIM_OFFSET );
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

    // major tick label at '1L'
    const majorTickStringProperty = new DerivedProperty(
      [ AcidBaseSolutionsStrings.pattern[ '0value' ][ '1unitsStringProperty' ], AcidBaseSolutionsStrings.litersStringProperty ],
      ( patternString, unitsString ) => StringUtils.format( patternString, '1', unitsString )
    );
    const majorTickText = new Text( majorTickStringProperty, {
      font: new PhetFont( 18 ),
      fill: 'black',
      maxWidth: 65
    } );
    ticksParent.addChild( majorTickText );

    majorTickText.boundsProperty.link( bounds => {
      majorTickText.right = BEAKER_WIDTH / 2 - MAJOR_TICK_LENGTH - TICK_LABEL_X_SPACING;
      majorTickText.centerY = -deltaY * NUMBER_OF_TICKS;
    } );

    this.translation = beaker.position;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Creates an icon of the beaker.
   */
  public static createIcon( width: number, height: number ): Node {
    const lipOffset = 0.1 * width;
    return new Node( {
      children: [

        // water
        new Rectangle( 0, 0, width, height, { fill: 'rgb( 213, 231, 233 )' } ),

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
}

acidBaseSolutions.register( 'BeakerNode', BeakerNode );