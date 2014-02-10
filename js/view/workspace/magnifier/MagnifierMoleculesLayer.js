// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation for single molecule type
 * within magnifier in the 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  "use strict";

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    Node = require( 'SCENERY/nodes/Node' ),

  // molecules
    MoleculesConstructors = {
      A: require( 'ACID_BASE_SOLUTIONS/view/molecules/AMolecule' ),
      B: require( 'ACID_BASE_SOLUTIONS/view/molecules/BMolecule' ),
      BH: require( 'ACID_BASE_SOLUTIONS/view/molecules/BHMolecule' ),
      H2O: require( 'ACID_BASE_SOLUTIONS/view/molecules/H2OMolecule' ),
      H3O: require( 'ACID_BASE_SOLUTIONS/view/molecules/H3OMolecule' ),
      HA: require( 'ACID_BASE_SOLUTIONS/view/molecules/HAMolecule' ),
      M: require( 'ACID_BASE_SOLUTIONS/view/molecules/MMolecule' ),
      MOH: require( 'ACID_BASE_SOLUTIONS/view/molecules/MOHMolecule' ),
      OH: require( 'ACID_BASE_SOLUTIONS/view/molecules/OHMolecule' )
    };

  var MAX_MOLECULES = 50, // TODO: should be 200, but sim will load approximately 30 second
    BASE_DOTS = 2,
    BASE_CONCENTRATION = 1E-7; // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules;

  var getNumberOfMolecules = function( concentration ) {
    var raiseFactor = Math.log( concentration / BASE_CONCENTRATION ) / Math.LN10,
      baseFactor = Math.pow( ( MAX_MOLECULES / BASE_DOTS ), ( Math.LN10 / Math.log( 1 / BASE_CONCENTRATION ) ) );
    return Math.round( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
  };

  function MagnifierMoleculesLayer( model, property, type, radius ) {
    var self = this,
      pointer = 0; // last shown molecule's index
    Node.call( this );
    this.molecules = [];
    this.radius = radius;

    // add molecules
    for ( var i = 0; i < MAX_MOLECULES; i++ ) {
      this.addChild( this.molecules[i] = new MoleculesConstructors[type]( model, {visible: false}, true ) );
    }

    property.link( function( value ) {
      var numberOfMolecules = getNumberOfMolecules( value ), i, visibility;
      // show appropriate number of molecules
      if ( numberOfMolecules !== pointer ) {
        for ( i = Math.min( pointer, numberOfMolecules ), visibility = (numberOfMolecules > pointer); i < Math.max( pointer, numberOfMolecules ); i++ ) {
          self.molecules[i].setVisible( visibility );
        }
        pointer = numberOfMolecules;
      }
    } );
  }

  return inherit( Node, MagnifierMoleculesLayer, {
    // update position of molecules
    update: function() {
      var r, fi, radius = this.radius;
      this.molecules.forEach( function( molecule ) {
        r = radius * Math.random();
        fi = 2 * Math.PI * Math.random();
        molecule.setTranslation( r * Math.sin( fi ), r * Math.cos( fi ) );
      } );
    }
  } );
} );
