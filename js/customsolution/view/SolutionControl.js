// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var ABSConstants = require( 'ACID_BASE_SOLUTIONS/common/ABSConstants' ),
    inherit = require( 'PHET_CORE/inherit' ),
    AquaRadioButton = require( 'SUN/AquaRadioButton' ),
    VBox = require( 'SCENERY/nodes/VBox' ),
    HBox = require( 'SCENERY/nodes/HBox' ),
    Text = require( 'SCENERY/nodes/Text' ),
    HStrut = require( 'SUN/HStrut' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Line = require( 'SCENERY/nodes/Line' ),
    HSeparator = require( 'SUN/HSeparator' ),
    StrengthSlider = require( 'ACID_BASE_SOLUTIONS/customsolution/view/StrengthSlider' ),
    ConcentrationControl = require( 'ACID_BASE_SOLUTIONS/customsolution/view/ConcentrationControl' );

  // strings
  var acidString = require( 'string!ACID_BASE_SOLUTIONS/acid' ),
    baseString = require( 'string!ACID_BASE_SOLUTIONS/base' ),
    initialConcentrationString = require( 'string!ACID_BASE_SOLUTIONS/initialConcentration' ),
    strengthString = require( 'string!ACID_BASE_SOLUTIONS/strength' ),
    weakString = require( 'string!ACID_BASE_SOLUTIONS/weak' ),
    strongString = require( 'string!ACID_BASE_SOLUTIONS/strong' ),
    solutionString = require( 'string!ACID_BASE_SOLUTIONS/solution' );

  // constants
  var FONT = new PhetFont( 12 );
  var RADIO_BUTTON_OPTIONS = {radius: 7};

  /**
   * @param {SolutionMenuModel} solutionMenuModel
   * @param {*} options
   * @constructor
   */
  function SolutionControl( solutionMenuModel, options ) {

    options = _.extend( {
      titleFont: new PhetFont(),
      spacing: 4,
      align: 'left'
    }, options );

    // title
    var solutionTitle = new Text( solutionString, { font: options.titleFont } );

    // type (acid or base) radio buttons
    var typeControl = new HBox( {spacing: 20, children: [
      new AquaRadioButton( solutionMenuModel.isAcidProperty, true, new Text( acidString, {font: FONT} ), RADIO_BUTTON_OPTIONS ),
      new AquaRadioButton( solutionMenuModel.isAcidProperty, false, new Text( baseString, {font: FONT} ), RADIO_BUTTON_OPTIONS )
    ]} );

    // concentration control
    var concentrationTitle = new Text( initialConcentrationString, {font: FONT} );
    var concentrationControl = new ConcentrationControl( solutionMenuModel.concentrationProperty, ABSConstants.CONCENTRATION_RANGE );

    // strength control
    var strengthTitle = new Text( strengthString, {font: FONT} );
    var strengthRadioButtons = new HBox( { spacing: 10, children: [
      new HStrut( 10 ), // indent
      new AquaRadioButton( solutionMenuModel.isWeakProperty, true, new Text( weakString, {font: FONT} ), RADIO_BUTTON_OPTIONS ),
      new AquaRadioButton( solutionMenuModel.isWeakProperty, false, new Text( strongString, {font: FONT} ), RADIO_BUTTON_OPTIONS )
    ] } );
    var strengthSlider = new StrengthSlider( solutionMenuModel.strengthProperty, ABSConstants.WEAK_STRENGTH_RANGE );

    options.children = [
      solutionTitle,
      typeControl,
      concentrationTitle,
      concentrationControl,
      strengthTitle,
      strengthRadioButtons
    ];

    // compute separator width
    var separatorWidth = 0;
    options.children.forEach( function( child ) {
      separatorWidth = Math.max( child.width, separatorWidth );
    } );

    // add separators before titles
    options.children.splice( options.children.indexOf( concentrationTitle ), 0, new HSeparator( separatorWidth ) );
    options.children.splice( options.children.indexOf( strengthTitle ), 0, new HSeparator( separatorWidth ) );

    VBox.call( this, options );

    solutionMenuModel.isWeakProperty.link( function( isWeak ) {
      strengthSlider.visible = isWeak;
    } );
  }

  return inherit( VBox, SolutionControl );
} );