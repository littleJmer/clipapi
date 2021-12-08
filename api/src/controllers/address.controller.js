import RestController from '@lib/RestController';

class AddressController extends RestController {
    constructor(model) {
        super(model);
    }
}

export default new AddressController('Address');