// Copyright 2014-2021, University of Colorado Boulder

/**
 * Model for the pH paper in 'Acid-Base Solutions' sim.
 *
 * @author Andrey Zelenkov (Mlearner)
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
import { SolutionType } from '../enum/SolutionType.js';

export default class PHPaper {

  public readonly beaker: Beaker;
  public readonly pHProperty: TReadOnlyProperty<number>;
  public readonly paperSize: Dimension2;
  public readonly dragBounds: Bounds2;
  public readonly positionProperty: Property<Vector2>; // position of the bottom-center of the paper

  public readonly indicatorHeightProperty: Property<number>;

  public constructor( beaker: Beaker,
                      pHProperty: TReadOnlyProperty<number>,
                      solutionTypeProperty: TReadOnlyProperty<SolutionType> ) {

    this.beaker = beaker;
    this.pHProperty = pHProperty;
    this.paperSize = new Dimension2( 16, 110 );

    this.dragBounds = new Bounds2(
      beaker.left + this.paperSize.width / 2, beaker.top - 20,
      beaker.right - this.paperSize.width / 2, beaker.bottom );

    this.positionProperty = new Vector2Property( new Vector2( beaker.right - 60, beaker.top - 10 ) );

    // NOTE: Ideally, indicatorHeight should be a DerivedProperty, but that gets quite messy.
    // height of indicator, the portion of the paper that changes color when dipped in solution
    this.indicatorHeightProperty = new NumberProperty( 0 );

    // clear the indicator color from the paper and recompute its height
    const resetIndicator = () => {
      this.indicatorHeightProperty.set( 0 );
      this.updateIndicatorHeight();
    };
    solutionTypeProperty.link( resetIndicator );
    pHProperty.link( resetIndicator );

    this.positionProperty.link( () => this.updateIndicatorHeight() );
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
    if ( this.beaker.bounds.containsPoint( this.positionProperty.get() ) ) {
      const height = Utils.clamp( this.positionProperty.get().y - this.beaker.top + 5, this.indicatorHeightProperty.get(), this.paperSize.height );
      this.indicatorHeightProperty.set( height );
    }
  }
}

acidBaseSolutions.register( 'PHPaper', PHPaper );