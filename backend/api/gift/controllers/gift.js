const slugify = require("slugify");
const { sanitizeEntity } = require("strapi-utils");

const populateGiftlist = ["members", "members.user", "gifts"];
const populateGift = ["buyers", "buyers.user"];

module.exports = {
  /**
   * Get a gift by id
   * @return {Array}
   */

  async findOne(ctx) {
    const userId = ctx.state.user.id;
    const { id } = ctx.params;

    const giftlist = await strapi.services.giftlist.findOne(
      {
        gifts_contains: id,
      },
      populateGiftlist
    );

    const canRead = strapi.services.giftlist.canRead(giftlist, userId);
    if (!canRead) {
      ctx.throw(403, "Unauthorized");
    }

    const gift = await strapi.services.gift.findOne({ id }, populateGift);
    strapi.services.gift.mapEntity(gift);
    return sanitizeEntity(gift, { model: strapi.models.gift });
  },
  /**
   * Create a gift.
   * @return {Object}
   */

  async create(ctx) {
    const gift = ctx.request.body;
    const userId = ctx.state.user.id;
    const giftlist = await strapi.services.giftlist.findOne(
      {
        id: gift.giftlist,
      },
      populateGiftlist
    );
    if (!giftlist) {
      ctx.throw(404);
    }

    const canCreate = strapi.services.gift.canCreate(giftlist, userId);
    if (!canCreate) {
      ctx.throw(403);
    }

    gift.slug = slugify(gift.name);
    gift.status = "TOBUY";
    gift.remaining_price = gift.price;

    let entity;
    entity = await strapi.services.gift.create(gift);

    const activity = {
      gift: entity.id,
      action: "ADD",
      user: userId
    };

    console.log(activity)
    await strapi.services.activity.create(activity);

    return sanitizeEntity(entity, { model: strapi.models.gift });
  },
  /**
   * Update a gift.
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;
    const gift = ctx.request.body;
    const userId = ctx.state.user.id;
    const giftlist = await strapi.services.giftlist.findOne(
      {
        id: gift.giftlist,
      },
      populateGiftlist
    );
    if (!giftlist) {
      ctx.throw(404);
    }

    const canCreate = strapi.services.gift.canCreate(giftlist, userId);
    if (!canCreate) {
      ctx.throw(403);
    }

    const entity = await strapi.services.gift.update({ id }, gift);
    return sanitizeEntity(entity, { model: strapi.models.giftlist });
  },
  /**
   * Delete a gift.
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;

    const giftlist = await strapi.services.giftlist.findOne(
      {
        gifts_contains: id,
      },
      populateGiftlist
    );
    if (!giftlist) {
      ctx.throw(404);
    }

    const canCreate = strapi.services.gift.canCreate(giftlist, userId);
    if (!canCreate) {
      ctx.throw(403);
    }

    const gift = await strapi.services.gift.findOne({ id }, populateGift);
    if (!gift) {
      ctx.throw(404);
    }

    gift.buyers.map(async (b) => {
      await strapi.services["gift-users-buyer"].delete({ id: b.id });
    });

    //const entity = {};
    const entity = await strapi.services.gift.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.giftlist });
  },
  /**
   * Buy a desiderio.
   * @return {Object}
   */
  async buy(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;
    const { price } = ctx.request.body;

    const giftlist = await strapi.services.giftlist.findOne(
      {
        gifts_contains: id,
      },
      populateGiftlist
    );
    if (!giftlist) {
      ctx.throw(404);
    }

    const gift = await strapi.services.gift.findOne({ id }, populateGift);
    if (!gift) {
      ctx.throw(404);
    } else if (gift.status === "BOUGHT") {
      ctx.throw(400);
    }

    const canRead = strapi.services.giftlist.canRead(giftlist, userId);
    if (!canRead) {
      ctx.throw(403);
    }

    gift.status =
      strapi.services.gift.getTotalPrice(price, gift.buyers) === gift.price
        ? "BOUGHT"
        : "GROUP";

    const updated = await strapi.services.gift.update({ id }, gift);

    const giftUserPrice = {
      user: userId,
      price: price,
      gift: id,
    };

    await strapi.services["gift-users-buyer"].create(giftUserPrice);

    const activity = {
      gift: id,
      action: "BUY",
      user: userId
    };
    await strapi.services.activity.create(activity);

    const entity = await strapi.services.gift.findOne({ id }, populateGift);
    strapi.services.gift.mapEntity(entity);
    return sanitizeEntity(entity, { model: strapi.models.gift });
  },
  /**
   * Unbuy a desiderio.
   * @return {Object}
   */
  async unBuy(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;

    const giftlist = await strapi.services.giftlist.findOne(
      {
        gifts_contains: id,
      },
      populateGiftlist
    );
    if (!giftlist) {
      ctx.throw(404);
    }

    const gift = await strapi.services.gift.findOne({ id }, populateGift);
    if (!gift) {
      ctx.throw(404);
    }

    const canRead = strapi.services.giftlist.canRead(giftlist, userId);
    if (!canRead) {
      ctx.throw(403);
    }

    const giftUserBuyer = gift.buyers.find((b) => b.user.id === userId);
    if (!giftUserBuyer) {
      ctx.throw(400);
    }

    if (gift.price === giftUserBuyer.price) {
      gift.status = "TOBUY";
    } else {
      gift.status = "GROUP";
    }

    await strapi.services["gift-users-buyer"].delete({ id: giftUserBuyer.id });
    const updated = await strapi.services.gift.update({ id }, gift);
    const entity = await strapi.services.gift.findOne({ id }, populateGift);
    strapi.services.gift.mapEntity(entity);
    return sanitizeEntity(entity, { model: strapi.models.gift });
  },
};
