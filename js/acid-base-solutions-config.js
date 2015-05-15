// Copyright 2002-2014, University of Colorado Boulder

/*
 * RequireJS configuration file for the 'Acid-Base Solutions' sim.
 * Paths are relative to the location of this file.
 *
 * @author Andrey Zelenkov (Mlearner)
 */
require.config( {

  deps: [ 'acid-base-solutions-main' ],

  paths: {

    // plugins
    image: '../../chipper/js/requirejs-plugins/image',
    string: '../../chipper/js/requirejs-plugins/string',

    text: '../../sherpa/lib/text-2.0.12',

    // PhET libs, uppercase names to identify them in require.js imports
    AXON: '../../axon/js',
    BRAND: '../../brand/js',
    DOT: '../../dot/js',
    JOIST: '../../joist/js',
    KITE: '../../kite/js',
    PHET_CORE: '../../phet-core/js',
    PHETCOMMON: '../../phetcommon/js',
    REPOSITORY: '..',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    SUN: '../../sun/js',

    // sim code
    ACID_BASE_SOLUTIONS: '.'
  },

  // optional cache buster to make browser refresh load all included scripts, can be disabled with ?cacheBuster=false
  urlArgs: phet.chipper.getCacheBusterArgs()
} );
