import express from 'express';
import { StoryController } from '../../controllers/story.controller';

const storyRouter = express.Router();

const storyController = StoryController.createInstance();

storyController.then((controller) => {
  storyRouter.post('/', controller.createStory);
  storyRouter.get('/', controller.getStories);
  storyRouter.get('/:id', controller.getStoryById);
  storyRouter.put('/:id', controller.updateStory);
});

export default storyRouter;