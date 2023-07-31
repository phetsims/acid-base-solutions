// Copyright 2014-2023, University of Colorado Boulder

/**
 * Model for the 'My Solution' screen in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import ABSModel from '../../common/model/ABSModel.js';
import StrongAcid from '../../common/model/solutions/StrongAcid.js';
import StrongBase from '../../common/model/solutions/StrongBase.js';
import WeakAcid from '../../common/model/solutions/WeakAcid.js';
import WeakBase from '../../common/model/solutions/WeakBase.js';
import ABSConstants from '../../common/ABSConstants.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';

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

  public constructor( tandem: Tandem ) {

    const solutionsTandem = tandem.createTandem( 'solutions' );

    const strongAcid = new StrongAcid( solutionsTandem.createTandem( 'strongAcid' ) );
    const weakAcid = new WeakAcid( solutionsTandem.createTandem( 'weakAcid' ) );
    const strongBase = new StrongBase( solutionsTandem.createTandem( 'strongBase' ) );
    const weakBase = new WeakBase( solutionsTandem.createTandem( 'weakBase' ) );

    const solutions = [ strongAcid, weakAcid, strongBase, weakBase ];

    super( solutions, weakAcid, tandem, true /* solutionPropertyReadOnly */ );

    this.strongAcid = strongAcid;
    this.weakAcid = weakAcid;
    this.strongBase = strongBase;
    this.weakBase = weakBase;

    this.isAcidProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'acidBaseProperty' ),
      phetioDocumentation: 'For selecting whether the solution is an Acid or Base'
    } );

    this.isWeakProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'weakStrongProperty' ),
      phetioDocumentation: 'For selecting whether the solution is a weak or strong'
    } );

    this.concentrationProperty = new NumberProperty( this.solutionProperty.value.concentrationProperty.value, {
      reentrant: true,
      range: ABSConstants.CONCENTRATION_RANGE,
      units: 'mol/L',
      tandem: tandem.createTandem( 'concentrationProperty' )
    } );

    this.strengthProperty = new NumberProperty( this.solutionProperty.value.strengthProperty.value, {
      reentrant: true,
      tandem: tandem.createTandem( 'strengthProperty' )
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

    // Note that solutionProperty is phetioReadOnly:true in this model, because we are setting it based on
    // how the user as set the 2 AB switches in the control panel.
    //TODO https://github.com/phetsims/acid-base-solutions/issues/178 change solutionProperty to DerivedProperty for this screen?
    Multilink.multilink( [ this.isAcidProperty, this.isWeakProperty ], ( isAcid, isWeak ) => {
      if ( isWeak && isAcid ) {
        this.solutionProperty.value = this.weakAcid;
      }
      else if ( isWeak && !isAcid ) {
        this.solutionProperty.value = this.weakBase;
      }
      else if ( !isWeak && isAcid ) {
        this.solutionProperty.value = this.strongAcid;
      }
      else if ( !isWeak && !isAcid ) {
        this.solutionProperty.value = this.strongBase;
      }
      else {
        throw new Error( 'unsupported solution type' );
      }
    } );
  }

  public override reset(): void {
    super.reset();
    this.isAcidProperty.reset();
    this.isWeakProperty.reset();
    this.concentrationProperty.reset();
    this.strengthProperty.reset();
  }
}

acidBaseSolutions.register( 'MySolutionModel', MySolutionModel );