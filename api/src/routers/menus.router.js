import MenusController from '../controllers/menus.controller';
import RestRouter from '@lib/RestRouter';

class MenusRouter extends RestRouter {
    constructor(options, controller) {
        super(options, controller);
    }
}

const menusRouter = new MenusRouter(
    {
        disable: ['delete'],
    },
    MenusController
);

export default menusRouter.router();