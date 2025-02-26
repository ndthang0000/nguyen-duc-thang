import express from 'express'
import { StoryController } from '../../controllers/story.controller'
import validate from '../../middlewares/validate'
import {
  createStoryValidate,
  deleteStoryByIdValidate,
  getStoryByIdValidate,
  paginateValidate,
  patchStoryByIdValidate,
  putStoryByIdValidate
} from '../../validations/story.validation'

const storyRouter = express.Router()

const storyController = StoryController.createInstance()

storyController.then((controller) => {
  storyRouter.post('/', validate(createStoryValidate), controller.createStory)
  storyRouter.get('/paginate', validate(paginateValidate), controller.paginateListStory)
  storyRouter.get('/', controller.getStories)
  storyRouter.get('/:id', validate(getStoryByIdValidate), controller.getStoryById)
  storyRouter.put('/:id', validate(putStoryByIdValidate), controller.updateStory)
  storyRouter.delete('/:id', validate(deleteStoryByIdValidate), controller.deleteStory)
  storyRouter.patch('/:id', validate(patchStoryByIdValidate), controller.patchStory)
})

export default storyRouter

/**
 * @openapi
 * /story:
 *   post:
 *     summary: Create a new story
 *     tags:
 *       - Stories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               publish_at:
 *                 type: string
 *                 format: date-time
 *               url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               short_description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Story created successfully
 *
 *   get:
 *     summary: Get all stories
 *     tags:
 *       - Stories
 *     responses:
 *       200:
 *         description: List of stories
 *
 * /story/paginate:
 *   get:
 *     summary: Paginate list of stories
 *     tags:
 *       - Stories
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [created_at:asc, created_at:desc, publish_at:asc, publish_at:desc, title:asc, title:desc]
 *         required: false
 *         description: Field to sort by
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by content
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by title
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by author
 *     responses:
 *       200:
 *         description: Paginated list of stories
 *
 * /story/{id}:
 *   get:
 *     summary: Get a story by ID
 *     tags:
 *       - Stories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Story details
 *       404:
 *         description: Story not found
 *
 *   put:
 *     summary: Update a story by ID
 *     tags:
 *       - Stories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               publish_at:
 *                 type: string
 *                 format: date-time
 *               url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               short_description:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Story updated successfully
 *
 *   delete:
 *     summary: Delete a story by ID
 *       - Stories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Story deleted successfully
 *       404:
 *         description: Story not found
 *
 *   patch:
 *     summary: Partially update a story by ID
 *     tags:
 *       - Stories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               publish_at:
 *                 type: string
 *                 format: date-time
 *               url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               short_description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Story updated successfully
 */

// Let me know if you want me to adjust anything or add more details! 🚀
