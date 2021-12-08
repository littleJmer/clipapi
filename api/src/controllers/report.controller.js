import { Op } from 'sequelize';

import db from '@models';
import { dateToUTC } from '@lib/utils';

const {
    Order,
    OrderItem,
    Menu,
    FoodType
} = db;

export default {

    bytype: async function (req, res, next) {

        const { startAt, endAt } = req.body;

        const where = {};

        if (startAt && endAt) {
            where.createdAt = { [Op.between]: [startAt, endAt] }
        }

        // we can find directly on OrderItem's
        // but lets do it starting with Order
        // since order is the higher level and
        // some future we can add status or split orders by 
        // restaurant
        const orders = await Order.findAll({
            where,
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Menu,
                            include: [
                                { model: FoodType }
                            ]
                        }
                    ]
                }
            ]
        });

        let data = {};

        for (const order of orders) {
            for (const orderItem of order.OrderItems) {

                data[orderItem.Menu.foodTypeId] = data[orderItem.Menu.foodTypeId] ?? {
                    id: orderItem.Menu.foodTypeId,
                    name: orderItem.Menu.FoodType.name,
                    quantitySold: 0,
                    earningsOnPeriod: 0,
                };

                data[orderItem.Menu.foodTypeId].quantitySold += orderItem.amount;
                data[orderItem.Menu.foodTypeId].earningsOnPeriod += parseFloat(orderItem.subTotal);

            }
        }

        let response = [];
        for (const key in data) {
            response.push(data[key]);
        }

        return res.json({
            data: {
                startAt,
                endAt,
                data: response
            }
        });

    }

}