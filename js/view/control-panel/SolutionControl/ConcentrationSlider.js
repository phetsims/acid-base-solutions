// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for concentration slider in solution control panel.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Path = require( 'SCENERY/nodes/Path' ),
    Shape = require( 'KITE/Shape' ),
    HSlider = require( 'SUN/HSlider' ),
    Range = require( 'DOT/Range' ),
    Dimension2 = require( 'DOT/Dimension2' );

  function ConcentrationSlider( model, coords ) {
    var range = new Range( -3, 0, model.property( 'concentration' ).get() );
    Node.call( this, coords );

    // add ticks
    for ( var i = range.min, del = range.max - range.min; i <= range.max; i += (range.max - range.min) / 3 ) {
      this.addChild( new Path( Shape.lineSegment(
        150 * (i - range.min) / del, 5,
        150 * (i - range.min) / del, 15
      ), {stroke: 'black', lineWidth: 1} ) );
    }

    // add horizontal part
    this.addChild( new HSlider( model.property( 'concentration' ), range, {
      trackSize: new Dimension2( 150, 2 ),
      thumbSize: new Dimension2( 15, 25 )
    } ) );

  }

  return inherit( Node, ConcentrationSlider );
} );