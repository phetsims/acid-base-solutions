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

    var barsOptions = {
      WATER: [
        {type: 'H2O', property: 'H2O'},
        {type: 'H3O', property: 'H3O'},
        {type: 'OH', property: 'OH'}
      ],
      STRONG_ACID: [
        {type: 'HA', property: 'solute'},
        {type: 'H2O', property: 'H2O'},
        {type: 'A', property: 'product'},
        {type: 'H3O', property: 'H3O'}
      ],
      WEAK_ACID: [
        {type: 'HA', property: 'solute'},
        {type: 'H2O', property: 'H2O'},
        {type: 'A', property: 'product'},
        {type: 'H3O', property: 'H3O'}
      ],
      STRONG_BASE: [
        {type: 'MOH', property: 'solute'},
        {type: 'M', property: 'product'},
        {type: 'OH', property: 'OH'}
      ],
      WEAK_BASE: [
        {type: 'B', property: 'solute'},
        {type: 'H2O', property: 'H2O'},
        {type: 'BH', property: 'product'},
        {type: 'OH', property: 'OH'}
      ]
    };

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( width, height ) );

    // add bars for each solution
    model.SOLUTIONS.forEach( function( solution ) {
      var type = solution.type, bar;
      bars[type] = new Node( {visible: false} );
      barsOptions[type].forEach( function( molecule, i ) {
        if ( type in model.components ) {
          bars[type].addChild( bar = new EquilibriumConcentrationSingleBar( model.components[type].property( molecule.property ), {fill: colors[molecule.type], height: height - 10 } ) );
          bar.setTranslation( (i + 0.75 + (4 - barsOptions[type].length) / 2) * width / 4, height );
        }
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
