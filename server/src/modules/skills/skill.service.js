import Skill from './skill.model.js'

export class SkillService {
  static async getGroupedSkills() {
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 })
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    }, {})
  }
}
