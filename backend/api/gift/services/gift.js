"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Create a gift.
   * @return {Object}
   */

  async create(gift) {
    const entry = await strapi.query("gift").create(gift);
    return entry;
  },
  /**
   * Check if user has permission to create a gift for this giftlist.
   * @return {Object}
   */

  canCreate(giftlist, userId) {
    const isOwner = giftlist.members.some((el) => el.user.id === userId && el.role === "OWNER");
    return isOwner;
  },
  /**
   * Calculate the total price paid
   */
  getTotalPrice(price, buyers) {
    let total = 0;
    buyers.forEach(b => {
      total = total + b.price;
    });
    return total + price;
  },
  /**
   * Map the entity for remove not necessary information
   */
   mapEntity(entity) {
    const mapUser = (entity) => {
      const { id, email, username, icon_profile } = entity.user;
      const { price } = entity;
      return {
        id,
        email,
        username,
        icon_profile,
        price,
      };
    };

    const mapCreator = (entity) => {
      const { id, email, username, icon_profile } = entity;
      return {
        id,
        email,
        username,
        icon_profile,
      };
    };

    entity.buyers = entity.buyers.map((m) => mapUser(m));

    if(entity.created_by) {
      entity.created_by = mapCreator(entity.created_by);
    }
  },
};
