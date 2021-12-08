import ClientsController from '../controllers/clients.controller';
import RestRouter from '@lib/RestRouter';

class ClientsRouter extends RestRouter {
    constructor(options, controller) {
        super(options, controller);
    }
}

const clientsRouter = new ClientsRouter(
    {
        disable: ['delete'],
    },
    ClientsController
);

export default clientsRouter.router();