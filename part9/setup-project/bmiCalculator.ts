interface BodyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BodyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0) {
    throw new Error("Provided values are not real");
  }

  const ind = weight / (height / 100) ** 2;
  if (ind < 18.5) return "Underweight";
  if (ind < 25) return "Normal range";
  return "Overweight";
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
