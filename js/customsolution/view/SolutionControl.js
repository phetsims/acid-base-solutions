// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control for modifying a custom solutions.
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
    StrengthSlider = require( 'ACID_BASE_SOLUTIONS/customsolution/view/StrengthSlider' ),
    ConcentrationSlider = require( 'ACID_BASE_SOLUTIONS/customsolution/view/ConcentrationSlider' );

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

    var vBox = new VBox( options ),
      strengthSlider;

    Node.call( this, options );

    vBox.addChild( new Text( solutionString, { font: options.titleFont } ) );

    // add type radio buttons menu
    vBox.addChild( new HBox( {spacing: 5, children: [
      new AquaRadioButton( solutionMenuModel.isAcidProperty, true, new Text( acidString, {font: FONT} ), {radius: 7} ),
      new AquaRadioButton( solutionMenuModel.isAcidProperty, false, new Text( baseString, {font: FONT} ), {radius: 7} )
    ]} ) );

    // add black line
    vBox.addChild( new Line( 15, 0, 170, 0, {stroke: 'black', lineWidth: 0.75} ) );

    // add concentration slider
    vBox.addChild( new Text( initialConcentrationString, {font: FONT} ) );
    vBox.addChild( new ConcentrationSlider( solutionMenuModel.concentrationProperty ) );

    // add black line
    vBox.addChild( new Line( 15, 0, 170, 0, {stroke: 'black', lineWidth: 0.75} ) );

    // add strength radio button
    vBox.addChild( new Text( strengthString, {font: FONT} ) );
    vBox.addChild( new HBox( {spacing: 5, children: [ // strength radio buttons menu
      new AquaRadioButton( solutionMenuModel.isWeakProperty, true, new Text( weakString, {font: FONT} ), {radius: 7} ),
      new AquaRadioButton( solutionMenuModel.isWeakProperty, false, new Text( strongString, {font: FONT} ), {radius: 7} )
    ]} ) );

    // add strength slider
    vBox.addChild( strengthSlider = new StrengthSlider( solutionMenuModel.strengthProperty ) );

    this.addChild( vBox );
    vBox.updateLayout();

    solutionMenuModel.isWeakProperty.link( function( isWeak ) {
      strengthSlider.visible = isWeak;
    } );
  }

  return inherit( Node, SolutionControl );
} );