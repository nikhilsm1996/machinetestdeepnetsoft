import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from ES6 Express!');
});

export default router;
