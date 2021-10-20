"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Promise to fetch all giftlist
   * @return {Promise}
   */
  find(params, populate) {
    return strapi.query("giftlist").find(params, populate);
  },
  /**
   * Check if user has permission to modify a giftlist
   */
  canUpdateOrDelete(giftlist, userId) {
    const isOwner = giftlist.members.some(
      (el) => el.user.id === userId && el.role === "OWNER"
    );
    if (!isOwner) {
      return false;
    } else {
      return true;
    }
  },
  /**
   * Check if user has permission to get a giftlist
   */
  canRead(giftlist, userId) {
    const canRead = giftlist.members.some((el) => el.user.id === userId);
    return canRead;
  },
  /**
   * Check if user has permission to get a giftlist
   * user can invite if
   * 1) is Owner
   * 2) is Guest and the giftlist is public
   */
  canInvite(giftlist, userId) {
    const isOwner = giftlist.members.some(
      (el) => el.user.id === userId && el.role === "OWNER"
    );
    const isGuest = giftlist.members.some(
      (el) => el.user.id === userId && el.role === "GUEST"
    );
    if (isOwner || (isGuest && giftlist.public)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * Map the entity for remove not necessary information
   */
  mapEntity(entity) {
    const mapUser = (entity) => {
      const { id, email, username, icon_profile } = entity.user;
      const { role } = entity;
      return {
        id,
        email,
        username,
        icon_profile,
        role,
      };
    };

    entity.members = entity.members.map((m) => mapUser(m));
  },
};
