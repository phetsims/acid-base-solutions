// Copyright 2015-2022, University of Colorado Boulder

/**
 * Conductivity tester, adapts the model to scenery-phet.ConductivityTesterNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

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

    this.addLinkedElement( conductivityTester, {
      tandem: tandem.createTandem( conductivityTester.tandem.name )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

acidBaseSolutions.register( 'ABSConductivityTesterNode', ABSConductivityTesterNode );