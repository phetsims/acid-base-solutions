// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for concentration bar chart in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    EquilibriumConcentrationSingleBar = require( 'ACID_BASE_SOLUTIONS/view/workspace/equilibrium-concentration-graph/EquilibriumConcentrationSingleBar' ),
    EquilibriumConcentrationBarChartBackground = require( 'ACID_BASE_SOLUTIONS/view/workspace/equilibrium-concentration-graph/EquilibriumConcentrationBarChartBackground' );

  // constants
  var MOLECULES_COLORS = require( 'ACID_BASE_SOLUTIONS/model/Constants/MoleculesColors' );

  function EquilibriumConcentrationBarChart( barChartModel ) {
    var self = this,
      molecules = {},// associative array, maps {SolutionTypes} to an array of molecules for that solution type
      maxBars = 0,
      BAR_CHART_WIDTH = barChartModel.width,
      BAR_CHART_HEIGHT = barChartModel.height;
    Node.call( this, {pickable: false} );
    this._bars = [];

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( BAR_CHART_WIDTH, BAR_CHART_HEIGHT ) );

    // find max bars value for all solution
    for ( var key in barChartModel.solutions ) {
      var solution = barChartModel.solutions[ key ];
      maxBars = Math.max( maxBars, solution.molecules.length );
      molecules[solution.type] = solution.molecules;
    };

    // create bars
    for ( var i = 0; i < maxBars; i++ ) {
      this.addChild( this._bars[i] = new EquilibriumConcentrationSingleBar( BAR_CHART_HEIGHT - 10 ) );
    }

    // add observers
    barChartModel.visibleProperty.link( function( visible ) {
      self.setVisible( visible );
    } );

    barChartModel.solutionTypeProperty.link( function( solutionType ) {
      var barNumber = molecules[solutionType].length;

      for ( var i = 0, bar; i < maxBars; i++ ) {
        bar = self._bars[i];
        if ( i < barNumber ) {
          // set visibility, color, value and position of new bars
          bar.setVisible( true );
          bar.setValue( barChartModel.solutions[solutionType].property( molecules[solutionType][i].concentrationPropertyName ).value );
          bar.setFill( MOLECULES_COLORS[molecules[solutionType][i].key] );
          bar.setTranslation( (i + 0.75 + (4 - barNumber) / 2) * BAR_CHART_WIDTH / 4, BAR_CHART_HEIGHT );
        }
        else {
          bar.setVisible( false );
        }
      }
    } );

    this.translation = barChartModel.location;

    var updateBarValuesBinded = updateBarValues.bind( this, barChartModel, molecules );
    barChartModel.viewModeProperty.link( updateBarValuesBinded );

    // listeners for 'custom solution' tab
    if ( barChartModel.strengthProperty && barChartModel.concentrationProperty ) {
      barChartModel.strengthProperty.link( updateBarValuesBinded );
      barChartModel.concentrationProperty.link( updateBarValuesBinded );
    }
  }

  // private methods

  // update values of bars
  var updateBarValues = function( model, molecules ) {
    var solutionType = model.solutionTypeProperty.value,
      barNumber = molecules[solutionType].length;

    if ( this.visible ) {
      for ( var i = 0; i < barNumber; i++ ) {
        this._bars[i].setValue( model.solutions[solutionType].property( molecules[solutionType][i].concentrationPropertyName ).value );
      }
    }
  };

  return inherit( Node, EquilibriumConcentrationBarChart );
} );
