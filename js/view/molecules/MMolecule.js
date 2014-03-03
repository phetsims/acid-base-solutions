// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for M molecule.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Atom = require( 'ACID_BASE_SOLUTIONS/view/molecules/Atom' ),
    COLOR_M = require( 'model/Constants/MoleculesColors' ).M;

  function MMolecule( coords ) {
    return new Atom( 7, COLOR_M, coords );
  }

  return MMolecule;
} );