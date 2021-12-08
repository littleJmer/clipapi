import RestController from '@lib/RestController';

class ClientController extends RestController {
    constructor(model) {
        super(model);
    }
}

export default new ClientController('Client');