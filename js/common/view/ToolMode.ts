// Copyright 2014-2022, University of Colorado Boulder

/**
 * Possible choices in the 'Tools' control panel.
 *
 * @author Chris Malley (PixelZoom, Inc)
 */

export const ToolModeValues = [ 'pHMeter', 'pHPaper', 'conductivity' ] as const;
export type ToolMode = ( typeof ToolModeValues )[number];