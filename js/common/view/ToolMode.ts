// Copyright 2014-2023, University of Colorado Boulder

/**
 * Possible choices for the Tools radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc)
 */

export const ToolModeValues = [ 'pHMeter', 'pHPaper', 'conductivityTester', 'none' ] as const;
export type ToolMode = ( typeof ToolModeValues )[number];