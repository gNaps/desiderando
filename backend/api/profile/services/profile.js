"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async updatePassword(newPassword, user) {
    const password = await strapi.plugins[
      "users-permissions"
    ].services.user.hashPassword({ password: newPassword });
    if (password === user.password) {
      ctx.throw(400);
    }

    return await strapi
      .query("user", "users-permissions")
      .update({ id: user.id }, { password: password });
  },
};
