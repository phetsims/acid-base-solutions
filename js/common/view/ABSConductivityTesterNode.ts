// Copyright 2015-2023, University of Colorado Boulder

/**
 * Conductivity tester, adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import ConductivityTesterNode from '../../../../scenery-phet/js/ConductivityTesterNode.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ConductivityTester from '../model/ConductivityTester.js';
import { ToolMode } from './ToolMode.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

export default class ABSConductivityTesterNode extends ConductivityTesterNode {

  public constructor( conductivityTester: ConductivityTester, toolModeProperty: StringUnionProperty<ToolMode>, tandem: Tandem ) {

    super( conductivityTester.brightnessProperty,
      new Property( conductivityTester.bulbPosition ),
      conductivityTester.positiveProbePositionProperty,
      conductivityTester.negativeProbePositionProperty, {
        probeSize: conductivityTester.probeSize,
        probeDragYRange: new Range(
          conductivityTester.probeDragYRange.min - conductivityTester.bulbPosition.y,
          conductivityTester.probeDragYRange.max - conductivityTester.bulbPosition.y
        ),
        visibleProperty: new DerivedProperty( [ toolModeProperty ], toolMode => ( toolMode === 'conductivity' ), {
          tandem: tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } ),
        tandem: tandem
      } );

    this.addLinkedElement( conductivityTester );
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

acidBaseSolutions.register( 'ABSConductivityTesterNode', ABSConductivityTesterNode );