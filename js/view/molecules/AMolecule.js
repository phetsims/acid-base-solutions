// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for A molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    COLOR_A = require( 'model/Constants/MoleculesColors' ).A;

  function AMolecule( coords ) {
    return new Atom( 7, COLOR_A, coords );
  }

  return AMolecule;
} );