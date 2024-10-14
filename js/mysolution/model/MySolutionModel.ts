// Copyright 2014-2023, University of Colorado Boulder

/**
 * MySolutionModel is the model for the 'My Solution' screen.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSConstants from '../../common/ABSConstants.js';
import ABSModel from '../../common/model/ABSModel.js';
import AqueousSolution, { AqueousSolutionOptions } from '../../common/model/solutions/AqueousSolution.js';
import StrongAcid from '../../common/model/solutions/StrongAcid.js';
import StrongBase from '../../common/model/solutions/StrongBase.js';
import WeakAcid from '../../common/model/solutions/WeakAcid.js';
import WeakBase from '../../common/model/solutions/WeakBase.js';

export default class MySolutionModel extends ABSModel {

  public readonly strongAcid: StrongAcid;
  public readonly weakAcid: WeakAcid;
  public readonly strongBase: StrongBase;
  public readonly weakBase: WeakBase;

  // Is the solution an acid?
  public readonly isAcidProperty: Property<boolean>;

  // Is the solution weak?
  public readonly isWeakProperty: Property<boolean>;

  // The solution's concentration, in mol/L.
  public readonly concentrationProperty: NumberProperty;

  // The solution's strength, relevant for weak solutions, ignored for strong solutions.
  public readonly strengthProperty: Property<number>;

  private readonly resetMySolutionModel: () => void;

  public constructor( tandem: Tandem ) {

    const isAcidProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isAcidProperty' ),
      phetioDocumentation: 'For selecting whether the solution is an Acid or Base',
      phetioFeatured: true
    } );

    const isWeakProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isWeakProperty' ),
      phetioDocumentation: 'For selecting whether the solution is weak or strong',
      phetioFeatured: true
    } );

    // The set of solutions for this screen, synchronized with this.strengthProperty and this.concentrationProperty.
    const solutionsTandem = tandem.createTandem( 'solutions' );
    const solutionOptions: Partial<AqueousSolutionOptions> = {

      // The solutions for this screen. They are read-only because their concentration (for all solutions) and
      // strength (for weak solutions) is kept synchronized with this.concentrationProperty and this.strengthProperty.
      phetioReadOnly: true,

      // strengthProperty and concentrationProperty are not useful to PhET-iO clients in this screen, because they
      // are phetioReadOnly: true, and are kept synchronized with this.strengthProperty and this.concentrationProperty.
      // See https://github.com/phetsims/acid-base-solutions/issues/225
      strengthPropertyFeatured: false,
      concentrationPropertyFeatured: false
    };
    const strongAcid = new StrongAcid( combineOptions<AqueousSolutionOptions>( {
      tandem: solutionsTandem.createTandem( 'strongAcid' )
    }, solutionOptions ) );
    const weakAcid = new WeakAcid( combineOptions<AqueousSolutionOptions>( {
      tandem: solutionsTandem.createTandem( 'weakAcid' )
    }, solutionOptions ) );
    const strongBase = new StrongBase( combineOptions<AqueousSolutionOptions>( {
      tandem: solutionsTandem.createTandem( 'strongBase' )
    }, solutionOptions ) );
    const weakBase = new WeakBase( combineOptions<AqueousSolutionOptions>( {
      tandem: solutionsTandem.createTandem( 'weakBase' )
    }, solutionOptions ) );
    const solutions = [ strongAcid, weakAcid, strongBase, weakBase ];

    // Selected solution is based on how the user sets the 2 AB switches in the control panel.
    const solutionProperty = new DerivedProperty( [ isAcidProperty, isWeakProperty ],
      ( isAcid, isWeak ) => {
        if ( isWeak && isAcid ) {
          return weakAcid;
        }
        else if ( isWeak && !isAcid ) {
          return weakBase;
        }
        else if ( !isWeak && isAcid ) {
          return this.strongAcid;
        }
        else if ( !isWeak && !isAcid ) {
          return this.strongBase;
        }
        else {
          throw new Error( 'unsupported solution type' );
        }
      }, {
        tandem: tandem.createTandem( 'solutionProperty' ),
        phetioValueType: AqueousSolution.AqueousSolutionIO,
        phetioDocumentation: 'The solution model that is being used',
        phetioFeatured: true
      } );

    super( solutions, solutionProperty, tandem );

    this.strongAcid = strongAcid;
    this.weakAcid = weakAcid;
    this.strongBase = strongBase;
    this.weakBase = weakBase;

    this.isAcidProperty = isAcidProperty;
    this.isWeakProperty = isWeakProperty;

    this.concentrationProperty = new NumberProperty( ABSConstants.CONCENTRATION_RANGE.defaultValue, {
      range: ABSConstants.CONCENTRATION_RANGE,
      units: 'mol/L',
      tandem: tandem.createTandem( 'concentrationProperty' ),
      phetioFeatured: true
    } );

    this.strengthProperty = new NumberProperty( ABSConstants.WEAK_STRENGTH_RANGE.defaultValue, {
      range: ABSConstants.WEAK_STRENGTH_RANGE,
      tandem: tandem.createTandem( 'strengthProperty' ),
      phetioDocumentation: 'The acid or base ionization constant, depending on the type of solution. This is relevant only for weak solutions.',
      phetioFeatured: true
    } );

    // Write the concentration value to all solutions.
    this.concentrationProperty.link( concentration => solutions.forEach( solution => {
      solution.concentrationProperty.value = concentration;
    } ) );

    /*
     * Write the strength value to all WEAK solutions.
     * Strong solutions have constant strength, so do not synchronize.
     * See https://github.com/phetsims/acid-base-solutions/issues/94
     */
    this.strengthProperty.link( strength => {
      solutions.forEach( solution => {
        if ( solution === this.weakAcid || solution === this.weakBase ) {
          solution.strengthProperty.value = strength;
        }
      } );
    } );

    this.resetMySolutionModel = () => {
      this.isAcidProperty.reset();
      this.isWeakProperty.reset();
      this.concentrationProperty.reset();
      this.strengthProperty.reset();
    };
  }

  public override reset(): void {
    this.resetMySolutionModel();
    super.reset();
  }
}

acidBaseSolutions.register( 'MySolutionModel', MySolutionModel );