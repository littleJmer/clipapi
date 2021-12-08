import AddressesController from '../controllers/address.controller';
import RestRouter from '@lib/RestRouter';

class ClientsRouter extends RestRouter {
    constructor(options, controller) {
        super(options, controller);
    }
}

const addressesRouter = new ClientsRouter(
    {
        disable: ['delete'],
    },
    AddressesController
);

export default addressesRouter.router();