// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for single wire
 * in the conductivity test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),

  // constants
    CONTROL_POINT = {
      positive: {x: 12.5, y: -50},
      negative: {x: -12.5, y: -50}
    };

  function ConductivityTestWire( type, startX, startY, endX, endY ) {
    Path.call( this );
    this.setStroke( 'black' );
    this.setLineWidth( 1.5 );

    this.startPoint = {x: startX, y: startY};
    this.controlPoint = CONTROL_POINT[type];

    this.setEndPoint( endX, endY );
  }

  return inherit( Path, ConductivityTestWire, {
    setEndPoint: function( endX, endY ) {
      var startX = this.startPoint.x,
        startY = this.startPoint.y,
        controlPointDX = this.controlPoint.x,
        controlPointDY = this.controlPoint.y;

      this.setShape( new Shape().moveTo( startX, startY ).cubicCurveTo( startX + controlPointDX, startY, endX, endY + controlPointDY, endX, endY ) );
    }
  } );
} );
