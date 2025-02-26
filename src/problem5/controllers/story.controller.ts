import { Request, Response } from 'express';
import { StoryRepository } from '../infrastructure/repository/story.repository';
import { initDb } from '../infrastructure/database/connect';
import { Database } from 'sqlite';
import status from 'http-status';
import { cleanObject } from '../infrastructure/utils/cleanObject';

export class StoryController {
  private _storyRepo!: StoryRepository;

  private constructor(db: Database) {
    this._storyRepo = new StoryRepository(db);
    this.getStories = this.getStories.bind(this);
    this.createStory = this.createStory.bind(this);
    this.getStoryById = this.getStoryById.bind(this);
    this.updateStory = this.updateStory.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.patchStory = this.patchStory.bind(this);
    this.paginateListStory = this.paginateListStory.bind(this);
  }

  public static async createInstance(): Promise<StoryController> {
    const db = await initDb(); // Assuming you have a Database class
    return new StoryController(db);
  }

  public async createStory(req: Request, res: Response): Promise<void> {
    try {
      const response = await this._storyRepo.createStory(req.body);
      if (response.changes === 0) {
        res.status(400).json({ message: 'Error creating story' });
        return;
      }
      res.status(201).json({ status: true, message: 'Story created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating story', error });
    }
  }

  async getStories(_: Request, res: Response): Promise<void> {
    try {
      const stories = await this._storyRepo.getStories();
      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stories', error });
    }
  }

  public async getStoryById(req: Request, res: Response): Promise<void> {
    try {
      const story = await this._storyRepo.getStoryById(req.params.id);
      if (story) {
        res.status(200).json({ status: true, data: story });
      } else {
        res.status(404).json({ message: 'Story not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching story', error });
    }
  }

  public async updateStory(req: Request, res: Response): Promise<void> {
    try {
      const updatedStory = await this._storyRepo.updateStory(req.params.id, req.body) as any;
      if (updatedStory.changes === 1) {
        res.status(200).json({ status: true, message: 'Story updated successfully' });
      } else {
        res.status(404).json({ message: 'Story not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating story', error });
    }
  }

  public async deleteStory(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this._storyRepo.deleteStory(req.params.id) as any;
      if (deleted.changes === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Story not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting story', error });
    }
  }

  public async patchStory(req: Request, res: Response): Promise<void> {
    try {
      const patchedStory = await this._storyRepo.patchStory(req.params.id, req.body) as any;
      if (patchedStory.changes === 1) {
        res.status(200).json({ status: true, message: 'Story patched successfully' });
      } else {
        res.status(404).json({ message: 'Story not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error patching story', error });
    }
  }

  public async paginateListStory(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, sortBy } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      const { author, title, content } = req.query;
      const stories = await this._storyRepo.paginateStories(cleanObject({ author, title, content }), { offset, limit, sortBy });
      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching paginated stories', error });
    }
  }
}