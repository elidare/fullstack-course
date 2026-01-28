interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Ratings {
  [key: number]: string;
}

interface Values {
  target: number;
  days: number[];
}

const parseArgumentsCalculator = (args: string[]): Values => {
  // Assuming nobody will input a long array, let's no have a limit here at the moment
  if (args.length < 4) throw new Error("Not enough arguments");

  const days: number[] = [];
  let target: number;

  // Let's go through args one by one and check every. Push to days if a number
  args.slice(2).forEach((a, ind) => {
    if (isNaN(Number(a))) {
      throw new Error("Provided values are not numbers");
    }
    if (ind === 0) {
      target = Number(a);
    } else {
      days.push(Number(a));
    }
  });

  return {
    target,
    days,
  };
};

const calculateExercises = (days: number[], target: number): Result => {
  // Assuming target always >=0
  const ratings: Ratings = {
    1: "You need to work harder!",
    2: "Good job!",
    3: "You're a star!",
  };

  const periodLength = days.length;
  const trainingDays = days.filter((d) => d > 0).length;
  const average = days.reduce((sum, a) => sum + a, 0) / periodLength;

  const success = average >= target;
  let rating;

  // Let's say You're a star! if you work twice harder
  if (average >= target * 2) {
    rating = 3;
  } else if (average >= target) {
    rating = 2;
  } else {
    rating = 1;
  }

  const ratingDescription = ratings[rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, days } = parseArgumentsCalculator(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
