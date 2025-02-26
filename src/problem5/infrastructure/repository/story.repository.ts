import { Story } from "../../domain/entities/story.entity";
import { StoryModel } from "../database/story.model";
import { Database } from 'sqlite';

export class StoryRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  async createStory(story: Story) {
    return await StoryModel.create(this.db, story);
  }

  async getStories() {
    return await StoryModel.getAll(this.db);
  }

  async getStoryById(id) {
    return await StoryModel.getById(this.db, id);
  }

  async updateStory(id, updatedStory) {
    return await StoryModel.update(this.db, id, updatedStory);
  }

  async deleteStory(id) {
    return await StoryModel.delete(this.db, id);
  }

  async paginateListStory(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const stories = await this.db.all('SELECT * FROM stories LIMIT ? OFFSET ?', limit, offset);
    const count = await this.db.get('SELECT COUNT(*) as count FROM stories');
    return {
      data: stories,
      total: count.count,
      page,
      limit,
      totalPages: Math.ceil(count.count / limit)
    };
  }

  async patchStory(id, partialUpdate) {
    return await StoryModel.patch(this.db, id, partialUpdate);
  }
}