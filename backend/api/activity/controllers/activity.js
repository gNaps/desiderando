const slugify = require("slugify");
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Get last 3 activities
   * @return {Array}
   */

  async findLast(ctx) {
    const userId = ctx.state.user.id;
    const activities = await strapi.services.activity.getActivities(userId, 5);

    sanitizeEntity(activities, { model: strapi.models.activity });
    return activities;
  },
  /**
   * Get all activities for the user
   * @return {Array}
   */

  async find(ctx) {
    const userId = ctx.state.user.id;
    const activities = await strapi.services.activity.getActivities(userId);

    sanitizeEntity(activities, { model: strapi.models.activity });
    return activities;
  },
};
