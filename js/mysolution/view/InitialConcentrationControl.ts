// Copyright 2022, University of Colorado Boulder

/**
 * InitialConcentrationControl is the control for 'Initial Concentration' in MySolutionPanel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Text, VBox } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AcidBaseSolutionsStrings from '../../AcidBaseSolutionsStrings.js';
import ABSConstants from '../../common/ABSConstants.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Property from '../../../../axon/js/Property.js';
import NumberSpinner from '../../../../sun/js/NumberSpinner.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import InitialConcentrationSlider from './InitialConcentrationSlider.js';

const CONCENTRATION_DECIMALS = 3;

export default class InitialConcentrationControl extends VBox {

  public constructor( concentrationProperty: Property<number>, tandem: Tandem ) {

    const titleText = new Text( AcidBaseSolutionsStrings.initialConcentrationStringProperty, {
      font: ABSConstants.SUBTITLE_FONT,
      maxWidth: 180, // determined empirically,
      layoutOptions: { align: 'left' },
      tandem: tandem.createTandem( 'titleText' )
    } );

    const spinner = new NumberSpinner( concentrationProperty, new Property( ABSConstants.CONCENTRATION_RANGE ), {
      arrowsPosition: 'leftRight',
      xSpacing: 8,
      deltaValue: Math.pow( 10, -CONCENTRATION_DECIMALS ),
      numberDisplayOptions: {
        decimalPlaces: CONCENTRATION_DECIMALS,
        textOptions: {
          font: new PhetFont( 14 )
        },
        cornerRadius: 4,
        phetioVisiblePropertyInstrumented: false
      },
      touchAreaXDilation: 6,
      touchAreaYDilation: 6,
      tandem: tandem.createTandem( 'spinner' )
    } );

    const slider = new InitialConcentrationSlider( concentrationProperty, ABSConstants.CONCENTRATION_RANGE,
      tandem.createTandem( 'slider' ) );

    super( {
      children: [
        titleText,
        spinner,
        slider
      ],
      spacing: 6,
      layoutOptions: { stretch: true }, // so that titleText will be left-aligned in MySolutionsPanel
      tandem: tandem
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'InitialConcentrationControl', InitialConcentrationControl );