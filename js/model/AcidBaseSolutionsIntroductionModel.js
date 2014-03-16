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
    AqueousSolutionSet = require( 'model/AqueousSolutions/AqueousSolutionSet' ),
    AcidBaseSolutionsAbstractModel = require( 'ACID_BASE_SOLUTIONS/model/AcidBaseSolutionsAbstractModel' ),
    Solutions = require( 'model/Solutions' ),
    GameModes = require( 'model/GameModes' );

  function AcidBaseSolutionsIntroductionModel( width, height ) {
    AcidBaseSolutionsAbstractModel.call( this,
      width,
      height,
      GameModes.INTRODUCTION,
      [
        new AqueousSolutionSet[Solutions.WATER](),
        new AqueousSolutionSet[Solutions.STRONG_ACID](),
        new AqueousSolutionSet[Solutions.WEAK_ACID](),
        new AqueousSolutionSet[Solutions.STRONG_BASE](),
        new AqueousSolutionSet[Solutions.WEAK_BASE]()
      ],
      Solutions.WATER);
  }

  return inherit( AcidBaseSolutionsAbstractModel, AcidBaseSolutionsIntroductionModel );

} );