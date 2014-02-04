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
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    FONT = new PhetFont( 13 ),

    EquilibriumConcentrationSingleBar = require( './EquilibriumConcentrationSingleBar' ),
    EquilibriumConcentrationBarChartBackground = require( './EquilibriumConcentrationBarChartBackground' );

  function EquilibriumConcentrationBarChart( model, options ) {
    var self = this, width = 200, height = 270,
      colors = model.MOLECULES_COLORS,
      bars = {};
    Node.call( this, options );

    var barsOptions = {
      WATER: ['H2O', 'H3O', 'OH'],
      STRONG_ACID: ['HA', 'H2O', 'A', 'H3O'],
      WEAK_ACID: [ 'HA', 'H2O', 'A', 'H3O'],
      STRONG_BASE: ['MOH', 'M', 'OH'],
      WEAK_BASE: ['B', 'H2O', 'BH', 'OH']
    };

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( width, height ) );

    // add bars for each solution
    model.SOLUTIONS.forEach( function( solution ) {
      var type = solution.type, bar;
      bars[type] = new Node( {visible: false} );
      barsOptions[type].forEach( function( molecule, i ) {
        bars[type].addChild( bar = new EquilibriumConcentrationSingleBar( model, {fill: colors[molecule] } ) );
        bar.setTranslation( (i + 0.75 + (4 - barsOptions[type].length) / 2) * width / 4, height );
      } );
      self.addChild( bars[type] );
    } );

    model.property( 'viewMode' ).link( function( viewMode ) {
      self.setVisible( viewMode === 'EQUILIBRIUM' );
    } );

    model.property( 'solution' ).link( function( newSolution, prevSolution ) {
      bars[newSolution].setVisible( true );
      if ( prevSolution ) {
        bars[prevSolution].setVisible( false );
      }
    } );
  }

  return inherit( Node, EquilibriumConcentrationBarChart );
} );
