// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for lightbulb, battery and wires in the conductivity test in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' );

  function ConductivityTest( model, options ) {
    Node.call( this, options );
  }

  return inherit( Node, ConductivityTest );
} );
