import { Op } from 'sequelize';
import RestController from '@lib/RestController';
import db from '@models';

const {
    Address,
    Order,
    Menu,
    OrderItem,
    sequelize
} = db;

class OrderController extends RestController {
    constructor(model) {
        super(model);
    }

    /**
     * Override Methods
     */
    async create(req, res, next) {
        try {
            const { addressId = 0, items = [] } = req.body;

            const address = await Address.findOne({ where: { id: addressId } });

            if (!address) {
                return res.status(500).json({
                    error: 'invalidAddress',
                    message: 'Address does not exist'
                });
            }

            const {
                addressLine,
                city,
                state,
                zipCode
            } = address;

            let total = 0;
            let reachedMinimumAmount = false;

            // get menu items from db
            const menuItemIds = items.reduce((acc, current) => [...acc, current.menuId], []);
            const menuItems = await Menu.findAll({
                where: {
                    id: { [Op.in]: menuItemIds }
                }
            });

            // build items to store
            const itemsToSave = [];
            for (const menu of menuItems) {

                if (!menu.available) {
                    return res.status(500).json({
                        error: 'menuNotAvailable',
                        message: `menuId: ${menu.id}`
                    });
                }

                const item = {};
                item.menuId = menu.id;
                item.price = menu.price;
                item.amount = 0;
                item.subTotal = 0;

                // compute item amount
                for (const reqItem of items) {
                    if (reqItem.menuId === item.menuId)
                        item.amount += reqItem.amount;
                }

                if (item.amount > menu.quantity) {
                    return res.status(500).json({
                        error: 'menuQuantityExceeded',
                        message: `menuId: ${menu.id}`
                    });
                }

                // negative amount are not allowed
                if (item.amount < 1)
                    continue;

                if (item.amount >= 2)
                    reachedMinimumAmount = true;

                item.subTotal = item.amount * item.price;
                total += item.subTotal;
                itemsToSave.push(item);
            }

            if (itemsToSave.length < 2 && !reachedMinimumAmount) {
                return res.status(500).json({
                    error: 'notEnoughtItems',
                    message: 'Please add at least two items from the Menu'
                });
            }

            // create order with menuItems
            const order = await Order.create(
                {
                    clientId: address.clientId,
                    addressLine,
                    city,
                    state,
                    zipCode,
                    total,
                    OrderItems: itemsToSave
                },
                {
                    include: [OrderItem]
                }
            );

            // decrement quantity on menu
            for (const item of itemsToSave) {
                await Menu.update(
                    { quantity: sequelize.literal(`quantity - ${item.amount}`) },
                    { where: { id: item.menuId } }
                );
            }

            return res.json({
                message: 'Entry created successfully',
                data: {
                    id: order.id
                }
            });

        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController('Order');