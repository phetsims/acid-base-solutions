// Copyright 2014-2022, University of Colorado Boulder

/**
 * Possible choices in the 'Views' control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const ViewModeValues = [ 'particles', 'graph', 'hideViews' ] as const;
export type ViewMode = ( typeof ViewModeValues )[number];