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
    EquilibriumConcentrationSingleBar = require( 'ACID_BASE_SOLUTIONS/view/workspace/equilibrium-concentration-graph/EquilibriumConcentrationSingleBar' ),
    EquilibriumConcentrationBarChartBackground = require( 'ACID_BASE_SOLUTIONS/view/workspace/equilibrium-concentration-graph/EquilibriumConcentrationBarChartBackground' ),

  // constants
    MOLECULES_COLORS = require( 'ACID_BASE_SOLUTIONS/model/Constants/MoleculesColors' );

  function EquilibriumConcentrationBarChart( barChartModel ) {
    var self = this,
      relations = {},
      maxBars = 0,
      BAR_CHART_WIDTH = barChartModel.width,
      BAR_CHART_HEIGHT = barChartModel.height;
    Node.call( this, {pickable: false} );
    this._bars = [];

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( BAR_CHART_WIDTH, BAR_CHART_HEIGHT ) );

    // find max bars value for all solution
    barChartModel.solutions.forEach( function( solution ) {
      maxBars = Math.max( maxBars, solution.relations.length );
      relations[solution.type] = solution.relations;
    } );

    // create bars
    for ( var i = 0; i < maxBars; i++ ) {
      this.addChild( this._bars[i] = new EquilibriumConcentrationSingleBar( BAR_CHART_HEIGHT - 10 ) );
    }

    // add observers
    barChartModel.visibility.link( function( isVisible ) {
      self.setVisible( isVisible );
    } );

    barChartModel.solution.link( function( newSolution ) {
      var barNumber = relations[newSolution].length;

      for ( var i = 0, bar; i < maxBars; i++ ) {
        bar = self._bars[i];
        if ( i < barNumber ) {
          // set visibility, color, value and position of new bars
          bar.setVisible( true );
          bar.setValue( barChartModel.components[newSolution].property( relations[newSolution][i].property ).value );
          bar.setFill( MOLECULES_COLORS[relations[newSolution][i].type] );
          bar.setTranslation( (i + 0.75 + (4 - barNumber) / 2) * BAR_CHART_WIDTH / 4, BAR_CHART_HEIGHT );
        }
        else {
          bar.setVisible( false );
        }
      }
    } );

    this.translation = barChartModel.location;

    var updateBarValuesBinded = updateBarValues.bind( this, barChartModel, relations );
    barChartModel.viewMode.link( updateBarValuesBinded );

    // listeners for 'custom solution' tab
    if ( barChartModel.strength && barChartModel.concentration ) {
      barChartModel.strength.link( updateBarValuesBinded );
      barChartModel.concentration.link( updateBarValuesBinded );
    }
  }

  // private methods

  // update values of bars
  var updateBarValues = function( model, relations ) {
    var solution = model.solution.value,
      barNumber = relations[solution].length;

    if ( this.visible ) {
      for ( var i = 0; i < barNumber; i++ ) {
        this._bars[i].setValue( model.components[solution].property( relations[solution][i].property ).value );
      }
    }
  };

  return inherit( Node, EquilibriumConcentrationBarChart );
} );
