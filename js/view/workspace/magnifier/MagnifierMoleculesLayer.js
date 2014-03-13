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
    Util = require( 'DOT/Util' ),
    ViewModes = require( 'model/ViewModes' ),

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
    },

  // constants
    BASE_CONCENTRATION = 1E-7, // [H3O+] and [OH-] in pure water, value chosen so that pure water shows some molecules
    BASE_DOTS = 2,
    MAX_MOLECULES = 50; // TODO: should be 200, but sim will load approximately 30 second

  function MagnifierMoleculesLayer( model, boundedSolution, property, type, radius ) {
    var molecules = [],
      setMoleculesBinded;
    Node.call( this );
    this._pointer = 0; // last shown molecule's index

    // add molecules
    for ( var i = 0; i < MAX_MOLECULES; i++ ) {
      this.addChild( molecules[i] = new MoleculesConstructors[type]( {visible: false}, true ) );
    }

    // update number of molecules only when layer is visible
    setMoleculesBinded = setMolecules.bind( this, model, boundedSolution, property, molecules );
    property.lazyLink( setMoleculesBinded );
    model.property( 'viewMode' ).lazyLink( setMoleculesBinded );
    model.property( 'solution' ).link( setMoleculesBinded );

    // update position of molecules if solution have been switched
    model.property( 'solution' ).link( function( newSolution ) {
      if ( boundedSolution === newSolution ) {
        updatePosition( molecules, radius );
      }
    } );
  }

  // return number of molecules
  var getNumberOfMolecules = function( concentration ) {
    var raiseFactor = Util.log10( concentration / BASE_CONCENTRATION ),
      baseFactor = Math.pow( ( MAX_MOLECULES / BASE_DOTS ), ( 1 / Util.log10( 1 / BASE_CONCENTRATION ) ) );
    return Math.round( BASE_DOTS * Math.pow( baseFactor, raiseFactor ) );
  };

  // update position of molecules
  var updatePosition = function( molecules, radius ) {
    var r, fi;
    molecules.forEach( function( molecule ) {
      r = radius * Math.random();
      fi = 2 * Math.PI * Math.random();
      molecule.setTranslation( r * Math.sin( fi ), r * Math.cos( fi ) );
    } );
  };

  // show appropriate number of molecules
  var setMolecules = function( model, boundedSolution, property, molecules ) {
    var numberOfMolecules,
      visibility,
      i;

    // update visibility of layer
    this.setVisible( model.solution === boundedSolution && model.viewMode === ViewModes.MOLECULES );

    // update number of molecules only when layer is visible
    if ( this.visible ) {
      numberOfMolecules = getNumberOfMolecules( property.get() );
      if ( numberOfMolecules !== this._pointer ) {
        for ( i = Math.min( this._pointer, numberOfMolecules ), visibility = (numberOfMolecules > this._pointer); i < Math.max( this._pointer, numberOfMolecules ); i++ ) {
          molecules[i].setVisible( visibility );
        }
        this._pointer = numberOfMolecules;
      }
    }
  };

  return inherit( Node, MagnifierMoleculesLayer );
} );
