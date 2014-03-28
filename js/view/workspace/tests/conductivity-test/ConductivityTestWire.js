// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for single wire
 * in the conductivity test in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param startX
   * @param startY
   * @param endX
   * @param endY
   * @param {*} options
   * @constructor
   */
  function ConductivityTestWire( startX, startY, endX, endY, options ) {

    options = _.extend( {
      endPointOnRight: true, // true if the wire's end point is to the right of its start point
      stroke: 'black',
      lineWidth: 1.5
    }, options );

    Path.call( this );

    this.startPoint = { x: startX, y: startY }; // @private
    this.controlPointOffset = { x: 12.5, y: -50 }; // @private
    if ( options.endPointOnRight ) {
      this.controlPointOffset.x = -this.controlPointOffset.x;
    }

    this.setEndPoint( endX, endY );

    this.mutate( options );
  }

  return inherit( Path, ConductivityTestWire, {

    setEndPoint: function( endX, endY ) {

      var startX = this.startPoint.x,
        startY = this.startPoint.y,
        controlPointXOffset = this.controlPointOffset.x,
        controlPointYOffset = this.controlPointOffset.y;

      this.setShape( new Shape().
        moveTo( startX, startY ).
        cubicCurveTo( startX + controlPointXOffset, startY, endX, endY + controlPointYOffset, endX, endY )
      );
    }
  } );
} );
