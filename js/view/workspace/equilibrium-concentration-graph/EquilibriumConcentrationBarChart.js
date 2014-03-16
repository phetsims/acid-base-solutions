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
    EquilibriumConcentrationBarChartBackground = require( './EquilibriumConcentrationBarChartBackground' ),
    GameModes = require( 'model/GameModes' ),
    ViewModes = require( 'model/ViewModes' ),
    TestModes = require( 'model/TestModes' ),

  // constants
    BAR_CHART_WIDTH = 200,
    BAR_CHART_HEIGHT = 270,
    MOLECULES_COLORS = require( 'model/Constants/MoleculesColors' );

  function EquilibriumConcentrationBarChart( model, options ) {
    var self = this,
      relations = {},
      maxBars = 0;
    Node.call( this, options );
    this.setPickable( false );
    this._bars = [];

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( BAR_CHART_WIDTH, BAR_CHART_HEIGHT ) );

    // find max bars value for all solution
    model.SOLUTIONS.forEach( function( solution ) {
      maxBars = Math.max( maxBars, solution.relations.length );
      relations[solution.type] = solution.relations;
    } );

    for ( var i = 0; i < maxBars; i++ ) {
      this.addChild( this._bars[i] = new EquilibriumConcentrationSingleBar( BAR_CHART_HEIGHT - 10 ) );
    }

    var setVisibilityBinded = setVisibility.bind( this, model );
    model.property( 'viewMode' ).link( setVisibilityBinded );
    model.property( 'testMode' ).link( setVisibilityBinded );


    model.property( 'solution' ).link( function( newSolution ) {
      var barNumber = relations[newSolution].length;

      for ( var i = 0, bar; i < maxBars; i++ ) {
        bar = self._bars[i];
        if ( i < barNumber ) {
          // set visibility, color, value and position of new bars
          bar.setVisible( true );
          bar.setValue( model.components[newSolution].property( relations[newSolution][i].property ).value );
          bar.setFill( MOLECULES_COLORS[relations[newSolution][i].type] );
          bar.setTranslation( (i + 0.75 + (4 - barNumber) / 2) * BAR_CHART_WIDTH / 4, BAR_CHART_HEIGHT );
        }
        else {
          bar.setVisible( false );
        }
      }
    } );

    var updateBarValuesBinded = updateBarValues.bind( this, model, relations );
    model.property( 'viewMode' ).link( updateBarValuesBinded );

    // listeners for 'custom solution' tab
    if ( model.mode === GameModes.CUSTOM_SOLUTION ) {
      model.property( 'strength' ).link( updateBarValuesBinded );
      model.property( 'concentration' ).link( updateBarValuesBinded );
    }
  }

  // private methods

  // set visibility of bar charts
  var setVisibility = function( model ) {
    this.setVisible( model.viewMode === ViewModes.EQUILIBRIUM && model.testMode !== TestModes.CONDUCTIVITY );
  };

  // update values of bars
  var updateBarValues = function( model, relations ) {
    var solution = model.solution,
      barNumber = relations[solution].length;

    if ( this.visible ) {
      for ( var i = 0; i < barNumber; i++ ) {
        this._bars[i].setValue( model.components[solution].property( relations[solution][i].property ).value );
      }
    }
  };

  return inherit( Node, EquilibriumConcentrationBarChart );
} );
