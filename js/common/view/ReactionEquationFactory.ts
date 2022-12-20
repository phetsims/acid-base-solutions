// Copyright 2014-2022, University of Colorado Boulder

/**
 * Factory for creating reaction equations.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Shape } from '../../../../kite/js/imports.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, HStrut, Node, Path, RichText, VBox, VStrut } from '../../../../scenery/js/imports.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import createParticleNode from './createParticleNode.js';
import { SolutionType } from '../model/SolutionType.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

// constants
const EQUATION_SCALE = 1.5; // applied to all equations, see issue #88
const VBOX_SPACING = 2;

// constants related to text
const FONT_SIZE = 13;
const FONT = new PhetFont( FONT_SIZE );
const RICH_TEXT_OPTIONS = { font: FONT };
const SUBSCRIPT_HEIGHT = FONT_SIZE / 12; // VStrut with this height is added to any equation term that doesn't have a subscript

// constants related to arrows, issue #95
const ARROWS_VERTICAL_SPACE = 3; // vertical space between reversible arrows
const ARROWS_LENGTH = 25;
const ARROWS_HEAD_RADIUS = 0.72 * ARROWS_LENGTH;
const ARROWS_HEAD_ANGLE_DELTA = 0.2 * Math.PI;

// To make all equations have the same effective dimensions for layout
const ALIGN_GROUP = new AlignGroup();

const ReactionEquationFactory = {

  // 2 H2O <-> H3O+ + OH-
  createWaterEquation( solutionTypeProperty: TReadOnlyProperty<SolutionType> ): Node {
    return createEquation( solutionTypeProperty, 'water', [
      create2H2O(),
      createReversibleArrow(),
      createH3O(),
      createPlus(),
      createOH()
    ] );
  },

  // HA + H2O -> A- + H3O+
  createStrongAcidEquation( solutionTypeProperty: TReadOnlyProperty<SolutionType> ): Node {
    return createAcidEquation( solutionTypeProperty, false /* isWeak */ );
  },

  // HA + H2O <-> A- + H3O+
  createWeakAcidEquation( solutionTypeProperty: TReadOnlyProperty<SolutionType> ): Node {
    return createAcidEquation( solutionTypeProperty, true /* isWeak */ );
  },

  // MOH -> M+ + OH-
  createStrongBaseEquation( solutionTypeProperty: TReadOnlyProperty<SolutionType> ): Node {
    return createEquation( solutionTypeProperty, 'strongBase', [
      createMOH(),
      createIrreversibleArrow(),
      createM(),
      createPlus(),
      createOH()
    ] );
  },

  // B + H2O <-> BH+ + OH-
  createWeakBaseEquation( solutionTypeProperty: TReadOnlyProperty<SolutionType> ): Node {
    return createEquation( solutionTypeProperty, 'weakBase', [
      createB(),
      createPlus(),
      createH2O(),
      createReversibleArrow(),
      createBH(),
      createPlus(),
      createOH()
    ] );
  }
};

// Equations for all acids are similar: HA + H2O ? A- + H3O+
function createAcidEquation( solutionTypeProperty: TReadOnlyProperty<SolutionType>, isWeak: boolean ): Node {
  return createEquation( solutionTypeProperty, ( isWeak ? 'weakAcid' : 'strongAcid' ), [
    createHA(),
    createPlus(),
    createH2O(),
    ( isWeak ? createReversibleArrow() : createIrreversibleArrow() ),
    createA(),
    createPlus(),
    createH3O()
  ] );
}

// Creates an equation by horizontally laying out a set of elements (children).
function createEquation( solutionTypeProperty: TReadOnlyProperty<SolutionType>, soluteType: SolutionType, children: Node[] ): Node {
  return new AlignBox( new HBox( {
    children: children,
    scale: EQUATION_SCALE,
    spacing: 4,
    align: 'bottom',
    visibleProperty: new DerivedProperty( [ solutionTypeProperty ], value => value === soluteType )
  } ), {
    group: ALIGN_GROUP,
    xAlign: 'center',
    yAlign: 'bottom'
  } );
}

// A- node
function createA(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'A' ),
      new RichText( `<i>A</i><sup>${MathSymbols.MINUS}</sup>`, RICH_TEXT_OPTIONS ),
      new VStrut( SUBSCRIPT_HEIGHT )
    ]
  } );
}

// B node
function createB(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'B' ),
      new RichText( '<i>B</i>', RICH_TEXT_OPTIONS ),
      new VStrut( SUBSCRIPT_HEIGHT )
    ]
  } );
}

// BH+ node
function createBH(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'BH' ),
      new HBox( {
        spacing: 1, // this functions like kerning
        align: 'bottom',
        children: [
          new RichText( '<i>B</i>', RICH_TEXT_OPTIONS ),
          new RichText( `H<sup>${MathSymbols.PLUS}</sup>`, RICH_TEXT_OPTIONS ) ]
      } ),
      new VStrut( SUBSCRIPT_HEIGHT )
    ]
  } );
}

// H2O node
function createH2O(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'H2O' ),
      new RichText( 'H<sub>2</sub>O', RICH_TEXT_OPTIONS )
    ]
  } );
}

