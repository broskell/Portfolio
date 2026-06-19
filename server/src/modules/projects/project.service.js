import Project from './project.model.js'

export class ProjectService {
  static async getAllProjects() {
    return Project.find().sort({ displayOrder: 1 })
  }
}
