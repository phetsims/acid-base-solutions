// Copyright 2022, University of Colorado Boulder

/**
 * Types related to particles (molecules, atoms, and ions).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color } from '../../../../../scenery/js/imports.js';

// Keys of all the possible particles that appear in this sim. Used as the key for various Maps.
export const MoleculeKeyValues = [ 'A', 'B', 'BH', 'H2O', 'H3O', 'HA', 'M', 'MOH', 'OH' ] as const;
export type MoleculeKey = ( typeof MoleculeKeyValues )[number];

// Data structure that describes a particle.
export type Particle = {
  key: MoleculeKey; // used to look up the particle in various Maps
  color: Color | string; // color used to render the particle
  getConcentration: () => number; // returns the concentration of the particle
};