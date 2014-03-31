// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation for magnifier's background
 * in the 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Circle = require( 'SCENERY/nodes/Circle' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Image = require( 'SCENERY/nodes/Image' );

  // images
  var solventBackgroundImage = require( 'image!ACID_BASE_SOLUTIONS/../images/solvent.png' );

  /**
   * @param {Property<Boolean>} solventVisibleProperty
   * @param {Node} container
   * @param {Number} radius
   * @constructor
   */
  function MagnifierBackgroundNode( solventVisibleProperty, container, radius ) {
    var rectangle, solventBackground;
    Node.call( this );

    // add holder
    rectangle = new Rectangle( radius + 2, -radius / 7, radius * 0.9, radius / 4, 5, 5, {fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1} );
    rectangle.rotate( Math.PI / 6 );
    this.addChild( rectangle );

    // add lens
    this.addChild( new Circle( radius, {stroke: 'black', lineWidth: 8} ) );

    // add solvent background
    container.addChild( solventBackground = new Image( solventBackgroundImage, {scale: 0.5, x: -radius * Math.SQRT2, y: -radius * Math.SQRT2} ) );

    solventVisibleProperty.link( function( visible ) {
      solventBackground.setVisible( visible );
    } );
  }

  return inherit( Node, MagnifierBackgroundNode );
} );