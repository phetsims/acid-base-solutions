// Copyright 2022-2025, University of Colorado Boulder

/**
 * Types related to particles (molecules, atoms, and ions).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

// Keys of all the possible particles that appear in this simulation.
// Used as the key for various Maps, and in tandem names.
import TColor from '../../../../../scenery/js/util/TColor.js';

export const ParticleKeyValues = [ 'A', 'B', 'BH', 'H2O', 'H3O', 'HA', 'M', 'MOH', 'OH' ] as const;
export type ParticleKey = ( typeof ParticleKeyValues )[number];

// Data structure that describes a particle.
export type Particle = {
  key: ParticleKey; // used to look up the particle in various Maps
  color: TColor; // color used to render the particle
  getConcentration: () => number; // returns the concentration of the particle
};