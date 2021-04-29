'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async findProducts(ctx) {
         const { id } = ctx.params;
         const products = await strapi.services.seccion.findAllProducts(id);
         return products;
    },
};
