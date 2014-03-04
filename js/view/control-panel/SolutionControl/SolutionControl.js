// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of solution menu.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Line = require( 'SCENERY/nodes/Line' ),
    StrengthSlider = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionControl/StrengthSlider' ),
    ConcentrationSlider = require( 'ACID_BASE_SOLUTIONS/view/control-panel/SolutionControl/ConcentrationSlider' ),

  // strings
    acidString = require( 'string!ACID_BASE_SOLUTIONS/acid' ),
    baseString = require( 'string!ACID_BASE_SOLUTIONS/base' ),
    initialConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/initialConcentration' ),
    strengthString = require( 'string!ACID_BASE_SOLUTIONS/strength' ),
    weakString = require( 'string!ACID_BASE_SOLUTIONS/weak' ),
    strongString = require( 'string!ACID_BASE_SOLUTIONS/strong' ),

  // constants
    FONT = new PhetFont( 12 ),
    CONSTANTS = require( 'model/Constants/Constants' );

  function SolutionControl( model, options ) {
    var vBox = new VBox( {spacing: 4} ),
      strengthSlider,
      concentrationSlider;
    Node.call( this, options );

    // add type radio buttons menu
    vBox.addChild( new HBox( {spacing: 5, children: [
      new AquaRadioButton( model.property( 'isAcid' ), true, new Text( acidString, {font: FONT} ), {radius: 7} ),
      new AquaRadioButton( model.property( 'isAcid' ), false, new Text( baseString, {font: FONT} ), {radius: 7} )
    ]} ) );

    // add black line
    vBox.addChild( new Line( 15, 0, 170, 0, {stroke: 'black', lineWidth: 0.75} ) );

    // add concentration slider
    vBox.addChild( new Text( initialConcentrationString, {font: FONT} ) );
    vBox.addChild( concentrationSlider = new ConcentrationSlider( model.property( 'concentration' ), CONSTANTS.CONCENTRATION_RANGE ) );

    // add black line
    vBox.addChild( new Line( 15, 0, 170, 0, {stroke: 'black', lineWidth: 0.75} ) );

    // add strength radio button
    vBox.addChild( new Text( strengthString, {font: FONT} ) );
    vBox.addChild( new HBox( {spacing: 5, children: [ // strength radio buttons menu
      new AquaRadioButton( model.property( 'isWeak' ), true, new Text( weakString, {font: FONT} ), {radius: 7} ),
      new AquaRadioButton( model.property( 'isWeak' ), false, new Text( strongString, {font: FONT} ), {radius: 7} )
    ]} ) );

    // add strength slider
    vBox.addChild( strengthSlider = new StrengthSlider( model.property( 'strength' ), CONSTANTS.WEAK_STRENGTH_RANGE ) );

    this.addChild( vBox );
    vBox.updateLayout();

    model.property( 'isWeak' ).link( function( isWeak ) {
      strengthSlider.setVisible( isWeak );
    } );
  }

  return inherit( Node, SolutionControl );
} );