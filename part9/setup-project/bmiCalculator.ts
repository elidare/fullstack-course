const calculateBmi = (height: number, weight: number): string => {
  const ind = weight / (height / 100) ** 2;
  if (ind < 18.5) return "Underweight";
  if (ind < 25) return "Normal range";
  return "Overweight";
};

console.log(calculateBmi(180, 74));
