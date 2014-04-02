// Copyright 2002-2014, University of Colorado Boulder

/**
 * Concentration graph.
 * To improve performance, updates only when this node is visible.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  var ConcentrationGraphBarNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphBarNode' );
  var ConcentrationGraphBackgroundNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphBackgroundNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {ConcentrationGraph} graph
   * @constructor
   */
  function ConcentrationGraphNode( graph ) {

    Node.call( this );

    this.graph = graph; //@private
    this.bars = []; //@private

    // add background
    this.addChild( new ConcentrationGraphBackgroundNode( graph.width, graph.height ) );

    // find maximum number of bars for all solutions
    var maxBars = 0;
    for ( var key in graph.solutions ) {
      var solution = graph.solutions[ key ];
      maxBars = Math.max( maxBars, solution.molecules.length );
    }

    // create enough bars for all solutions
    for ( var i = 0; i < maxBars; i++ ) {
      this.addChild( this.bars[i] = new ConcentrationGraphBarNode( graph.height - 10 ) );
    }

    graph.solutionTypeProperty.link( this.updateBars.bind( this ) );
    graph.solutionTypeProperty.link( this.updateValues.bind( this ) );

    this.translation = graph.location;

    // listeners for 'Custom Solution' screen
    if ( graph.strengthProperty && graph.concentrationProperty ) {
      graph.strengthProperty.link( this.updateValues.bind( this ) );
      graph.concentrationProperty.link( this.updateValues.bind( this ) );
    }
  }

  return inherit( Node, ConcentrationGraphNode, {

    /*
     * @override
     * Update when this node becomes visible.
     */
    setVisible: function( visible ) {
      var wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
        this.updateBars();
        this.updateValues();
      }
    },

    /*
     * @private
     * Makes the correct number of bars visible for the selected solution,
     * and sets the bars colors and locations to match the molecules in the solution.
     * To improve performance, updates only when this node is visible.
     */
    updateBars: function() {

      if ( this.visible ) {

        var solutionType = this.graph.solutionTypeProperty.value;
        var molecules = this.graph.solutions[ solutionType ].molecules;
        var numberOfMolecules = molecules.length;

        // show one bar for each molecule in the current solution
        for ( var i = 0, bar; i < this.bars.length; i++ ) {
          bar = this.bars[i];
          if ( i < numberOfMolecules ) {
            // set visibility, color, value and position of new bars
            bar.setVisible( true );
            bar.setValue( this.graph.solutions[solutionType].property( molecules[i].concentrationPropertyName ).value );
            bar.setBarFill( ABSColors.MOLECULES[molecules[i].key] );
            bar.setTranslation( (i + 0.75 + (4 - numberOfMolecules) / 2) * this.graph.width / 4, this.graph.height );
          }
          else {
            bar.setVisible( false );
          }
        }
      }
    },

    /**
     * @private
     * Sets the concentration values on each bar.
     * To improve performance, updates only when this node is visible.
     */
    updateValues: function() {

      if ( this.visible ) {

        var solutionType = this.graph.solutionTypeProperty.value;
        var solution = this.graph.solutions[solutionType];
        var molecules = solution.molecules;

        for ( var i = 0; i < molecules.length; i++ ) {
          this.bars[i].setValue( solution.property( molecules[i].concentrationPropertyName ).value );
        }
      }
    }
  } );
} );
