// Copyright 2014-2023, University of Colorado Boulder

/**
 * createParticleNode is a factory function for creating particle Nodes.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import MinusNode from '../../../../scenery-phet/js/MinusNode.js';
import PlusNode from '../../../../scenery-phet/js/PlusNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSColors from '../ABSColors.js';
import AtomNode from './AtomNode.js';
import { ParticleKey } from '../model/solutions/Particle.js';

// Signature of all creation functions herein
type CreationFunction = () => Node;

// Maps a particle name to a function that creates a Node for that particle.
const map = new Map<ParticleKey, CreationFunction>();

map.set( 'A', () => new Node( {
  children: [ new AtomNode( 7, ABSColors.particleAColorProperty ) ]
} ) );

map.set( 'B', () => new Node( {
  children: [
    new AtomNode( 7, ABSColors.particleBColorProperty )
  ]
} ) );

map.set( 'BH', () => new Node( {
  children: [
    new AtomNode( 4, ABSColors.particleBHColorProperty, { x: -6, y: -6 } ),
    new AtomNode( 7, ABSColors.particleBHColorProperty, { x: 0, y: 0 } )
  ]
} ) );

map.set( 'H2O', () => new Node( {
  children: [
    new AtomNode( 4, ABSColors.particleH2OColorProperty, { x: 0, y: -9 } ),
    new AtomNode( 7, ABSColors.particleH2OColorProperty, { x: 0, y: 0 } ),
    new AtomNode( 4, ABSColors.particleH2OColorProperty, { x: -6, y: 5 } )
  ]
} ) );

map.set( 'H3O', () => new Node( {
  children: [
    new AtomNode( 4, ABSColors.particleH3OColorProperty, { x: 3, y: -7.5 } ),
    new AtomNode( 4, ABSColors.particleH3OColorProperty, { x: 3, y: 7.5 } ),
    new AtomNode( 7, ABSColors.particleH3OColorProperty, { x: 0, y: 0 } ),
    new AtomNode( 4, ABSColors.particleH3OColorProperty, { x: -8, y: 0 } )
  ]
} ) );

map.set( 'HA', () => new Node( {
  children: [
    new AtomNode( 7, ABSColors.particleHAColorProperty, { x: 0, y: 0 } ),
    new AtomNode( 4, ABSColors.particleHAColorProperty, { x: -8, y: -1 } )
  ]
} ) );

map.set( 'M', () => new Node( {
  children: [
    new AtomNode( 7, ABSColors.particleMColorProperty )
  ]
} ) );

map.set( 'MOH', () => new Node( {
  children: [

    // M icon. Use PlusNode instead of MathSymbols.PLUS because text bounds are inaccurate.
    new AtomNode( 6, ABSColors.particleMOHColorProperty, { x: 0, y: 0 } ),
    new PlusNode( {
      size: new Dimension2( 6, 1 ),
      centerX: 0,
      centerY: 10
    } ),

    // OH ion. Use MinusNode instead of MathSymbols.MINUS because text bounds are inaccurate.
    new AtomNode( 7, ABSColors.particleMOHColorProperty, { x: 15, y: 0 } ),
    new AtomNode( 4, ABSColors.particleMOHColorProperty, { x: 22, y: -4 } ),
    new MinusNode( {
      size: new Dimension2( 6, 1 ),
      centerX: 15,
      centerY: 10
    } )
  ]
} ) );

map.set( 'OH', () => new Node( {
    children: [
      new AtomNode( 4, ABSColors.particleOHColorProperty, { x: 8, y: -3 } ),
      new AtomNode( 7, ABSColors.particleOHColorProperty, { x: 0, y: 0 } )
    ]
  } )
);

/**
 * Creates a Node for the specified particle.
 */
export default function createParticleNode( key: ParticleKey ): Node {
  assert && assert( map.has( key ), `no entry for key=${key}` );
  return map.get( key )!();
}

acidBaseSolutions.register( 'createParticleNode', createParticleNode );