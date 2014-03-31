// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for concentration bar chart in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var MoleculeColors = require( 'ACID_BASE_SOLUTIONS/common/MoleculeColors' );
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    EquilibriumConcentrationSingleBar = require( 'ACID_BASE_SOLUTIONS/view/workspace/equilibrium-concentration-graph/EquilibriumConcentrationSingleBar' ),
    EquilibriumConcentrationBarChartBackground = require( 'ACID_BASE_SOLUTIONS/view/workspace/equilibrium-concentration-graph/EquilibriumConcentrationBarChartBackground' );

  /**
   * @param {ConcentrationGraph} concentrationGraph
   * @constructor
   */
  function EquilibriumConcentrationBarChart( graph ) {
    var self = this,
      maxBars = 0,
      BAR_CHART_WIDTH = graph.width,
      BAR_CHART_HEIGHT = graph.height;
    Node.call( this, {pickable: false} );
    this._bars = [];

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( BAR_CHART_WIDTH, BAR_CHART_HEIGHT ) );

    // find max bars value for all solutions
    for ( var key in graph.solutions ) {
      var solution = graph.solutions[ key ];
      maxBars = Math.max( maxBars, solution.molecules.length );
    }

    // create enough bars for all solutions
    for ( var i = 0; i < maxBars; i++ ) {
      this.addChild( this._bars[i] = new EquilibriumConcentrationSingleBar( BAR_CHART_HEIGHT - 10 ) );
    }

    // add observers
    graph.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );

    // show bars for a specific solution type, hide extra bars
    graph.solutionTypeProperty.link( function( solutionType ) {

      var molecules = graph.solutions[solutionType].molecules;
      var numberOfMolecules = molecules.length;

      for ( var i = 0, bar; i < maxBars; i++ ) {
        bar = self._bars[i];
        if ( i < numberOfMolecules ) {
          // set visibility, color, value and position of new bars
          bar.setVisible( true );
          bar.setValue( graph.solutions[solutionType].property( molecules[i].concentrationPropertyName ).value );
          bar.setFill( MoleculeColors[molecules[i].key] );
          bar.setTranslation( (i + 0.75 + (4 - numberOfMolecules) / 2) * BAR_CHART_WIDTH / 4, BAR_CHART_HEIGHT );
        }
        else {
          bar.setVisible( false );
        }
      }
    } );

    this.translation = graph.location;

    var updateBarValuesBinded = updateBarValues.bind( this, graph, graph.solutions );
    graph.viewModeProperty.link( updateBarValuesBinded );

    // listeners for 'custom solution' tab
    if ( graph.strengthProperty && graph.concentrationProperty ) {
      graph.strengthProperty.link( updateBarValuesBinded );
      graph.concentrationProperty.link( updateBarValuesBinded );
    }
  }

  /**
   * Update values of bars.
   * @param {BarChartModel} model
   * @param {Array<AqueousSolutions>} solutions associative array of solutions, indexed by solutionType
   */
  var updateBarValues = function( model, solutions ) {

    var solutionType = model.solutionTypeProperty.value;
    var molecules = solutions[solutionType].molecules;
    var numberOfMolecules = molecules.length;

    if ( this.visible ) {
      for ( var i = 0; i < numberOfMolecules; i++ ) {
        this._bars[i].setValue( solutions[solutionType].property( molecules[i].concentrationPropertyName ).value );
      }
    }
  };

  return inherit( Node, EquilibriumConcentrationBarChart );
} );
