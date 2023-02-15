// Copyright 2014-2023, University of Colorado Boulder

/**
 * The 'Introduction' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Shape } from '../../../kite/js/imports.js';
import { Circle, Node, Path, Rectangle } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../AcidBaseSolutionsStrings.js';
import ABSColors from '../common/ABSColors.js';
import IntroductionModel from './model/IntroductionModel.js';
import IntroductionScreenView from './view/IntroductionScreenView.js';

export default class IntroductionScreen extends Screen<IntroductionModel, IntroductionScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: AcidBaseSolutionsStrings.screen.introductionStringProperty,
      backgroundColorProperty: new Property( ABSColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    super(
      () => new IntroductionModel( tandem.createTandem( 'model' ) ),
      model => new IntroductionScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

/**
 * Creates the icon for this screen.
 */
function createScreenIcon(): ScreenIcon {

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

  const iconNode = new Node( {
    children: [ background, waterNode, beakerNode, handleNode, lensNode ]
  } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

acidBaseSolutions.register( 'IntroductionScreen', IntroductionScreen );