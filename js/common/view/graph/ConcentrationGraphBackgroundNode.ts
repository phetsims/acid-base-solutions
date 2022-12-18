// Copyright 2014-2022, University of Colorado Boulder

/**
 * Background of concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import { Line, Node, Rectangle, RichText, Text } from '../../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../../AcidBaseSolutionsStrings.js';

// constants
const TICK_FONT = new PhetFont( 11 );

export default class ConcentrationGraphBackgroundNode extends Node {

  public constructor( width: number, height: number ) {

    super();

    // rectangular background
    this.addChild( new Rectangle( 0, 0, width, height, { fill: 'white', stroke: 'black', lineWidth: 0.5 } ) );

    // tick marks and horizontal dashed lines. This reuses one tick and one dashed line.
    const dh = ( height / 10 ) - 1;
    const tickNode = new Line( -2, 0, 2, 0, { stroke: 'black', lineWidth: 0.5 } );
    const dashedLineNode = new Line( 0, 0, width, 0, { stroke: 'gray', lineWidth: 0.5, lineDash: [ 2, 1 ] } );
    for ( let i = 0, y; i < 11; i++ ) {

      y = height - ( dh * i );

      // tick mark and dashed line (no dash on bottom tick)
      this.addChild( new Node( { y: y, children: ( i > 0 ) ? [ tickNode, dashedLineNode ] : [ tickNode ] } ) );

      // add text
      this.addChild( new RichText( `10<sup>${i - 8}</sup>`, {
        centerY: y,
        centerX: -16,
        font: TICK_FONT
      } ) );
    }

    // y-axis label
    const yText = new Text( AcidBaseSolutionsStrings.concentrationGraph.yAxisStringProperty, {
      font: new PhetFont( 13 ),
      maxWidth: height
    } );
    yText.rotate( -Math.PI / 2 );
    yText.centerY = height / 2;
    yText.centerX = -50;
    this.addChild( yText );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ConcentrationGraphBackgroundNode', ConcentrationGraphBackgroundNode );