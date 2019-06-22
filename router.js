const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const fs = require('fs');

const { db } = require('./db');
const { Order } = require('./db')

// админка
router.get('/admin', ctx => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('./admin/index.html')
});
router.get('/admin/:file', ctx => {
    ctx.body = fs.createReadStream('./admin/' + ctx.params.file);
    console.log('test');
    
});
router.post('/admin', koaBody(), ctx => {
    ctx.body = ctx.request.body.password == 'y7NxWQvy1h'
})

// заказ
router.post('/api/order', koaBody(), async ctx => {
    console.clear();
    console.log('order');
    
    const order = ctx.request.body;

    if (order.name.trim() != '' && order.contact.trim() != '' && order.descript.trim() != '') {

        Order.create({
            name: order.name,
            contact: order.contact,
            city: order.city,
            descript: order.descript,
            read: false,
            ip: ctx.request.ip
        })

        ctx.body = true
    } else {
        ctx.body = false
    }
});

// удаление заказа
router.post('/api/orders/get', async ctx => {
    const get = async () => Order.findAll({raw: true})

    ctx.body = await get()

});

// метка
router.get('/api/delete/:id', async ctx => {

    const get = async () => {
        Order.destroy({where: {id: ctx.params.id}})
        return Order.findAll({raw: true})
    }

    ctx.body = await get()
})

router.get('/api/read/:id', async ctx => {
    const get = async () => {
        return Order
            .findOne({where: {
                id: ctx.params.id
            }})
            .then(order => order.update({read: true}))
    }

    ctx.body = await get();
})

module.exports = router;