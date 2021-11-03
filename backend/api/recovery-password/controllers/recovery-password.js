"use strict";
const { v4: uuidv4 } = require("uuid");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Send email for recovery password
   * @param {*} ctx
   */
  async recoveryPassword(ctx) {
    const { email, device, browser } = ctx.request.body;
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ email: email }, []);

    if (!user) {
      ctx.send({}, 204);
    }

    // Generate token of the request
    const token = await strapi.services["recovery-password"].create({
      user: user,
      token: uuidv4(),
    });
    // console.log("token generato è ", token);
    const page = `${process.env.FRONTEND_URL}/auth/recoveryPassword?token=${token.token}`;

    // Send an email to validate his subscriptions.
    //const template = await strapi.query('setting').find({ setting_key: 'mail_template_recovery_password' }, []);
    // let messageEmail = template[0].setting_value;
    // messageEmail = messageEmail.replace("{{0}}", userToSend[0].username);
    // messageEmail = messageEmail.replace("{{1}}", userLoggedIn.device);
    // messageEmail = messageEmail.replace("{{2}}", userLoggedIn.browser);
    // messageEmail = messageEmail.replace("{{3}}", page);

    strapi.services.email.send(
      "",
      email,
      "Recupero Password",
      "Recupero Password",
      `Hai richiesto cambio password, clicca qui ${page}`,
      ""
    );

    ctx.send({}, 204);
  },
  /**
   * Chech if token is valid
   * @return {Object}
   */

  async checkToken(ctx) {
    const { token } = ctx.params;

    const tokenUser = await strapi
      .query("recovery-password")
      .findOne({ token: token }, []);
    if (!tokenUser || tokenUser.length == 0) {
      ctx.throw(400, "Not valid token");
    }

    const tokenDate = tokenUser.created_at;
    const istantTime = new Date();
    const diffTime = Math.abs(istantTime - tokenDate);

    if (diffTime >= 7200000) {
      await strapi.services["recovery-password"].delete({ id: tokenUser.id });
      ctx.throw(400, "Not valid token");
    }

    ctx.send({}, 204);
  },
  /**
   * Update the password
   * @return {Object}
   */

  async updatePasswordByToken(ctx) {
    const request = ctx.request.body;

    const tokenUser = await strapi
      .query("recovery-password")
      .findOne({ token: request.token }, []);
    if (!tokenUser || tokenUser.length == 0) {
      ctx.throw(400, "Not valid token");
    }

    const tokenDate = tokenUser.created_at;
    const istantTime = new Date();
    const diffTime = Math.abs(istantTime - tokenDate);

    if (diffTime >= 7200000) {
      await strapi.services["recovery-password"].delete({ id: tokenUser.id });
      ctx.throw(400, "Not valid token");
    }

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: tokenUser.user }, []);
    const entity = await strapi.services.profile.updatePassword(
      request.password,
      user
    );

    await strapi.services["recovery-password"].delete({ id: tokenUser.id });

    ctx.send({}, 204);
  },
};
