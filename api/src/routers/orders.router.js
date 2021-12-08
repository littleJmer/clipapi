import OrdersController from '../controllers/order.controller';
import RestRouter from '@lib/RestRouter';
import checkTime from '@lib/checkTime';

class ClientsRouter extends RestRouter {
    constructor(options, controller) {
        super(options, controller);
    }
}

const ordersRouter = new ClientsRouter(
    {
        disable: ['update', 'delete'],
        middleware: {
            create: checkTime
        }
    },
    OrdersController
);

export default ordersRouter.router();