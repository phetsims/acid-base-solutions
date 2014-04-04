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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // images
  var solventBackgroundImage = require( 'image!ACID_BASE_SOLUTIONS/../images/solvent.png' );

  /**
   * @param {Node} container
   * @param {Number} radius
   * @constructor
   */
  function MagnifierBackgroundNode( container, radius ) {

    Node.call( this );

    // add holder
    var rectangle = new Rectangle( radius + 2, -radius / 7, radius * 0.9, radius / 4, 5, 5, {fill: 'rgb(85,55,33)', stroke: 'black', lineWidth: 1} );
    rectangle.rotate( Math.PI / 6 );
    this.addChild( rectangle );

    // add lens
    this.addChild( new Circle( radius, {stroke: 'black', lineWidth: 8} ) );

    // add solvent background
    this.solventNode = new Image( solventBackgroundImage,
      {opacity: 0.6, scale: 0.5, x: -radius * Math.SQRT2, y: -radius * Math.SQRT2} );
    container.addChild( this.solventNode );
  }

  return inherit( Node, MagnifierBackgroundNode, {
    setSolventVisible: function( visible ) {
      this.solventNode.visible = visible;
    }
  } );
} );
