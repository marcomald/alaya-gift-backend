'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findProductsByCategory(ctx) {
        const categoryId = ctx.params.id;
        const products = await strapi.services.categoria.findProductsByCategory(categoryId);
        return products;
   }
};
