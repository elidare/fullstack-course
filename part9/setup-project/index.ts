import { Request, Response } from "express";
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

interface BmiParams {
  weight: number;
  height: number;
}

interface ExercisesBody {
  daily_exercises: number[];
  target: number;
}

// https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript
app.get(
  "/bmi",
  (req: Request<unknown, unknown, unknown, BmiParams>, res: Response) => {
    const { weight, height } = req.query;

    if (
      !weight ||
      !height ||
      isNaN(height) ||
      isNaN(weight) ||
      weight <= 0 ||
      height <= 0
    ) {
      res.status(400).send({ message: "Malformatted or incorrect parameters" });
    }

    return res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  },
);

app.post(
  "/exercises",
  (req: Request<unknown, unknown, ExercisesBody, unknown>, res: Response) => {
    const body = req.body;

    if (!body) {
      return res.status(400).send({ message: "Parameters missing" });
    }

    const { daily_exercises, target } = body;

    if (!daily_exercises || !target) {
      return res.status(400).send({ message: "Parameters missing" });
    }

    if (isNaN(target) || daily_exercises.some((a) => isNaN(a))) {
      return res.status(400).send({ message: "Parameters malformatted" });
    }

    return res.json(calculateExercises(daily_exercises, target));
  },
);

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
