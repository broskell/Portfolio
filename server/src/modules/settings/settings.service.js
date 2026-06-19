import Settings from './settings.model.js'

export class SettingsService {
  /**
   * Fetches the singleton settings document.
   */
  static async getSettings() {
    return Settings.findOne({ singletonKey: 'main', isDeleted: false })
  }

  /**
   * Updates or inserts the singleton settings document.
   */
  static async updateSettings(data) {
    return Settings.findOneAndUpdate(
      { singletonKey: 'main' },
      { $set: data },
      { new: true, upsert: true, runValidators: true }
    )
  }
}
