// Copyright 2002-2014, University of Colorado Boulder

/**
 * This class presents a dialog to the user that allows them to enter a initial concentration value.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // Imports
  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' ),
    Dimension2 = require( 'DOT/Dimension2' ),
    inherit = require( 'PHET_CORE/inherit' ),
    molesPerLiterString = require( 'string!ACID_BASE_SOLUTIONS/molesPerLiter' ),
    Node = require( 'SCENERY/nodes/Node' ),
    Panel = require( 'SUN/Panel' ),
    Property = require( 'AXON/Property' ),
    PhetFont = require( 'SCENERY_PHET/PhetFont' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    Text = require( 'SCENERY/nodes/Text' ),
    HSlider = require( 'SUN/HSlider' ),

  // Constants
    READOUT_FONT = new PhetFont( 12 ),
    ARROW_HEIGHT = 15,
    CONCENTRATION_MIN = -3,
    CONCENTRATION_MAX = 0,
    CONCENTRATION_STEP = 0.1;

  function ConcentrationSlider( targetProperty, options ) {
    var self = this,
      sliderValue = new Property( Math.log( targetProperty.value ) / Math.LN10 );
    Node.call( this );

    // Create and add the readout, including the background.
    var readoutText = new Text( '0' + ' ' + molesPerLiterString, { font: READOUT_FONT } );
    var readoutBackground = new Rectangle( 0, 0, readoutText.width * 2.5, readoutText.height * 1.5 );
    var panelContent = new Node();
    panelContent.addChild( readoutBackground );
    readoutText.centerY = readoutBackground.centerY;
    panelContent.addChild( readoutText );

    // Create and add the slider.
    var slider = new HSlider( sliderValue, { min: CONCENTRATION_MIN, max: CONCENTRATION_MAX }, {
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: 15,
      tickLabelSpacing: 2
    } );
    panelContent.addChild( slider );
    for ( var i = CONCENTRATION_MIN; i <= CONCENTRATION_MAX; i += (CONCENTRATION_MAX - CONCENTRATION_MIN) / 3 ) {
      slider.addMinorTick( i, null );
    }

    // Create and add the arrow buttons.
    var arrowButtonOptions = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
    var leftArrowButton = new ArrowButton( 'left', function() { sliderValue.value -= CONCENTRATION_STEP; }, arrowButtonOptions );
    panelContent.addChild( leftArrowButton );
    var rightArrowButton = new ArrowButton( 'right', function() { sliderValue.value += CONCENTRATION_STEP; }, arrowButtonOptions );
    panelContent.addChild( rightArrowButton );

    // layout
    readoutBackground.centerX = slider.bounds.width / 2;
    readoutBackground.top = 0;
    slider.left = 0;
    slider.top = readoutBackground.bottom + 5;
    leftArrowButton.right = slider.left - 12;
    leftArrowButton.centerY = slider.centerY;
    rightArrowButton.left = slider.right + 12;
    rightArrowButton.centerY = slider.centerY;

    // Put the contents into a panel.
    var panel = new Panel( panelContent, {fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)'} );
    self.addChild( panel );

    // Update the readout text whenever the value changes.
    targetProperty.link( function( value ) {
      readoutText.text = value + ' ' + molesPerLiterString;
      readoutText.centerX = readoutBackground.centerX;
    } );

    sliderValue.link( function( value ) {
      targetProperty.value = parseFloat( Math.pow( 10, value ).toPrecision( 2 ) );
    } );

    self.mutate( options );
  }

  return inherit( Node, ConcentrationSlider );
} );