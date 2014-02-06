// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for magnifier in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Shape = require( 'KITE/Shape' ),

    MagnifierBackground = require( './MagnifierBackground' );

  var MAX_MOLECULES = 200,
    BASE_DOTS = 2,
    BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules;

  function Magnifier( model, options ) {
    var self = this,
      radius = model.height / 3.6;
    Node.call( this, options );

    // add container for molecules
    this.addChild( this.container = new Node() );
    this.container.setClipArea( new Shape().circle( 0, 0, radius - 4 ) );

    // add background
    this.addChild( new MagnifierBackground( model, radius ) );

    model.property( 'viewMode' ).link( function( mode ) {
      self.setVisible( mode === 'MOLECULES' );
    } );
  }

  return inherit( Node, Magnifier );
} );
