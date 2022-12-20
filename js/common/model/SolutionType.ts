// Copyright 2014-2022, University of Colorado Boulder

/**
 * SolutionType is the string union of possible choices for solution.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const SolutionTypeValues = [ 'water', 'strongAcid', 'weakAcid', 'strongBase', 'weakBase' ] as const;
export type SolutionType = ( typeof SolutionTypeValues )[number];