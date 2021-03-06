// Copyright 2014-2021, University of Colorado Boulder

/**
 * Background of concentration graph.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import Line from '../../../../../scenery/js/nodes/Line.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import acidBaseSolutions from '../../../acidBaseSolutions.js';
import acidBaseSolutionsStrings from '../../../acidBaseSolutionsStrings.js';

// constants
const TICK_FONT = new PhetFont( 11 );

class ConcentrationGraphBackgroundNode extends Node {

  /**
   * @param {number} width
   * @param {number} height
   */
  constructor( width, height ) {

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
    const yLabel = new Text( acidBaseSolutionsStrings.concentrationGraph.yAxis, {
      font: new PhetFont( 13 ),
      maxWidth: height
    } );
    yLabel.rotate( -Math.PI / 2 );
    yLabel.centerY = height / 2;
    yLabel.centerX = -50;
    this.addChild( yLabel );
  }
}

acidBaseSolutions.register( 'ConcentrationGraphBackgroundNode', ConcentrationGraphBackgroundNode );
export default ConcentrationGraphBackgroundNode;