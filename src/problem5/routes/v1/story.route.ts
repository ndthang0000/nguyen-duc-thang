import express from 'express';

const storyRouter = express.Router();

storyRouter.get('/', (req, res) => {
  res.send('Story route');
});

export default storyRouter;