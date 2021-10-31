const slugify = require("slugify");
const { sanitizeEntity } = require("strapi-utils");

const populate = [
  "members",
  "members.user",
  "gifts",
  "gifts.buyers",
  "gifts.buyers.user",
];

module.exports = {
  /**
   * Get all giftlist for a use
   * @return {Array}
   */

  async find(ctx) {
    let giftlists;
    const userId = ctx.state.user.id;
    const queryParams = { ...ctx.query, "members.user": userId };

    if (ctx.query._q) {
      giftlists = await strapi.services.giftlist.search(queryParams, populate);
    } else {
      giftlists = await strapi.services.giftlist.find(queryParams, populate);
    }

    giftlists.map((entity) => {
      entity.gifts_percentage =
        entity.gifts && entity.gifts.length > 0
          ? (entity.gifts.filter((g) => g.status === "BOUGHT").length /
              entity.gifts.length) *
            100
          : 0;
      strapi.services.giftlist.mapEntity(entity);
      sanitizeEntity(entity, { model: strapi.models.giftlist });
    });

    return giftlists;
  },

  /**
   * Get a giftlist by id
   * @return {Array}
   */

  async findOne(ctx) {
    const userId = ctx.state.user.id;
    const { id } = ctx.params;

    const giftlist = await strapi.services.giftlist.findOne({ id }, populate);
    if (!giftlist) {
      ctx.throw(404, "Not Found");
    }

    const canRead = strapi.services.giftlist.canRead(giftlist, userId);
    if (!canRead) {
      ctx.throw(403, "Unauthorized");
    }

    giftlist.gifts_percentage =
      giftlist.gifts && giftlist.gifts.length > 0
        ? (giftlist.gifts.filter((g) => g.status === "BOUGHT").length /
            giftlist.gifts.length) *
          100
        : 0;
    strapi.services.giftlist.mapEntity(giftlist);
    console.log(giftlist.gifts);
    giftlist.gifts.map((g) => strapi.services.gift.mapEntity(g));
    return sanitizeEntity(giftlist, { model: strapi.models.giftlist });
  },

  /**
   * Create a giftlist
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    const lista = ctx.request.body;
    const userId = ctx.state.user.id;

    if (!lista.name || lista.name === "") {
      ctx.throw(400, "Name is missing");
    }

    lista.slug = slugify(lista.name);
    entity = await strapi.services.giftlist.create(lista);

    const giftlistUsersRole = {
      user: userId,
      role: "OWNER",
      giftlist: entity.id,
    };
    await strapi.services["giftlist-users-role"].create(giftlistUsersRole);

    const newGiftlist = await strapi.services.giftlist.findOne(
      { id: entity.id },
      populate
    );
    return sanitizeEntity(newGiftlist, { model: strapi.models.giftlist });
  },

  /**
   * Update a record.
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;
    const giftlist = await strapi.services.giftlist.findOne({ id }, populate);
    if (!giftlist) {
      ctx.throw(404, "Not Found");
    }

    const canUpdate = strapi.services.giftlist.canUpdateOrDelete(
      giftlist,
      userId
    );
    if (!canUpdate) {
      ctx.throw(403, "Unauthorized");
    }

    const entity = await strapi.services.giftlist.update(
      { id },
      ctx.request.body
    );

    return sanitizeEntity(entity, { model: strapi.models.giftlist });
  },
  /**
   * Delete a giftlist.
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;

    const giftlist = await strapi.services.giftlist.findOne({ id }, populate);
    if (!giftlist) {
      ctx.throw(404, "Not Found");
    }

    const canDelete = strapi.services.giftlist.canUpdateOrDelete(
      giftlist,
      userId
    );
    if (!canDelete) {
      ctx.throw(403, "Unauthorized");
    }

    giftlist.members.map(async (m) => {
      console.log(m);
      await strapi.services["giftlist-users-role"].delete({ id: m.id });
    });

    const entity = await strapi.services.giftlist.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.giftlist });
  },
  /**
   * Invite a user as owner or guest
   */
  async invite(ctx) {
    const userId = ctx.state.user.id;
    const listId = ctx.params.id;
    const { username, role } = ctx.request.body;
    const giftlist = await strapi.services.giftlist.findOne(
      { id: listId },
      populate
    );
    if (!giftlist) {
      ctx.throw(404, "Not found");
    }

    const canInvite = strapi.services.giftlist.canInvite(giftlist, userId);
    if (!canInvite) {
      ctx.throw(403, "Unauthorized");
    }

    const userToInvite = await strapi
      .query("user", "users-permissions")
      .find({ username: username }, []);

    if (!userToInvite || userToInvite.length === 0) {
      ctx.throw(404, "User not found");
    }

    const idUserToInvite = userToInvite[0].id;
    const isAlreadyMember = giftlist.members.some((el) => {
      return el.user.id == idUserToInvite;
    });

    if (isAlreadyMember) {
      ctx.throw(400, "This user is already invited");
    }

    const giftlistUsersRole = {
      user: idUserToInvite,
      role: role,
      giftlist: giftlist,
    };
    await strapi.services["giftlist-users-role"].create(giftlistUsersRole);

    console.log("invio mail a ", userToInvite[0].email);
    strapi.services.email.send(
      "",
      userToInvite[0].email,
      "Sei stato invitato",
      "Sei stato invitato",
      "Ciao sei stato invitato ad una lista desideri",
      ""
    );

    const newGiftlist = await strapi.services.giftlist.findOne(
      { id: giftlist.id },
      populate
    );
    return sanitizeEntity(newGiftlist, { model: strapi.models.giftlist });
  },
  /**
   * Invite a user as owner or guest
   */
  async removeInvite(ctx) {
    const userId = ctx.state.user.id;
    const listId = ctx.params.id;
    const { user } = ctx.request.body;

    const giftlist = await strapi.services.giftlist.findOne(
      { id: listId },
      populate
    );
    if (!giftlist) {
      ctx.throw(404);
    }

    const canInvite = strapi.services.giftlist.canInvite(giftlist, userId);
    if (!canInvite) {
      ctx.throw(403, "Unauthorized");
    }

    const memberEntity = giftlist.members.find((el) => {
      return el.user.id == user;
    });

    if (!memberEntity) {
      ctx.throw(400, "This user is not invited");
    }

    await strapi.services["giftlist-users-role"].delete({
      id: memberEntity.id,
    });

    const newGiftlist = await strapi.services.giftlist.findOne(
      giftlist.id,
      populate
    );
    return sanitizeEntity(newGiftlist, { model: strapi.models.giftlist });
  },
};
