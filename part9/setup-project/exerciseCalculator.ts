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
  let ratingDescription;

  // Let's say You're a star! if you work twice harder
  if (average >= target * 2) {
    rating = 3;
  } else if (average >= target) {
    rating = 2;
  } else {
    rating = 1;
  }

  ratingDescription = ratings[rating];

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
