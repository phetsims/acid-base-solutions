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


    EquilibriumConcentrationBarChartBackground = require( './EquilibriumConcentrationBarChartBackground' );

  function EquilibriumConcentrationBarChart( model, options ) {
    var self = this;
    Node.call( this, options );

    // add background
    this.addChild( new EquilibriumConcentrationBarChartBackground( 200, 270 ) );

    model.property( 'viewMode' ).link( function( viewMode ) {
      self.setVisible( viewMode === 'EQUILIBRIUM' );
    } );
  }

  return inherit( Node, EquilibriumConcentrationBarChart );
} );
