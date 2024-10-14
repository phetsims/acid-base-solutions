// Copyright 2015-2023, University of Colorado Boulder

/**
 * ABSConductivityTesterNode is the conductivity tester. It adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import ConductivityTesterNode from '../../../../scenery-phet/js/ConductivityTesterNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSConstants from '../ABSConstants.js';
import ConductivityTester from '../model/ConductivityTester.js';
import { ToolMode } from './ToolMode.js';

export default class ABSConductivityTesterNode extends ConductivityTesterNode {

  public constructor( conductivityTester: ConductivityTester, toolModeProperty: StringUnionProperty<ToolMode>, tandem: Tandem ) {

    const options = {
      isDisposable: false,
      probeSize: conductivityTester.probeSize,
      probeDragYRange: conductivityTester.probeDragYRange,
      visibleProperty: new DerivedProperty( [ toolModeProperty ], toolMode => ( toolMode === 'conductivityTester' ), {
        tandem: tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      keyboardDragListenerOptions: ABSConstants.KEYBOARD_DRAG_LISTENER_OPTIONS,
      tandem: tandem,
      phetioFeatured: true
    };

    // Fixed bulb position
    const positionProperty = new Property( conductivityTester.bulbPosition, {
      isValidValue: position => ( position === conductivityTester.bulbPosition )
    } );

    super( conductivityTester.brightnessProperty, positionProperty,
      conductivityTester.positiveProbePositionProperty, conductivityTester.negativeProbePositionProperty, options );

    this.addLinkedElement( conductivityTester );
  }
}

acidBaseSolutions.register( 'ABSConductivityTesterNode', ABSConductivityTesterNode );