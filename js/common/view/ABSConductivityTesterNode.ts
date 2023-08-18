// Copyright 2015-2023, University of Colorado Boulder

/**
 * ABSConductivityTesterNode is the conductivity tester. It adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import ConductivityTesterNode from '../../../../scenery-phet/js/ConductivityTesterNode.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ConductivityTester from '../model/ConductivityTester.js';
import { ToolMode } from './ToolMode.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import ABSConstants from '../ABSConstants.js';

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
      tandem: tandem
    };

    super( conductivityTester.brightnessProperty, new Property( conductivityTester.bulbPosition ),
      conductivityTester.positiveProbePositionProperty, conductivityTester.negativeProbePositionProperty, options );

    this.addLinkedElement( conductivityTester );
  }
}

acidBaseSolutions.register( 'ABSConductivityTesterNode', ABSConductivityTesterNode );