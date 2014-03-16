// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for the 'Introduction' screen in 'Acid Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' ),
    AcidBaseSolutionsAbstractModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsAbstractModel' ),
    Solutions = require( 'model/Solutions' ),
    GameModes = require( 'model/GameModes' ),
    WaterSolution = require( 'model/AqueousSolutions/WaterSolution' ),
    StrongAcidSolution = require( 'model/AqueousSolutions/StrongAcidSolution' ),
    WeakAcidSolution = require( 'model/AqueousSolutions/WeakAcidSolution' ),
    StrongBaseSolution = require( 'model/AqueousSolutions/StrongBaseSolution' ),
    WeakBaseSolution = require( 'model/AqueousSolutions/WeakBaseSolution' );

  function AcidBaseSolutionsIntroductionModel( width, height ) {
    AcidBaseSolutionsAbstractModel.call( this,
      width,
      height,
      GameModes.INTRODUCTION,
      [
        new WaterSolution(),
        new StrongAcidSolution(),
        new WeakAcidSolution(),
        new StrongBaseSolution(),
        new WeakBaseSolution()
      ],
      Solutions.WATER );
  }

  return inherit( AcidBaseSolutionsAbstractModel, AcidBaseSolutionsIntroductionModel );

} );