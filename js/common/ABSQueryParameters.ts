// Copyright 2023, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import acidBaseSolutions from '../acidBaseSolutions.js';

const SCHEMA_MAP = {

  // When true, the solvent is shown in the 'Particles' view
  showSolvent: {
    type: 'boolean',
    defaultValue: false,
    public: true
  }
} as const;

const ABSQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );
ABSQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

acidBaseSolutions.register( 'ABSQueryParameters', ABSQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.geometricOptics.GOQueryParameters' );

export default ABSQueryParameters;