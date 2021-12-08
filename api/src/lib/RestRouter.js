import express from 'express';

class RestController {

    constructor(options = {}, controller) {
        this.options = options;
        this.controller = controller;
    }

    router() {

        var router = express.Router();

        router.get('/', (req, res, next) => this.controller.getList(req, res, next));

        router.get('/:id', (req, res, next) => this.controller.getOne(req, res, next));

        router.post(
            '/',
            (req, res, next) => {
                if (this.options?.middleware?.create)
                    this.options.middleware.create(req, res, next);
                else
                    next();
            },
            (req, res, next) => this.controller.create(req, res, next)
        );

        if (this.options?.disable?.includes['update'])
            router.put('/:id', (req, res, next) => this.controller.update(req, res, next));

        if (this.options?.disable?.includes['delete'])
            router.delete('/:id', (req, res, next) => this.controller.delete(req, res, next));

        return router;

    }

}

export default RestController;