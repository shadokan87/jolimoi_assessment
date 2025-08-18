import { Router } from 'express';
import { validateBody } from '../middleware/zodValidate';
import { submitNumberSchema } from '../schema/submitNumber';

const router = Router();

// Example API routes
router.get('/users', (req, res) => {
  res.json({
    message: 'Users endpoint',
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]
  });
});

router.post("/convert", validateBody(submitNumberSchema), (req, res) => {
    console.log("body", JSON.stringify(req.body, null, 2))
    return res.status(200);
});

router.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }
  
  res.status(201).json({
    message: 'User created successfully',
    user: { id: Date.now(), name, email }
  });
});

export default router;
