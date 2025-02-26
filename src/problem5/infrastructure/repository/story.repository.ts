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
  async paginateStories(filters, options) {
    //sortBy: created_at:asc, created_at:desc, publish_at:asc, publish_at:desc, title:asc, title:desc

    const { page = 1, limit = 10, sortBy } = options;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM stories';
    let countQuery = 'SELECT COUNT(*) as count FROM stories';
    const queryParams = [];
    const countParams = [];

    if (filters) {
      const filterKeys = Object.keys(filters);
      if (filterKeys.length > 0) {
        const filterConditions = filterKeys.map((key, index) => `${key} LIKE ?`).join(' AND ');
        query += ` WHERE ${filterConditions}`;
        countQuery += ` WHERE ${filterConditions}`;
        filterKeys.forEach((key) => {
          queryParams.push(`%${filters[key]}%`);
          countParams.push(`%${filters[key]}%`);
        });
      }
    }

    if (sortBy) {
      const [sortField, sortOrder] = sortBy.split(':');
      query += ` ORDER BY ${sortField} ${sortOrder.toUpperCase()}`;
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);


    const stories = await this.db.all(query, ...queryParams);
    const count = await this.db.get(countQuery, ...countParams);

    return {
      data: stories,
      total: count.count,
      page,
      limit,
      totalPages: Math.ceil(count.count / limit)
    };
  }
}