import { Request, Response } from "express";
import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

interface BmiParams {
  weight: number;
  height: number;
}

app.get("/bmi", (req: Request<{}, {}, {}, BmiParams>, res: Response) => {
  const { weight, height } = req.query;

  if (!weight || !height || weight <= 0 || height <= 0) {
    res.status(400).send({ message: "Malformatted parameters" });
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