// 2H2O node
function create2H2O(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      new HBox( {
        spacing: 4,
        children: [
          createParticleNode( 'H2O' ),
          createParticleNode( 'H2O' )
        ]
      } ),
      new HBox( {
        spacing: 3, // this functions like kerning
        align: 'top',
        children: [
          new RichText( '2', RICH_TEXT_OPTIONS ),
          new RichText( 'H<sub>2</sub>O', RICH_TEXT_OPTIONS )
        ]
      } )
    ]
  } );
}

// H3O+ node
function createH3O(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [

      // Add a strut as a bit of a hack to make the big atom in H3O appear aligned with the text.
      new HBox( {
        spacing: 0,
        children: [ createParticleNode( 'H3O' ), new HStrut( 7 ) ]
      } ),
      new RichText( 'H<sub>3</sub>O<sup>+</sup>', RICH_TEXT_OPTIONS )
    ]
  } );
}

// HA node
function createHA(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'HA' ),
      new RichText( 'H<i>A</i>', RICH_TEXT_OPTIONS ),
      new VStrut( SUBSCRIPT_HEIGHT )
    ]
  } );
}

// M+ node
function createM(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'M' ),
      new HBox( {
        spacing: 1, // this functions like kerning
        align: 'origin',
        children: [
          new RichText( '<i>M</i>', RICH_TEXT_OPTIONS ),
          new RichText( `<sup>${MathSymbols.PLUS}</sup>`, RICH_TEXT_OPTIONS )
        ]
      } ),
      new VStrut( SUBSCRIPT_HEIGHT )
    ]
  } );
}

// MOH node
function createMOH(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'MOH' ),
      new HBox( {
        spacing: 1, // this functions like kerning
        align: 'origin',
        children: [
          new RichText( '<i>M</i>', RICH_TEXT_OPTIONS ),
          new RichText( 'OH', RICH_TEXT_OPTIONS )
        ]
      } ),
      new VStrut( SUBSCRIPT_HEIGHT )
    ]
  } );
}

// OH- node
function createOH(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'OH' ),
      new RichText( `OH<sup>${MathSymbols.MINUS}</sup>`, RICH_TEXT_OPTIONS ),
      new VStrut( SUBSCRIPT_HEIGHT )
    ]
  } );
}

// plus sign node
function createPlus(): Node {
  return new VBox( {
    children: [
      new RichText( MathSymbols.PLUS, RICH_TEXT_OPTIONS ),
      new VStrut( SUBSCRIPT_HEIGHT + VBOX_SPACING )
    ]
  } );
}

// double arrow to indicate reversible reaction
function createReversibleArrow(): Node {
  const shape = new Shape()
    // top arrow, points right
    .moveTo( 0, -ARROWS_VERTICAL_SPACE / 2 )
    .lineTo( ARROWS_LENGTH, -ARROWS_VERTICAL_SPACE / 2 )
    .lineTo( ARROWS_LENGTH, -ARROWS_VERTICAL_SPACE / 2 + 0.00001 ) // see issue #104
    .arc( ARROWS_LENGTH, -ARROWS_HEAD_RADIUS - ( ARROWS_VERTICAL_SPACE / 2 ), ARROWS_HEAD_RADIUS, 0.5 * Math.PI, 0.5 * Math.PI + ARROWS_HEAD_ANGLE_DELTA )
    // bottom arrow, points left
    .moveTo( ARROWS_LENGTH, ARROWS_VERTICAL_SPACE / 2 )
    .lineTo( 0, ARROWS_VERTICAL_SPACE / 2 )
    .lineTo( 0, ARROWS_VERTICAL_SPACE / 2 + 0.00001 ) // see issue #104
    .arc( 0, ARROWS_HEAD_RADIUS + ( ARROWS_VERTICAL_SPACE / 2 ), ARROWS_HEAD_RADIUS, -0.5 * Math.PI, -0.5 * Math.PI + ARROWS_HEAD_ANGLE_DELTA );
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      new Path( shape, { stroke: 'black' } ),
      new VStrut( SUBSCRIPT_HEIGHT + FONT_SIZE / 6 )
    ]
  } );

}

// single arrow to indicate irreversible reaction, points right
function createIrreversibleArrow(): Node {

  const shape = new Shape()
    .moveTo( 0, 0 )
    .lineTo( ARROWS_LENGTH, 0 )
    .lineTo( ARROWS_LENGTH, 0.00001 ) // see issue #104
    .arc( ARROWS_LENGTH, -ARROWS_HEAD_RADIUS, ARROWS_HEAD_RADIUS, 0.5 * Math.PI, 0.5 * Math.PI + ARROWS_HEAD_ANGLE_DELTA )
    .moveTo( 25, 0 )
    .arc( ARROWS_LENGTH, ARROWS_HEAD_RADIUS, ARROWS_HEAD_RADIUS, -0.5 * Math.PI, -0.5 * Math.PI - ARROWS_HEAD_ANGLE_DELTA, true );

  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      new Path( shape, { stroke: 'black' } ),
      new VStrut( SUBSCRIPT_HEIGHT + FONT_SIZE / 4 )
    ]
  } );
}

acidBaseSolutions.register( 'ReactionEquationFactory', ReactionEquationFactory );
export default ReactionEquationFactory;