// Copyright 2023-2025, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import acidBaseSolutions from '../acidBaseSolutions.js';

const ABSQueryParameters = QueryStringMachine.getAll( {

  // When true, the solvent is shown in the 'Particles' view
  showSolvent: {
    type: 'boolean',
    defaultValue: false,
    public: true
  }
} );

acidBaseSolutions.register( 'ABSQueryParameters', ABSQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.geometricOptics.GOQueryParameters' );

export default ABSQueryParameters;