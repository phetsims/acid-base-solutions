# Acid-Base Solutions - implementation notes

This is a port of the Java version of acid-base-solutions. It differs greatly from the Java implementation.

For a description of the model, see [model.md](https://github.com/phetsims/acid-base-solutions/blob/master/doc/model.md).

There is no model-view transform between the model and view portions of this sim. 
The transform is implicitly 1:1, with identical coordinate frames.
One unit of distance in the model is one unit of distance in the play area.
Positive x is to the right, positive y is down.
