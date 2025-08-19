import { Router } from 'express';
import { validateBody } from '../middleware/zodValidate';
import { submitNumberSchema, type SubmitNumberSchema } from '../schema/submitNumber';
import { integerToNumeral } from '../utils';

const router = Router();

router.post("/convert", validateBody(submitNumberSchema), async (req, res) => {
  console.log("body", JSON.stringify(req.body, null, 2));
  const { userInput } = req.body as SubmitNumberSchema;
  return res.status(200).json({ result: { userInput: integerToNumeral(userInput) } });
});

export default router;
