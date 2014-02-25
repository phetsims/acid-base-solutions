// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for A molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' );

  function AMolecule( model, coords ) {
    return new Atom( coords, 7, model.MOLECULES_COLORS.A );
  }

  return AMolecule;
} );