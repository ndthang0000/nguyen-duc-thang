import { Database } from 'sqlite' // Assuming you are using sqlite
import { Story } from '../../domain/entities/story.entity'

export class StoryModel {
  static async create(db: Database, story: Story) {
    return await db.run(
      `INSERT INTO stories (title, author, content, publish_at, url, thumbnail_url, short_description)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
      story.title,
      story.author,
      story.content,
      story.publish_at,
      story.url,
      story.thumbnail_url,
      story.short_description
    )
  }

  static async getAll(db: Database) {
    return await db.all('SELECT * FROM stories')
  }

  static async getById(db: Database, id: number) {
    return await db.get('SELECT * FROM stories WHERE id = ?', id)
  }

  static async update(db: Database, id: number, updatedStory: Story) {
    return await db.run(
      `UPDATE stories SET
              title = ?,
              author = ?,
              content = ?,
              updated_at = CURRENT_TIMESTAMP,
              publish_at = ?,
              url = ?,
              thumbnail_url = ?,
              short_description = ?
          WHERE id = ?`,
      updatedStory.title,
      updatedStory.author,
      updatedStory.content,
      updatedStory.publish_at,
      updatedStory.url,
      updatedStory.thumbnail_url,
      updatedStory.short_description,
      id
    )
  }

  static async delete(db: Database, id: number) {
    return await db.run('DELETE FROM stories WHERE id = ?', id)
  }
  static async patch(db: Database, id: number, partialStory: Partial<Story>) {
    const fields = Object.keys(partialStory)
      .map((key) => `${key} = ?`)
      .join(', ')
    const values = Object.values(partialStory)
    return await db.run(`UPDATE stories SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, ...values, id)
  }
}
