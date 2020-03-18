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
* Kw = equilibrium constant of water = 1 x 10<sup>-14</sup>

Variables:
* C = concentration of the acid or base in mol/L
* K<sub>a</sub> = strength of acid
* K<sub>b</sub> = strength of base

Generic symbols:
* A = the molecule that separates from hydrogen (H) when a weak or strong acid (HA) dissociates
* M = the metal ion that separates from hydroxide (OH<sup>-</sup>) and remains in solution after a strong base (MOH) dissociates
* B = a weak base molecule that can accept a hydrogen atom to form BH<sup>+</sup>

## Concentration

The notation [X] indicates the concentration of molecule X.

Pure Water:
* [H<sub>3</sub>O] = sqrt(Kw)
* [OH] = [H<sub>3</sub>O]
* [H<sub>2</sub>O] = W

Strong Acids:
* [HA] = 0
* [A<sup>-</sup>] = C
* [H<sub>3</sub>O<sup>+</sup>] = C
* [OH<sup>-</sup>] = Kw / [H<sub>3</sub>O<sup>+</sup>]
* [H<sub>2</sub>O] = W - C

Weak Acids:
* [HA] = C - [H<sub>3</sub>O<sup>+</sup>]
* [A<sup>-</sup>] = [H<sub>3</sub>O<sup>+</sup>]
* [H<sub>3</sub>O<sup>+</sup>] = ( -Ka + sqrt( K<sub>a</sub><sup>2</sup> + 4 * K<sub>a</sub> * C ) ) / 2
* [OH<sup>-</sup>] = Kw / [H<sub>3</sub>O<sup>+</sup>]
* [H<sub>2</sub>O] = W - [A<sup>-</sup>]

Strong Bases:
* [MOH] = 0
* [M+] = C
* [H<sub>3</sub>O<sup>+</sup>] = Kw / [OH<sup>-</sup>]
* [OH<sup>-</sup>] = C
* [H<sub>2</sub>O] = W

Weak Bases:
* [B] = C - [BH+]
* [BH+] = ( -K<sub>b</sub> + sqrt( K<sub>b</sub><sup>2</sup> + 4 * K<sub>b</sub> *C ) ) / 2
* [H<sub>3</sub>O<sup>+</sup>] = K<sub>w</sub> / [OH<sup>-</sup>]
* [OH<sup>-</sup>] = [BH<sup>+</sup>]
* [H<sub>2</sub>O] = W - [BH<sup>+</sup>]

## pH

pH ranges from 0 to 14 in this simulation, and is computed as a function of [H<sub>3</sub>O<sup>+</sup>]:
  
* pH = -log10( [H<sub>3</sub>O<sup>+</sup>] )

## Conductivity

For the purposes of this simulation, conductivity is modeled as a number between 0 and 1 inclusive.
This value has no units and determines the brightness of the light bulb.
Conductivity is computed as a linear function of pH, as follows:

```
if ( open circuit ) {
  conductivity = C_open_circuit
}
else ( if pH < 7 ) {
  conductivity = C_neutral + ( ( 1 - C_neutral ) * ( 7 - pH ) / ( 7 - pH_min ) )
}
else ( if pH >= 7 ) {
  conductivity = C_neutral + ( ( 1 - C_neutral ) * ( pH - 7 ) / ( pH_max - 7 ) )
}
```

where:

* pH_min = 0
* pH_max = 14
* C_open_circuit = 0
* C_max = 1
* C_neutral = conductivity of a neutral (pH=7) solution (a small constant > 0)



