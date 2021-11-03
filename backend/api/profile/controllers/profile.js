"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Update a user profile
   * @return {Object}
   */

  async update(ctx) {
    const profile = ctx.request.body;
    const userId = ctx.state.user.id;

    console.log(profile);

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userId });
    user.icon_profile = profile.icon_profile;

    await strapi
      .query("user", "users-permissions")
      .update({ id: userId }, user, []);

    ctx.send({}, 204);
  },
  /**
   * Update password for current user
   * @return {Object}
   */

  async updatePassword(ctx) {
    const { password } = ctx.request.body;
    const userId = ctx.state.user.id;

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userId });

    await strapi.services.profile.updatePassword(password, user);

    ctx.send({}, 204);
  },
};
