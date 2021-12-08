import RestController from '@lib/RestController';

class MenuController extends RestController {
    constructor(model) {
        super(model);
    }
}

export default new MenuController('Menu');