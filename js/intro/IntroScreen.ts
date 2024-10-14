// Copyright 2014-2023, University of Colorado Boulder

/**
 * The 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Shape } from '../../../kite/js/imports.js';
import { Circle, Node, Path, Rectangle } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../AcidBaseSolutionsStrings.js';
import ABSColors from '../common/ABSColors.js';
import IntroModel from './model/IntroModel.js';
import IntroKeyboardHelpContent from './view/IntroKeyboardHelpContent.js';
import IntroScreenView from './view/IntroScreenView.js';

export default class IntroScreen extends Screen<IntroModel, IntroScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {

      // In https://github.com/phetsims/acid-base-solutions/issues/218, we decided to rename this screen to 'Intro'
      // for consistency with other PhET sims. We also decided to change only the English string value, and not
      // the string key, due to the hassles involved in changing string keys.
      name: AcidBaseSolutionsStrings.screen.introductionStringProperty,
      backgroundColorProperty: ABSColors.screenBackgroundColorProperty,
      homeScreenIcon: createScreenIcon(),
      createKeyboardHelpNode: () => new IntroKeyboardHelpContent(),
      tandem: tandem
    };

    super(
      () => new IntroModel( tandem.createTandem( 'model' ) ),
      model => new IntroScreenView( model, tandem.createTandem( 'view' ) ),
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

  const background = new Rectangle( 0, 0, width, height, {
    fill: ABSColors.screenBackgroundColorProperty
  } );

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
    fill: ABSColors.opaqueSolutionColorProperty,
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
    fill: ABSColors.magnifyingGlassHandleFillProperty,
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

acidBaseSolutions.register( 'IntroScreen', IntroScreen );