// Copyright 2022-2023, University of Colorado Boulder

/**
 * InitialConcentrationControl is the control for 'Initial Concentration' used in MySolutionPanel.
 * For details on why NumberControl is not used here, see https://github.com/phetsims/acid-base-solutions/issues/167
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Text, VBox } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import NumberSpinner from '../../../../sun/js/NumberSpinner.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import InitialConcentrationSlider from './InitialConcentrationSlider.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';

const CONCENTRATION_DECIMALS = 3;

export default class InitialConcentrationControl extends VBox {

  public constructor( concentrationProperty: NumberProperty, tandem: Tandem ) {

    const titleText = new Text( AcidBaseSolutionsStrings.initialConcentrationStringProperty, {
      font: ABSConstants.SUBTITLE_FONT,
      maxWidth: 180, // determined empirically,
      layoutOptions: { align: 'left' }
    } );

    const spinner = new NumberSpinner( concentrationProperty, concentrationProperty.rangeProperty, {
      arrowsPosition: 'leftRight',
      xSpacing: 8,
      deltaValue: Math.pow( 10, -CONCENTRATION_DECIMALS ),
      numberDisplayOptions: {
        decimalPlaces: CONCENTRATION_DECIMALS,
        textOptions: {
          font: new PhetFont( 14 )
        },
        cornerRadius: 4,
        tandem: Tandem.OPT_OUT // see https://github.com/phetsims/acid-base-solutions/issues/197#issuecomment-1674022990
      },
      touchAreaXDilation: 6,
      touchAreaYDilation: 6,
      tandem: tandem.createTandem( 'spinner' ),
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );

    const slider = new InitialConcentrationSlider( concentrationProperty, tandem.createTandem( 'slider' ) );

    super( {
      children: [
        titleText,
        spinner,
        slider
      ],
      spacing: 6,
      layoutOptions: { stretch: true }, // so that titleText will be left-aligned in MySolutionsPanel
      isDisposable: false,
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

acidBaseSolutions.register( 'InitialConcentrationControl', InitialConcentrationControl );