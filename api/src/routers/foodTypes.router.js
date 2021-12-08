import FoodTypesController from '../controllers/foodTypes.controller';
import RestRouter from '@lib/RestRouter';

class FoodTypesRouter extends RestRouter {
    constructor(options, controller) {
        super(options, controller);
    }
}

const foodTypesRouter = new FoodTypesRouter(
    {
        disable: ['delete'],
    },
    FoodTypesController
);

export default foodTypesRouter.router();