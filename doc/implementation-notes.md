# Acid-Base Solutions - implementation notes

This is a port of the Java version of acid-base-solutions. It differs greatly from the Java implementation.

For a description of the model, see [model.md](https://github.com/phetsims/acid-base-solutions/blob/master/doc/model.md).

`AqueousSolution` is the base class for all solutions.

`ABSModel` is the base class model.

There is no model-view transform in this sim. 
The transform is implicitly 1:1, with identical coordinate frames.
One unit of distance in the model === one unit of distance in the view.
Positive x is to the right, positive y is down.

For the molecules shown in the magnifying class ("Molecules" view),
the algorithm is documented in [acid-base-solutions/doc/HA_A-_ratio_model.pdf](https://github.com/phetsims/acid-base-solutions/blob/master/doc/HA_A-_ratio_model.pdf).