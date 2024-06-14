/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function products(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const products = app.mongo.db.collection('products');

    app.get('/products', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await products.find().toArray();
        }
    );

    app.post('/products', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    qtd: { type: 'integer' },
                    preco: { type: 'integer' },
                    description: { type: 'string' },
                    category: { type: 'string' }
                },
                required: ['name', 'qtd', 'category', 'preco', 'description']
            }
        },
        config: {
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let product = request.body;
        
        await products.insertOne(product);

        return reply.code(201).send();
    });

    app.get('/products/:id', async (request, reply) => {
        let id =  request.params.id;
        let product = await products.findOne({_id: id});
        
        return product;
    });
    
    app.delete('/products/:id', {
        config: {
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await products.deleteOne({_id: id});
        
        return reply.code(204).send();
    });

    app.put('/products/:id', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    qtd: { type: 'integer' },
                    category: { type: 'string' },
                    preco: { type: 'integer' },
                    description: { type: 'string' }
                },
                required: ['name', 'qtd', 'category', 'preco', 'description']
            }
        },
        config: {
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let product = request.body;
        
        await products.updateOne({_id: id}, {
            $set: {
                name: product.name,
                qtd: product.qtd,
                category: product.category,
                preco: product.preco,
                description: product.description,
            }
        });
        
        return reply.code(204).send();
    });
}