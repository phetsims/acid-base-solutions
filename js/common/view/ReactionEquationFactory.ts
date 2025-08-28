// Copyright 2014-2025, University of Colorado Boulder

/**
 * ReactionEquationFactory is a collection of factory functions for creating reaction equations.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Shape from '../../../../kite/js/Shape.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import AqueousSolution from '../model/solutions/AqueousSolution.js';
import StrongAcid from '../model/solutions/StrongAcid.js';
import StrongBase from '../model/solutions/StrongBase.js';
import Water from '../model/solutions/Water.js';
import WeakAcid from '../model/solutions/WeakAcid.js';
import WeakBase from '../model/solutions/WeakBase.js';
import createParticleNode from './createParticleNode.js';

// constants
const EQUATION_SCALE = 1.5; // applied to all equations, see https://github.com/phetsims/acid-base-solutions/issues/88
const VBOX_SPACING = 2;

// constants related to text
const FONT_SIZE = 13;
const FONT = new PhetFont( FONT_SIZE );
const RICH_TEXT_OPTIONS = { font: FONT };
const SUBSCRIPT_HEIGHT = FONT_SIZE / 12; // VStrut with this height is added to any equation term that doesn't have a subscript

// constants related to arrows, see https://github.com/phetsims/acid-base-solutions/issues/95
const ARROWS_VERTICAL_SPACE = 3; // vertical space between reversible arrows
const ARROWS_LENGTH = 25;
const ARROWS_HEAD_RADIUS = 0.72 * ARROWS_LENGTH;
const ARROWS_HEAD_ANGLE_DELTA = 0.2 * Math.PI;

// To make all equations have the same effective dimensions for layout
const ALIGN_GROUP = new AlignGroup();

const ReactionEquationFactory = {

  // 2 H2O <-> H3O+ + OH-
  createWaterEquation( solutionProperty: TReadOnlyProperty<AqueousSolution> ): Node {
    const children = [
      create2H2O(),
      createReversibleArrow(),
      createH3O(),
      createPlus(),
      createOH()
    ];
    const visibleProperty = new DerivedProperty( [ solutionProperty ], solution => solution instanceof Water );
    return createEquation( children, visibleProperty );
  },

  // HA + H2O -> A- + H3O+
  createStrongAcidEquation( solutionProperty: TReadOnlyProperty<AqueousSolution> ): Node {
    const visibleProperty = new DerivedProperty( [ solutionProperty ], solution => solution instanceof StrongAcid );
    return createAcidEquation( solutionProperty, false /* isWeak */, visibleProperty );
  },

  // HA + H2O <-> A- + H3O+
  createWeakAcidEquation( solutionProperty: TReadOnlyProperty<AqueousSolution> ): Node {
    const visibleProperty = new DerivedProperty( [ solutionProperty ], solution => solution instanceof WeakAcid );
    return createAcidEquation( solutionProperty, true /* isWeak */, visibleProperty );
  },

  // MOH -> M+ + OH-
  createStrongBaseEquation( solutionProperty: TReadOnlyProperty<AqueousSolution> ): Node {
    const children = [
      createMOH(),
      createIrreversibleArrow(),
      createM(),
      createPlus(),
      createOH()
    ];
    const visibleProperty = new DerivedProperty( [ solutionProperty ], solution => solution instanceof StrongBase );
    return createEquation( children, visibleProperty );
  },

  // B + H2O <-> BH+ + OH-
  createWeakBaseEquation( solutionProperty: TReadOnlyProperty<AqueousSolution> ): Node {
    const children = [
      createB(),
      createPlus(),
      createH2O(),
      createReversibleArrow(),
      createBH(),
      createPlus(),
      createOH()
    ];
    const visibleProperty = new DerivedProperty( [ solutionProperty ], solution => solution instanceof WeakBase );
    return createEquation( children, visibleProperty );
  }
};

// Equations for all acids are similar: HA + H2O ? A- + H3O+
function createAcidEquation( solutionProperty: TReadOnlyProperty<AqueousSolution>, isWeak: boolean, visibleProperty: TReadOnlyProperty<boolean> ): Node {
  const arrow = ( isWeak ? createReversibleArrow() : createIrreversibleArrow() );
  const children = [
    createHA(),
    createPlus(),
    createH2O(),
    arrow,
    createA(),
    createPlus(),
    createH3O()
  ];
  return createEquation( children, visibleProperty );
}

// Creates an equation by horizontally laying out a set of elements (children).
function createEquation( children: Node[], visibleProperty: TReadOnlyProperty<boolean> ): Node {
  return new AlignBox( new HBox( {
    children: children,
    scale: EQUATION_SCALE,
    spacing: 4,
    align: 'bottom',
    visibleProperty: visibleProperty
  } ), {
    group: ALIGN_GROUP,
    xAlign: 'center',
    yAlign: 'bottom'
  } );
}

// A- Node
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

// B Node
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

// BH+ Node
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

// H2O Node
function createH2O(): Node {
  return new VBox( {
    spacing: VBOX_SPACING,
    children: [
      createParticleNode( 'H2O' ),
      new RichText( 'H<sub>2</sub>O', RICH_TEXT_OPTIONS )
    ]
  } );
}

// 2H2O Node
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

// H3O+ Node
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

// HA Node
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

// M+ Node
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

// MOH Node
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

// OH- Node
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

// plus sign Node
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
    .lineTo( ARROWS_LENGTH, -ARROWS_VERTICAL_SPACE / 2 + 0.00001 ) // see https://github.com/phetsims/acid-base-solutions/issues/104
    .arc( ARROWS_LENGTH, -ARROWS_HEAD_RADIUS - ( ARROWS_VERTICAL_SPACE / 2 ), ARROWS_HEAD_RADIUS, 0.5 * Math.PI, 0.5 * Math.PI + ARROWS_HEAD_ANGLE_DELTA )
    // bottom arrow, points left
    .moveTo( ARROWS_LENGTH, ARROWS_VERTICAL_SPACE / 2 )
    .lineTo( 0, ARROWS_VERTICAL_SPACE / 2 )
    .lineTo( 0, ARROWS_VERTICAL_SPACE / 2 + 0.00001 ) // see https://github.com/phetsims/acid-base-solutions/issues/104
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
    .lineTo( ARROWS_LENGTH, 0.00001 ) // see https://github.com/phetsims/acid-base-solutions/issues/104
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