// Copyright 2002-2013, University of Colorado Boulder

/*
 * RequireJS configuration file for the 'Acid Base Solutions' sim.
 * Paths are relative to the location of this file.
 *
 * @author Andrey Zelenkov (Mlearner)
 */

require.config( {

  deps: ['acid-base-solutions-main'],

  paths: {

    // plugins
    image: '../../chipper/requirejs-plugins/image',
    string: '../../chipper/requirejs-plugins/string',

    text: '../../sherpa/text',

    // PhET libs, uppercase names to identify them in require.js imports
    ASSERT: '../../assert/js',
    AXON: '../../axon/js',
    DOT: '../../dot/js',
    JOIST: '../../joist/js',
    KITE: '../../kite/js',
    NITROGLYCERIN: '../../nitroglycerin/js',
    PHET_CORE: '../../phet-core/js',
    PHETCOMMON: '../../phetcommon/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    SUN: '../../sun/js',
    ACID_BASE_SOLUTIONS: '.'
  },

  urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts
} );
