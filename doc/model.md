# Acid-Base Solutions - model description

This document is a high-level description of the model used in PhET's _Acid-Base Solutions_ simulation.

This simulation models 5 types of aqueous solutions:
* Pure Water
* Strong Acids
* Weak Acids
* Strong Bases
* Weak Bases

Constants:
* W = concentration of water = 55.6 mol/L
* K<sub>w</sub> = equilibrium constant of water = 1 x 10<sup>-14</sup>

Variables:
* C = concentration of the acid or base in mol/L
* K<sub>a</sub> = strength of acid
* K<sub>b</sub> = strength of base

Generic symbols:
* <i>A</i> = the molecule that separates from hydrogen (H) when a weak or strong acid (HA) dissociates
* <i>M</i> = the metal ion that separates from hydroxide (OH<sup>-</sup>) and remains in solution after a strong base (MOH) dissociates
* <i>B</i> = a weak base molecule that can accept a hydrogen atom to form BH<sup>+</sup>

## Concentration

The notation [X] indicates the concentration of particle X.

Pure Water:
* [H<sub>3</sub>O] = sqrt( K<sub>w</sub> )
* [OH] = [H<sub>3</sub>O]
* [H<sub>2</sub>O] = W

Strong Acids:
* [H<i>A</i>] = 0
* [<i>A</i><sup>-</sup>] = C
* [H<sub>3</sub>O<sup>+</sup>] = C
* [OH<sup>-</sup>] = K<sub>w</sub> / [H<sub>3</sub>O<sup>+</sup>]
* [H<sub>2</sub>O] = W - C

Weak Acids:
* [H<i>A</i>] = C - [H<sub>3</sub>O<sup>+</sup>]
* [<i>A</i><sup>-</sup>] = [H<sub>3</sub>O<sup>+</sup>]
* [H<sub>3</sub>O<sup>+</sup>] = ( -K<sub>a</sub> + sqrt( K<sub>a</sub><sup>2</sup> + 4K<sub>a</sub>C ) ) / 2
* [OH<sup>-</sup>] = K<sub>w</sub> / [H<sub>3</sub>O<sup>+</sup>]
* [H<sub>2</sub>O] = W - [A<sup>-</sup>]

Strong Bases:
* [<i>M</i>OH] = 0
* [<i>M</i>+] = C
* [H<sub>3</sub>O<sup>+</sup>] = K<sub>w</sub> / [OH<sup>-</sup>]
* [OH<sup>-</sup>] = C
* [H<sub>2</sub>O] = W

Weak Bases:
* [<i>B</i>] = C - [<i>B</i>H+]
* [<i>B</i>H+] = ( -K<sub>b</sub> + sqrt( K<sub>b</sub><sup>2</sup> + 4K<sub>b</sub>C ) ) / 2
* [H<sub>3</sub>O<sup>+</sup>] = K<sub>w</sub> / [OH<sup>-</sup>]
* [OH<sup>-</sup>] = [<i>B</i>H<sup>+</sup>]
* [H<sub>2</sub>O] = W - [<i>B</i>H<sup>+</sup>]

## pH

pH ranges from 0 to 14 in this simulation, and is computed as a function of [H<sub>3</sub>O<sup>+</sup>]:
  
* pH = -log<sub>10</sub>( [H<sub>3</sub>O<sup>+</sup>] )

## Conductivity

For the purposes of this simulation, conductivity is modeled as a number between 0 and 1 inclusive.
This value has no units and determines the brightness of the light bulb.
Conductivity is computed as a linear function of pH, as follows:

```
if ( open circuit ) {
  conductivity = 0
}
else if ( pH < 7 ) {
  conductivity = C_neutral + ( ( 1 - C_neutral ) * ( 7 - pH ) / ( 7 - pH_min ) )
}
else if ( pH >= 7 ) {
  conductivity = C_neutral + ( ( 1 - C_neutral ) * ( pH - 7 ) / ( pH_max - 7 ) )
}
```

where:

* pH_min = 0
* pH_max = 14
* C_neutral = conductivity of a neutral (pH = 7) solution (a small constant > 0, currently `0.05`)



