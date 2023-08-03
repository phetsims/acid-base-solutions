// Copyright 2014-2023, University of Colorado Boulder

/**
 * Colors used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import { ProfileColorProperty } from '../../../scenery/js/imports.js';
import acidBaseSolutions from '../acidBaseSolutions.js';

// constants
const GRAY_PARTICLE = 'rgb( 120, 120, 120 )';

const ABSColors = {

  // Background color used for all screens
  screenBackgroundColorProperty: new ProfileColorProperty( acidBaseSolutions, 'screenBackgroundColor', {
    default: 'white'
  } ),

  // Fill for control panels
  controlPanelFillProperty: new ProfileColorProperty( acidBaseSolutions, 'controlPanelFill', {
    default: 'rgb( 208, 212, 255 )'
  } ),

  toolRadioButtonFillProperty: new ProfileColorProperty( acidBaseSolutions, 'toolRadioButtonFill', {
    default: 'white'
  } ),

  // Equilibrium Concentration graph fill
  graphFillProperty: new ProfileColorProperty( acidBaseSolutions, 'graphFill', {
    default: 'white'
  } ),

  // Blank pH paper, cream
  pHPaperFillProperty: new ProfileColorProperty( acidBaseSolutions, 'pHPaperFill', {
    default: 'rgb( 217, 215, 154 )'
  } ),

  // pH meter
  pHProbeShaftFillProperty: new ProfileColorProperty( acidBaseSolutions, 'pHProbeShaftFill', {
    default: 'rgb( 192, 192, 192 )'
  } ),
  pHProbeTipFillProperty: new ProfileColorProperty( acidBaseSolutions, 'pHProbeTipFill', {
    default: 'black'
  } ),

  // Magnifying glass
  magnifyingGlassHandleFillProperty: new ProfileColorProperty( acidBaseSolutions, 'magnifyingGlassHandleFill', {
    default: 'rgb( 85, 55, 33 )'
  } ),

  // Solution in the beaker and magnifying glass
  opaqueSolutionColorProperty: new ProfileColorProperty( acidBaseSolutions, 'opaqueSolutionColor', {
    default: 'rgb( 211, 232, 236 )'
  } ),
  transparentSolutionColorProperty: new ProfileColorProperty( acidBaseSolutions, 'transparentSolutionColor', {
    default: 'rgba( 193, 222, 227, 0.7 )' // transparent so we can see the pH probe and pH paper
  } ),

  // pH paper colors, ordered from pH value 0-14
  PH_PAPER_COLORS: [
    new ProfileColorProperty( acidBaseSolutions, 'pH0ColorProperty', {
      default: 'rgb( 182, 70, 72 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH1ColorProperty', {
      default: 'rgb( 196, 80, 86 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH2ColorProperty', {
      default: 'rgb( 213, 83, 71 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH3ColorProperty', {
      default: 'rgb( 237, 123, 83 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH4ColorProperty', {
      default: 'rgb( 246, 152, 86 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH5ColorProperty', {
      default: 'rgb( 244, 158, 79 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH6ColorProperty', {
      default: 'rgb( 243, 160, 78 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH7ColorProperty', {
      default: 'rgb( 244, 182, 67 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH8ColorProperty', {
      default: 'rgb( 231, 201, 75 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH9ColorProperty', {
      default: 'rgb( 93, 118, 88 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH10ColorProperty', {
      default: 'rgb( 30, 92, 89 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH11ColorProperty', {
      default: 'rgb( 34, 90, 105 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH12ColorProperty', {
      default: 'rgb( 39, 87, 111 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH13ColorProperty', {
      default: 'rgb( 27, 67, 90 )'
    } ),
    new ProfileColorProperty( acidBaseSolutions, 'pH14ColorProperty', {
      default: 'rgb( 0, 34, 52 )'
    } )
  ],

  // NOTE: Particle colors are not currently dynamic, because that would be considerably more work.
  // Particles are precomputed when the sim starts. And the solvent is an image file, solvent.png.
  A: 'rgb( 0, 170, 255 )',
  B: GRAY_PARTICLE,
  BH: 'rgb( 255, 170, 0 )',
  H2O: 'rgb( 164, 189, 193 )',
  H3O: PhetColorScheme.RED_COLORBLIND,
  HA: GRAY_PARTICLE,
  M: 'rgb( 255, 170, 0 )',
  MOH: GRAY_PARTICLE,
  OH: 'rgb( 90, 90, 255 )'
};

acidBaseSolutions.register( 'ABSColors', ABSColors );
export default ABSColors;