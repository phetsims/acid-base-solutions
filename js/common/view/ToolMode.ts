// Copyright 2014-2023, University of Colorado Boulder

/**
 * Possible choices for the Tools radio buttons. Note that the 'none' value can be selected via PhET-iO use only,
 * for hiding all tools; there is no way to select 'none' in the user interface.
 *
 * @author Chris Malley (PixelZoom, Inc)
 */

export const ToolModeValues = [ 'pHMeter', 'pHPaper', 'conductivityTester', 'none' ] as const;
export type ToolMode = ( typeof ToolModeValues )[number];