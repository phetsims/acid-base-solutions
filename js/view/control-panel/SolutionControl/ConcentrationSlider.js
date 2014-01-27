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
    READOUT_FONT = new PhetFont( 16 ),
    ARROW_HEIGHT = 15,
    MAX_MASS = 100,
    TICK_MARK_FONT = new PhetFont( 10 );

  function ConcentrationSlider( targetProperty, options ) {
    var self = this,
      sliderValue = new Property( 0 );
    Node.call( this );

    // Create and add the readout, including the background.
    var readoutText = new Text( '0' + ' ' + molesPerLiterString, { font: READOUT_FONT } );
    var readoutBackground = new Rectangle( 0, 0, readoutText.width * 2.5, readoutText.height * 1.5 );
    var panelContent = new Node();
    panelContent.addChild( readoutBackground );
    readoutText.centerY = readoutBackground.centerY;
    panelContent.addChild( readoutText );

    // Create and add the slider.
    var slider = new HSlider( sliderValue, { min: 0, max: MAX_MASS }, {
      thumbSize: new Dimension2( 15, 25 ),
      majorTickLength: 15,
      tickLabelSpacing: 2
    } );
    panelContent.addChild( slider );
    for ( var i = 0; i <= MAX_MASS; i += 10 ) {
      if ( i % 50 === 0 ) {
        slider.addMajorTick( i, new Text( i, { font: TICK_MARK_FONT } ) );
      }
      else {
        slider.addMinorTick( i, null );
      }
    }

    // Create and add the arrow buttons.
    var arrowButtonOptions = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
    var leftArrowButton = new ArrowButton( 'left', function() { sliderValue.value--; }, arrowButtonOptions );
    panelContent.addChild( leftArrowButton );
    var rightArrowButton = new ArrowButton( 'right', function() { sliderValue.value++; }, arrowButtonOptions );
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

    self.mutate( options );
  }

  return inherit( Node, ConcentrationSlider );
} );