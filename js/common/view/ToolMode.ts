// Copyright 2014-2022, University of Colorado Boulder

/**
 * Possible choices for the Tools radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc)
 */

export const ToolModeValues = [ 'pHMeter', 'pHPaper', 'conductivityTester' ] as const;
export type ToolMode = ( typeof ToolModeValues )[number];