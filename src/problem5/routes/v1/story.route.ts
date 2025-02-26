import express from 'express';
import { StoryController } from '../../controllers/story.controller';
import validate from '../../middlewares/validate';
import { createStoryValidate, deleteStoryByIdValidate, getStoryByIdValidate, patchStoryByIdValidate, putStoryByIdValidate } from '../../validations/story.validation';

const storyRouter = express.Router();

const storyController = StoryController.createInstance();

storyController.then((controller) => {
  storyRouter.post('/', validate(createStoryValidate), controller.createStory);
  storyRouter.get('/', controller.getStories);
  storyRouter.get('/:id', validate(getStoryByIdValidate), controller.getStoryById);
  storyRouter.put('/:id', validate(putStoryByIdValidate), controller.updateStory);
  storyRouter.delete('/:id', validate(deleteStoryByIdValidate), controller.deleteStory);
  storyRouter.patch('/:id', validate(patchStoryByIdValidate), controller.patchStory);
});

export default storyRouter;