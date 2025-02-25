import { Request, Response } from 'express';
import { StoryRepository } from '../infrastructure/repository/story.repository';
import { initDb } from '../infrastructure/database/connect';
import { Database } from 'sqlite';

export class StoryController {
  private _storyRepo!: StoryRepository;

  private constructor(db: Database) {
    this._storyRepo = new StoryRepository(db);
    this.getStories = this.getStories.bind(this);
    this.createStory = this.createStory.bind(this);
    this.getStoryById = this.getStoryById.bind(this);
    this.updateStory = this.updateStory.bind(this);
    this.deleteStory = this.deleteStory.bind(this);

  }

  public static async createInstance(): Promise<StoryController> {
    const db = await initDb(); // Assuming you have a Database class
    return new StoryController(db);
  }

  public async createStory(req: Request, res: Response): Promise<void> {
    try {
      const story = await this._storyRepo.createStory(req.body);
      res.status(201).json(story);
    } catch (error) {
      res.status(500).json({ message: 'Error creating story', error });
    }
  }

  async getStories(_: Request, res: Response): Promise<void> {
    try {
      // this is undefined, how to fix this?
      console.log({ stories3332324324234234: this })
      const stories = await this._storyRepo.getStories();
      res.status(200).json(stories);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error fetching stories', error });
    }
  }

  public async getStoryById(req: Request, res: Response): Promise<void> {
    try {
      const story = await this._storyRepo.getStoryById(req.params.id);
      if (story) {
        res.status(200).json(story);
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
      if (updatedStory) {
        res.status(200).json(updatedStory);
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
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Story not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting story', error });
    }
  }
}