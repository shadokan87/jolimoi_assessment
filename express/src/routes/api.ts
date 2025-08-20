import { Router } from 'express';
import { validateQueryParams } from '../middleware/zodValidate';
import { submitNumberSchema, type SubmitNumberSchema } from '../schema/submitNumber';
import { integerToNumeral } from '../utils';

const router = Router();

router.get("/convert", validateQueryParams(submitNumberSchema), async (req, res) => {
    res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  const { userInput } = req.query as SubmitNumberSchema;
  res.write(`data: ${JSON.stringify({ result: { userInput: integerToNumeral(userInput) } })}\n\n`);
  res.end();
});

export default router;
