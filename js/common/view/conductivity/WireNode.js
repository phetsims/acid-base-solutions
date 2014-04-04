// Copyright 2002-2014, University of Colorado Boulder

/**
 * A single wire, connected to a probe in the conductivity tester.
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
  function WireNode( startX, startY, endX, endY, options ) {

    options = _.extend( {
      stroke: 'black',
      lineWidth: 1.5
    }, options );

    Path.call( this );

    this.startPoint = { x: startX, y: startY }; // @private
    // control point offsets for when probe is to left of light bulb
    this.controlPointOffset = { x: 30, y: -50 }; // @private
    if ( endX < startX ) {
      // probe is to right of light bulb, flip sign on control point x-offset
      this.controlPointOffset.x = -this.controlPointOffset.x;
    }

    this.setEndPoint( endX, endY );

    this.mutate( options );
  }

  return inherit( Path, WireNode, {

    // Sets the end point coordinates, the point attached to the probe.
    setEndPoint: function( endX, endY ) {

      var startX = this.startPoint.x,
        startY = this.startPoint.y,
        controlPointXOffset = this.controlPointOffset.x,
        controlPointYOffset = this.controlPointOffset.y;

      this.setShape( new Shape()
        .moveTo( startX, startY )
        .cubicCurveTo( startX + controlPointXOffset, startY, endX, endY + controlPointYOffset, endX, endY )
      );
    }
  } );
} );
