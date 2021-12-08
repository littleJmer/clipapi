import RestController from '@lib/RestController';

class FoodTypeController extends RestController {
    constructor(model) {
        super(model);
    }
}

export default new FoodTypeController('FoodType');