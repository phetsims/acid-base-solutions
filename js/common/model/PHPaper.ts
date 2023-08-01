// Copyright 2014-2023, University of Colorado Boulder

/**
 * PHPaper is the model for the pH paper.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import acidBaseSolutions from '../../acidBaseSolutions.js';
import Beaker from './Beaker.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import AqueousSolution from './solutions/AqueousSolution.js';
import { Color } from '../../../../scenery/js/imports.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ABSColors from '../ABSColors.js';

export default class PHPaper extends PhetioObject {

  public readonly beaker: Beaker;
  public readonly pHProperty: TReadOnlyProperty<number>;
  public readonly paperSize: Dimension2;
  public readonly colorProperty: TReadOnlyProperty<Color>; // color of the pH paper
  public readonly dragBounds: Bounds2;
  public readonly positionProperty: Property<Vector2>; // position of the bottom-center of the paper

  public readonly indicatorHeightProperty: Property<number>;

  public constructor( beaker: Beaker,
                      pHProperty: ReadOnlyProperty<number>,
                      solutionProperty: TReadOnlyProperty<AqueousSolution>,
                      tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,
      phetioState: false
    } );

    this.beaker = beaker;
    this.pHProperty = pHProperty;
    this.paperSize = new Dimension2( 16, 110 );

    this.colorProperty = DerivedProperty.deriveAny( [ pHProperty, ...ABSColors.PH_PAPER_COLORS ],
      () => pHToColor( pHProperty.value ), {
        // Not very interesting for PhET-iO, so not instrumented.
      } );

    this.dragBounds = new Bounds2(
      beaker.left + this.paperSize.width / 2, beaker.top - 20,
      beaker.right - this.paperSize.width / 2, beaker.bottom );

    this.positionProperty = new Vector2Property( new Vector2( beaker.right - 60, beaker.top - 10 ), {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true // because position is constrained to dragBounds
    } );

    // NOTE: Ideally, indicatorHeight should be a DerivedProperty, but that gets quite messy.
    // height of indicator, the portion of the paper that changes color when dipped in solution
    this.indicatorHeightProperty = new NumberProperty( 0 );

    // clear the indicator color from the paper and recompute its height
    const resetIndicator = () => {
      this.indicatorHeightProperty.value = 0;
      this.updateIndicatorHeight();
    };
    solutionProperty.link( resetIndicator );
    pHProperty.link( resetIndicator );

    this.positionProperty.link( () => this.updateIndicatorHeight() );

    this.addLinkedElement( pHProperty );
  }

  public reset(): void {
    this.indicatorHeightProperty.reset();
    this.positionProperty.reset();
  }

  /**
   * Gets the y coordinate of the top of the pH paper. Origin is at bottom center.
   */
  public getTop(): number {
    return this.positionProperty.value.y - this.paperSize.height;
  }

  public get top(): number { return this.getTop(); }

  /**
   * Updates the height of the indicator. The indicator height only increases, since we want the
   * indicator color to be shown on the paper when it is dipped into solution and pulled out.
   */
  private updateIndicatorHeight(): void {
    if ( this.beaker.bounds.containsPoint( this.positionProperty.value ) ) {
      const min = this.indicatorHeightProperty.value;
      const max = this.paperSize.height;
      this.indicatorHeightProperty.value = Utils.clamp( this.positionProperty.value.y - this.beaker.top + 5, min, max );
    }
  }
}

// Creates a color for a given pH value.
function pHToColor( pH: number ): Color {
  assert && assert( pH >= 0 && pH <= ABSColors.PH_PAPER_COLORS.length - 1 );
  let color;
  if ( Number.isInteger( pH ) ) {

    // pH value is an integer, so look up the color directly.
    color = ABSColors.PH_PAPER_COLORS[ pH ].value;
  }
  else {

    // pH value is not an integer, so interpolate between the 2 closest colors.
    const lowerPH = Math.floor( pH );
    const upperPH = lowerPH + 1;
    const lowerPHColor = ABSColors.PH_PAPER_COLORS[ lowerPH ].value;
    const upperPHColor = ABSColors.PH_PAPER_COLORS[ upperPH ].value;
    color = Color.interpolateRGBA( lowerPHColor, upperPHColor, ( pH - lowerPH ) );
  }
  return color;
}

acidBaseSolutions.register( 'PHPaper', PHPaper );