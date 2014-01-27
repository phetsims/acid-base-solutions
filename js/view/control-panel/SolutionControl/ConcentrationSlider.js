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

  function ConcentrationSlider( model, options ) {
    var self = this;
    Node.call( this );
    self.massValue = new Property( 0 );

    // Create and add the readout, including the background.
    var readoutText = new Text( '0' + ' ' + molesPerLiterString, { font: READOUT_FONT } );
    var readoutBackground = new Rectangle( 0, 0, readoutText.width * 2.5, readoutText.height * 1.5 );
    var panelContent = new Node();
    panelContent.addChild( readoutBackground );
    readoutText.centerY = readoutBackground.centerY;
    panelContent.addChild( readoutText );

    // Create and add the slider.
    this.sliderValue = new Property( 0 );
    var slider = new HSlider( self.sliderValue, { min: 0, max: MAX_MASS }, {
      thumbSize: new Dimension2( 15, 30 ),
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

    // Hook up the slider property to the mass value so that mass only contains integer values.
    self.sliderValue.link( function( value ) {
      self.massValue.value = Math.round( value );
    } );

    // Create and add the arrow buttons.
    var arrowButtonOptions = { arrowHeight: ARROW_HEIGHT, arrowWidth: ARROW_HEIGHT * Math.sqrt( 3 ) / 2 };
    var leftArrowButton = new ArrowButton( 'left', function() { self.massValue.value--; }, arrowButtonOptions );
    panelContent.addChild( leftArrowButton );
    var rightArrowButton = new ArrowButton( 'right', function() { self.massValue.value++; }, arrowButtonOptions );
    panelContent.addChild( rightArrowButton );

    // layout
    self.massValue.value = MAX_MASS / 2; // Make sure slider is in the middle during layout.
    readoutBackground.centerX = slider.bounds.width / 2;
    readoutBackground.top = 0;
    slider.left = 0;
    slider.top = readoutBackground.bottom + 5;
    leftArrowButton.right = slider.left - 12;
    leftArrowButton.centerY = slider.centerY;
    rightArrowButton.left = slider.right + 12;
    rightArrowButton.centerY = slider.centerY;
    self.massValue.reset(); // Put slider back to original position.

    // Put the contents into a panel.
    var panel = new Panel( panelContent, {fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)'} );
    self.addChild( panel );

    // Update the readout text whenever the value changes.
    self.massValue.link( function( value ) {
      readoutText.text = value + ' ' + molesPerLiterString;
      readoutText.centerX = readoutBackground.centerX;
    } );

    self.mutate( options );
  }

  return inherit( Node, ConcentrationSlider, {
    clear: function() {
      this.sliderValue.reset();
    },
    showAnswer: function( massValue ) {
      this.sliderValue.value = massValue;
    }
  } );
} );