'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    async findAllProducts(sectionId) {
        const knex = strapi.connections.default;
        const productsResponse = [];
        const products = await knex('product')
            .distinct('product.*')
            .join('categorias_productos__productos_categorias', 'categorias_productos__productos_categorias.producto_id', 'product.id')
            .join('category', 'categorias_productos__productos_categorias.categoria_id', 'category.id')
            .join('section', 'section.id', 'category.seccion')

            .whereRaw('section.id = ?', sectionId);
        for (const product of products) {
            const images = await knex('upload_file_morph')
                .select('upload_file.url')
                .join('upload_file', 'upload_file.id', 'upload_file_morph.upload_file_id')
                .join('image-product', 'image-product.id', 'upload_file_morph.related_id')
                .join('product', 'product.id', 'image-product.producto')
                .whereRaw('related_type = ?', 'image-product')
                .whereRaw('product.id = ?',  product.id);

            const items = await knex('item')
                .select('item.nombre')
                .join('items_productos__productos_items', 'items_productos__productos_items.item_id', 'item.id')
                .join('product', 'product.id', 'items_productos__productos_items.producto_id')
                .whereRaw('product.id = ?',  product.id);

            productsResponse.push({ ...product, images, items })
        }
        return productsResponse;
      },
};
