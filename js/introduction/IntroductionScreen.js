// Copyright 2014-2020, University of Colorado Boulder

/**
 * The 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import Shape from '../../../kite/js/Shape.js';
import Circle from '../../../scenery/js/nodes/Circle.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Path from '../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import acidBaseSolutionsStrings from '../acidBaseSolutionsStrings.js';
import acidBaseSolutions from '../acidBaseSolutions.js';
import ABSColors from '../common/ABSColors.js';
import IntroductionModel from './model/IntroductionModel.js';
import IntroductionScreenView from './view/IntroductionScreenView.js';

const screenIntroductionString = acidBaseSolutionsStrings.screen.introduction;

class IntroductionScreen extends Screen {

  constructor( tandem ) {

    const options = {
      name: screenIntroductionString,
      backgroundColorProperty: new Property( ABSColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    super(
      () => new IntroductionModel(),
      model => new IntroductionScreenView( model ),
      options
    );
  }
}

/**
 * Creates the icon for this screen.
 * @returns {Node}
 */
function createScreenIcon() {

  const width = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width;
  const height = Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height;

  const background = new Rectangle( 0, 0, width, height, { fill: 'white' } );

  const beakerWidth = 0.6 * width;
  const beakerHeight = 0.75 * height;
  const lipOffset = 0.05 * width;

  const beakerShape = new Shape()
    .moveTo( -lipOffset, -lipOffset )
    .lineTo( 0, 0 )
    .lineTo( 0, beakerHeight )
    .lineTo( beakerWidth, beakerHeight )
    .lineTo( beakerWidth, 0 )
    .lineTo( beakerWidth + lipOffset, -lipOffset );
  const beakerNode = new Path( beakerShape, {
    stroke: 'black',
    lineWidth: Math.max( 1, beakerHeight / 40 ),
    center: background.center
  } );

  const waterNode = new Rectangle( 0, 0, beakerWidth, beakerHeight, {
    fill: 'rgb(213,231,233)',
    translation: beakerNode.translation
  } );

  const lensRadius = 0.4 * beakerHeight;
  const lensNode = new Circle( lensRadius, {
    stroke: 'black',
    lineWidth: lensRadius / 6,
    center: waterNode.center
  } );

  const handleNode = new Rectangle( lensRadius + 2, -lensRadius / 7, lensRadius, lensRadius / 3, {
    cornerRadius: 8,
    fill: 'rgb(85,55,33)',
    stroke: 'black',
    lineWidth: 1,
    translation: lensNode.translation
  } );
  handleNode.rotate( Math.PI / 6 );

  return new Node( { children: [ background, waterNode, beakerNode, handleNode, lensNode ] } );
}

acidBaseSolutions.register( 'IntroductionScreen', IntroductionScreen );
export default IntroductionScreen;