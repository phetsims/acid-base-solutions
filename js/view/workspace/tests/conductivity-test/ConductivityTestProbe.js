// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for single probe
 * in the conductivity test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  function ConductivityTestProbe( fill, type, property, options ) {
    var self = this,
      maxY = 370, minY = 40;
    Node.call( this, options );
    this.setCursor( 'pointer' );

    this.addChild( new Rectangle( 0, 0, 16, 55, {fill: fill, stroke: 'black', lineWidth: 0.5} ) );

    if ( type === '+' ) {
      this.addChild( new Rectangle( 5, 45, 6, 2, {fill: 'white'} ) );
      this.addChild( new Rectangle( 7, 43, 2, 6, {fill: 'white'} ) );
    }
    else if ( type === '-' ) {
      this.addChild( new Rectangle( 6, 45, 4, 2, {fill: 'white'} ) );
    }

    var clickYOffset;
    this.addInputListener( new SimpleDragHandler( {
      start: function( e ) {
        clickYOffset = self.globalToParentPoint( e.pointer.point ).y - e.currentTarget.y;
      },
      drag: function( e ) {
        // new y-coordinate
        var y = self.globalToParentPoint( e.pointer.point ).y - clickYOffset;
        // check limitation
        y = Math.min( Math.max( minY, y ), maxY );
        // move to new position
        self.setY( y );
        // check contact with surface
        property.value = y;
      }
    } ) );

    property.link( function( y ) {
      self.setY( y );
    } );
  }

  return inherit( Node, ConductivityTestProbe );
} );
