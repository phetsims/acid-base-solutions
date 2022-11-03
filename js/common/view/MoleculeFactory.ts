// Copyright 2014-2022, University of Colorado Boulder

//TODO rename file to moleculeFactory.ts

/**
 * Factory for creating molecule nodes.
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
import { MoleculeName } from '../model/solutions/Molecule.js';

//TODO what is wrong with this?
// eslint-disable-next-line no-spaced-func
const moleculeFactory = new Map<MoleculeName, () => Node>();

moleculeFactory.set( 'A', () => new Node( {
  children: [ new AtomNode( 7, ABSColors.A ) ]
} ) );

moleculeFactory.set( 'B', () => new Node( {
  children: [
    new AtomNode( 7, ABSColors.B )
  ]
} ) );

moleculeFactory.set( 'BH', () => new Node( {
  children: [
    new AtomNode( 4, ABSColors.BH, { x: -6, y: -6 } ),
    new AtomNode( 7, ABSColors.BH, { x: 0, y: 0 } )
  ]
} ) );

moleculeFactory.set( 'H2O', () => new Node( {
  children: [
    new AtomNode( 4, ABSColors.H2O, { x: 0, y: -9 } ),
    new AtomNode( 7, ABSColors.H2O, { x: 0, y: 0 } ),
    new AtomNode( 4, ABSColors.H2O, { x: -6, y: 5 } )
  ]
} ) );

moleculeFactory.set( 'H3O', () => new Node( {
  children: [
    new AtomNode( 4, ABSColors.H3O, { x: 3, y: -7.5 } ),
    new AtomNode( 4, ABSColors.H3O, { x: 3, y: 7.5 } ),
    new AtomNode( 7, ABSColors.H3O, { x: 0, y: 0 } ),
    new AtomNode( 4, ABSColors.H3O, { x: -8, y: 0 } )
  ]
} ) );

moleculeFactory.set( 'HA', () => new Node( {
  children: [
    new AtomNode( 7, ABSColors.HA, { x: 0, y: 0 } ),
    new AtomNode( 4, ABSColors.HA, { x: -8, y: -1 } )
  ]
} ) );

moleculeFactory.set( 'M', () => new Node( {
  children: [
    new AtomNode( 7, ABSColors.M )
  ]
} ) );

moleculeFactory.set( 'MOH', () => new Node( {
  children: [

    // M icon. Use PlusNode instead of MathSymbols.PLUS because text bounds are inaccurate.
    new AtomNode( 6, ABSColors.MOH, { x: 0, y: 0 } ),
    new PlusNode( {
      size: new Dimension2( 6, 1 ),
      centerX: 0,
      centerY: 10
    } ),

    // OH ion. Use MinusNode instead of MathSymbols.MINUS because text bounds are inaccurate.
    new AtomNode( 7, ABSColors.MOH, { x: 15, y: 0 } ),
    new AtomNode( 4, ABSColors.MOH, { x: 22, y: -4 } ),
    new MinusNode( {
      size: new Dimension2( 6, 1 ),
      centerX: 15,
      centerY: 10
    } )
  ]
} ) );

moleculeFactory.set( 'OH', () => new Node( {
    children: [
      new AtomNode( 4, ABSColors.OH, { x: 8, y: -3 } ),
      new AtomNode( 7, ABSColors.OH, { x: 0, y: 0 } )
    ]
  } )
);

acidBaseSolutions.register( 'moleculeFactory', moleculeFactory );
export default moleculeFactory;