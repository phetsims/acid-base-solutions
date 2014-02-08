// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for concentration bar chart in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),

    EquilibriumConcentrationSingleBar = require( './EquilibriumConcentrationSingleBar' ),
    EquilibriumConcentrationBarChartBackground = require( './EquilibriumConcentrationBarChartBackground' );

  function EquilibriumConcentrationBarChart( model, options ) {
    var self = this, width = 200, height = 270,
      colors = model.MOLECULES_COLORS,
      bars = {};
    Node.call( this, options );
    this.model = model;

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( width, height ) );

    // add bars for each solution
    model.SOLUTIONS.forEach( function( solution ) {
      var type = solution.type, bar;
      if ( type in model.components ) {
        bars[type] = new Node( {visible: false} );
        solution.relations.forEach( function( molecule, i ) {
          bars[type].addChild( bar = new EquilibriumConcentrationSingleBar( model.components[type].property( molecule.property ), {fill: colors[molecule.type], height: height - 10 } ) );
          bar.setTranslation( (i + 0.75 + (4 - solution.relations.length) / 2) * width / 4, height );

        } );
        self.addChild( bars[type] );
      }
    } );

    model.property( 'viewMode' ).link( this.checkVisibility.bind( this ) );
    model.property( 'testMode' ).link( this.checkVisibility.bind( this ) );

    model.property( 'solution' ).link( function( newSolution, prevSolution ) {
      bars[newSolution].setVisible( true );
      if ( prevSolution ) {
        bars[prevSolution].setVisible( false );
      }
    } );
  }

  return inherit( Node, EquilibriumConcentrationBarChart, {
    checkVisibility: function() {
      this.setVisible( this.model.viewMode === 'EQUILIBRIUM' && this.model.testMode !== 'CONDUCTIVITY' );
    }
  } );
} );
