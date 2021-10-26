"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async getActivities(userId, limit) {
    const idsGiftlist_res = await strapi
      .query("giftlist-users-role")
      .model.query((qb) => {
        qb.select("giftlist_users_roles.giftlist");
        qb.where({ user: userId });
      })
      .fetchAll();

    const idsGiftlist = idsGiftlist_res.toJSON().map((g) => g.giftlist.id);

    const result = await strapi
      .query("activity")
      .model.query((qb) => {
        qb.select(
          "activities.id",
          "activities.action",
          "activities.created_at",
          { userId: "users-permissions_user.id" },
          "users-permissions_user.username",
          "users-permissions_user.email",
          "users-permissions_user.icon_profile",
          { giftId: "gifts.id" },
          { giftName: "gifts.name" },
          { giftCategory: "gifts.category" },
          { giftlistId: "giftlists.id" },
          { giftlistName: "giftlists.name" },
          { giftlistCreatedAt: "giftlists.created_at" }
        );
        qb.join("gifts", "gifts.id", "=", "activities.gift");
        qb.join("giftlists", "giftlists.id", "=", "gifts.giftlist");
        qb.join(
          "giftlist_users_roles",
          "giftlist_users_roles.giftlist",
          "=",
          "giftlists.id"
        );
        qb.join(
          "users-permissions_user",
          "users-permissions_user.id",
          "=",
          "activities.user"
        );
        qb.where("giftlists.id", "in", idsGiftlist);
        qb.where("activities.user", "<>", userId);
        qb.where("giftlists.who", "<>", 0);
        qb.where("giftlists.who", "<>", 0);
        qb.where(
          "activities.created_at",
          ">",
          new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
        );
        if (limit) {
          qb.limit(5);
        }
        qb.orderBy("activities.id", "DESC");
      })
      .fetchAll();

    return result.toJSON();
  },
};
