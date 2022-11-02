// Copyright 2014-2022, University of Colorado Boulder

/**
 * Possible choices in the 'Solutions' control panel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const SolutionTypeValues = [ 'water', 'strongAcid', 'weakAcid', 'strongBase', 'weakBase' ] as const;
export type SolutionType = ( typeof SolutionTypeValues )[number];