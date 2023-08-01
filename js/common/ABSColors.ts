// Copyright 2014-2022, University of Colorado Boulder

/**
 * Colors used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import acidBaseSolutions from '../acidBaseSolutions.js';

// constants
const GRAY_PARTICLE = 'rgb(120,120,120)';

const ABSColors = {

  // Background color used for all screens
  screenBackgroundColorProperty: new ProfileColorProperty( acidBaseSolutions, 'screenBackgroundColor', {
    default: 'white'
  } ),

  // Fill for control panels
  controlPanelFillProperty: new ProfileColorProperty( acidBaseSolutions, 'controlPanelFill', {
    default: 'rgb( 208, 212, 255 )'
  } ),

  // Blank pH paper, cream
  pHPaperColorProperty: new ProfileColorProperty( acidBaseSolutions, 'pHPaperColor', {
    default: 'rgb( 217, 215, 154 )'
  } ),

  // Equilibrium Concentration graph fill
  graphFillProperty: new ProfileColorProperty( acidBaseSolutions, 'graphFill', {
    default: 'white'
  } ),

  // pH colors, ordered from pH value 0-14, type Color because we'll be interpolating
  PH: [
    new Color( 182, 70, 72 ),
    new Color( 196, 80, 86 ),
    new Color( 213, 83, 71 ),
    new Color( 237, 123, 83 ),
    new Color( 246, 152, 86 ),
    new Color( 244, 158, 79 ),
    new Color( 243, 160, 78 ),
    new Color( 244, 182, 67 ),
    new Color( 231, 201, 75 ),
    new Color( 93, 118, 88 ),
    new Color( 30, 92, 89 ),
    new Color( 34, 90, 105 ),
    new Color( 39, 87, 111 ),
    new Color( 27, 67, 90 ),
    new Color( 0, 34, 52 )
  ],

  // Particle colors
  particleAColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleAColor', {
    default: 'rgb( 0, 170, 255 )'
  } ),
  particleBColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleBColor', {
    default: GRAY_PARTICLE
  } ),
  particleBHColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleBHColor', {
    default: 'rgb( 255, 170, 0 )'
  } ),
  particleH2OColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleH2OColor', {
    default: 'rgb( 164, 189, 193 )'
  } ),
  particleH3OColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleH3OColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),
  particleHAColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleHAColor', {
    default: GRAY_PARTICLE
  } ),
  particleMColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleMColor', {
    default: 'rgb( 255, 170, 0 )'
  } ),
  particleMOHColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleMOHColor', {
    default: GRAY_PARTICLE
  } ),
  particleOHColorProperty: new ProfileColorProperty( acidBaseSolutions, 'particleOHColor', {
    default: 'rgb( 90, 90, 255 )'
  } )
};

acidBaseSolutions.register( 'ABSColors', ABSColors );
export default ABSColors;