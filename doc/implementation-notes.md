Implementation notes for "Acid-Base Solutions" (acid-base-solutions)

This is a port of the Java version of acid-base-solutions. It differs greatly from the Java implementation.

For a description of the model, see model.txt.

There is no model-view transform between the model and view portions of this sim. 
The transform is implicitly 1:1, with identical coordinate frames.
One unit of distance in the model is one unit of distance in the play area.
Positive x is to the right, positive y is down.

Below is the main data structure. Understand this thoroughly before attempting to make changes.
Notice that SolutionType functions both as a property name and a field value, very odd.
Both SolutionType and the 'key' field in the molecules objects are used as indices into
other associative arrays, to lookup colors, equations, molecules, etc.

// AcidBaseSolutionsModel, this.solutions
{
  SolutionType.WATER: {
    type: SolutionType.WATER,
    molecules: [
      {key: 'H2O', concentrationFunctionName: 'getH2OConcentration'},
      {key: 'H3O', concentrationFunctionName: 'getH3OConcentration'},
      {key: 'OH', concentrationFunctionName: 'getOHConcentration'}
    ]
  },

  SolutionType.STRONG_ACID: {
    type: SolutionType.STRONG_ACID,
    // HA + H2O -> A- + H3O+
    molecules: [
      {key: 'HA', concentrationFunctionName: 'getSoluteConcentration'},
      {key: 'H2O', concentrationFunctionName: 'getH2OConcentration'},
      {key: 'A', concentrationFunctionName: 'getProductConcentration'},
      {key: 'H3O', concentrationFunctionName: 'getH3OConcentration'}
    ]
  },

  SolutionType.WEAK_ACID: {
    type: SolutionType.WEAK_ACID,
    molecules: [
      // HA + H2O <-> A- + H3O+
      {key: 'HA', concentrationFunctionName: 'getSoluteConcentration'},
      {key: 'H2O', concentrationFunctionName: 'getH2OConcentration'},
      {key: 'A', concentrationFunctionName: 'getProductConcentration'},
      {key: 'H3O', concentrationFunctionName: 'getH3OConcentration'}
    ]
  },

  SolutionType.STRONG_BASE: {
    type: SolutionType.STRONG_BASE,
    // MOH -> M+ + OH-
    molecules: [
      {key: 'MOH', concentrationFunctionName: 'getSoluteConcentration'},
      {key: 'M', concentrationFunctionName: 'getProductConcentration'},
      {key: 'OH', concentrationFunctionName: 'getOHConcentration'}
    ]
  },

  SolutionType.WEAK_BASE: {
    type: SolutionType.WEAK_BASE,
    // B + H2O <-> BH+ + OH-
    molecules: [
      {key: 'B', concentrationFunctionName: 'getSoluteConcentration'},
      {key: 'H2O', concentrationFunctionName: 'getH2OConcentration'},
      {key: 'BH', concentrationFunctionName: 'getProductConcentration'},
      {key: 'OH', concentrationFunctionName: 'getOHConcentration'}
    ]
  }
}