// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for B molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    COLOR_B = require( 'model/Constants/MoleculesColors' ).B;

  function BMolecule( coords ) {
    return new Atom( 7, COLOR_B, coords );
  }

  return BMolecule;
} );