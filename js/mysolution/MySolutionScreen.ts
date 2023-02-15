// Copyright 2014-2023, University of Colorado Boulder

/**
 * The 'My Solution' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Node, Rectangle } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../AcidBaseSolutionsStrings.js';
import ABSColors from '../common/ABSColors.js';
import createParticleNode from '../common/view/createParticleNode.js';
import MySolutionModel from './model/MySolutionModel.js';
import MySolutionScreenView from './view/MySolutionScreenView.js';

export default class MySolutionScreen extends Screen<MySolutionModel, MySolutionScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: AcidBaseSolutionsStrings.screen.mySolutionStringProperty,
      backgroundColorProperty: new Property( ABSColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: tandem
    };

    super(
      () => new MySolutionModel( tandem.createTandem( 'model' ) ),
      model => new MySolutionScreenView( model, tandem.createTandem( 'view' ) ),
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

  const h3oNode = createParticleNode( 'H3O' );
  const ohNode = createParticleNode( 'OH' );

  // Uniformly scale the particles to make them fill the available space.
  const xSpace = 0.06 * width; // horizontal space around the particles
  const maxWidth = Math.max( h3oNode.width, ohNode.width );
  const particleScale = 0.5 * ( width - 3 * xSpace ) / maxWidth;
  h3oNode.setScaleMagnitude( particleScale, particleScale );
  ohNode.setScaleMagnitude( particleScale, particleScale );

  // position the particles
  h3oNode.left = xSpace;
  ohNode.right = width - xSpace;
  h3oNode.centerY = height / 2;
  ohNode.centerY = h3oNode.centerY;

  const background = new Rectangle( 0, 0, width, height, { fill: 'white' } );

  const iconNode = new Node( { children: [ background, h3oNode, ohNode ] } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

acidBaseSolutions.register( 'MySolutionScreen', MySolutionScreen );