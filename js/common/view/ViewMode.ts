// Copyright 2014-2023, University of Colorado Boulder

/**
 * Possible radio-button choices in the 'Views' control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const ViewModeValues = [ 'particles', 'graph', 'hideViews' ] as const;
export type ViewMode = ( typeof ViewModeValues )[number];