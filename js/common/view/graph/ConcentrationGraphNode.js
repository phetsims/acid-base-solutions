// Copyright 2014-2020, University of Colorado Boulder

/**
 * Concentration graph.
 * To improve performance, updates only when this node is visible.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSColors = require( 'ACID_BASE_SOLUTIONS/common/ABSColors' );
  const acidBaseSolutions = require( 'ACID_BASE_SOLUTIONS/acidBaseSolutions' );
  const ConcentrationGraphBackgroundNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphBackgroundNode' );
  const ConcentrationGraphBarNode = require( 'ACID_BASE_SOLUTIONS/common/view/graph/ConcentrationGraphBarNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {ConcentrationGraph} graph
   * @constructor
   */
  function ConcentrationGraphNode( graph ) {

    const self = this;

    Node.call( this );

    this.graph = graph; // @private
    this.bars = []; // @private

    // add background
    this.addChild( new ConcentrationGraphBackgroundNode( graph.width, graph.height ) );

    // find maximum number of bars for all solutions
    let maxBars = 0;
    for ( const key in graph.solutions ) {
      const solution = graph.solutions[ key ];
      maxBars = Math.max( maxBars, solution.molecules.length );
    }

    // create enough bars for all solutions
    for ( let i = 0; i < maxBars; i++ ) {
      this.addChild( this.bars[ i ] = new ConcentrationGraphBarNode( graph.height - 10 ) );
    }

    this.translation = graph.position;

    // Observe the strength and concentration properties for whichever solution is selected.
    const updateValuesBound = this.updateValues.bind( this );
    graph.solutionTypeProperty.link( function( newSolutionType, prevSolutionType ) {

      // show the correct number of bars
      self.updateBars();

      // unlink from previous solution
      if ( prevSolutionType ) {
        graph.solutions[ prevSolutionType ].strengthProperty.unlink( updateValuesBound );
        graph.solutions[ prevSolutionType ].concentrationProperty.unlink( updateValuesBound );
      }

      // link to new solution
      graph.solutions[ newSolutionType ].strengthProperty.link( updateValuesBound );
      graph.solutions[ newSolutionType ].concentrationProperty.link( updateValuesBound );
    } );
  }

  acidBaseSolutions.register( 'ConcentrationGraphNode', ConcentrationGraphNode );

  return inherit( Node, ConcentrationGraphNode, {

    /*
     * @override @public
     * Update when this node becomes visible.
     */
    setVisible: function( visible ) {
      const wasVisible = this.visible;
      Node.prototype.setVisible.call( this, visible );
      if ( !wasVisible && visible ) {
        this.updateBars();
        this.updateValues();
      }
    },

    /*
     * @private
     * Makes the correct number of bars visible for the selected solution,
     * and sets the bars colors and positions to match the molecules in the solution.
     * To improve performance, updates only when this node is visible.
     */
    updateBars: function() {

      if ( this.visible ) {

        const solutionType = this.graph.solutionTypeProperty.get();
        const solution = this.graph.solutions[ solutionType ];
        const molecules = solution.molecules;
        const numberOfMolecules = molecules.length;

        // show one bar for each molecule in the current solution
        for ( var i = 0, bar; i < this.bars.length; i++ ) {
          bar = this.bars[ i ];
          if ( i < numberOfMolecules ) {
            // set visibility, color, value and position of new bars
            bar.setVisible( true );
            bar.setValue( solution[ molecules[ i ].concentrationFunctionName ]() );
            bar.setBarFill( ABSColors.MOLECULES[ molecules[ i ].key ] );
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

        const solutionType = this.graph.solutionTypeProperty.get();
        const solution = this.graph.solutions[ solutionType ];
        const molecules = solution.molecules;

        for ( let i = 0; i < molecules.length; i++ ) {
          this.bars[ i ].setValue( solution[ molecules[ i ].concentrationFunctionName ]() );
        }
      }
    }
  }, {

    /**
     *  Creates an icon of the graph, with 4 bars (similar to weak acid).
     *  @static
     *  @returns {Node}
     */
    createIcon: function() {
      return new Node( {
        children: [
          new Rectangle( 0, 0, 22, 18, { fill: 'white' } ), // background
          new Rectangle( 2, 6, 3, 12, { fill: ABSColors.MOLECULES.B } ),
          new Rectangle( 7, 3, 3, 15, { fill: ABSColors.MOLECULES.H2O } ),
          new Rectangle( 12, 9, 3, 9, { fill: ABSColors.MOLECULES.A } ),
          new Rectangle( 17, 9, 3, 9, { fill: ABSColors.MOLECULES.H3O } ),
          new Rectangle( 0, 0, 22, 18, { stroke: 'black', lineWidth: 0.5 } ) // background stroke on top
        ]
      } );
    }
  } );
} );
