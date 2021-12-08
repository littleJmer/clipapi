import db from '@models';
import paginator from '@lib/paginator';

const getAssociations = (model, skip = {}) => {
    let include = [];
    const associations = Object.keys(model.associations ?? {}) || [];
    associations.map((key) => {
        const { plural, singular } = model.associations[key]?.options?.name;
        if (!skip[singular]) {
            skip[singular] = true;
            include.push({
                model: db[singular],
                include: getAssociations(db[singular], skip),
            })
        }
    });
    return include;
}

class RestController {

    constructor(model) {
        this.modelName = model;
        this.model = db[model];
    }

    async getList(req, res, next) {
        try {
            const { filters = {}, pagination = {} } = req.body;
            const options = { include: [] };

            // check associations
            options.include = getAssociations(this.model, { [this.modelName]: true });

            const result = await paginator(this.model, options, pagination);
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req?.params?.id;
            const options = { where: { id }, include: [] }

            // check associations
            options.include = getAssociations(this.model, { [this.modelName]: true });

            const row = await this.model.findOne(options);
            return res.json(row);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            let row = await this.model.create(req.body);
            return res.json({
                message: 'Entry created successfully',
                data: { id: row.id }
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const id = req?.params?.id;
            await this.model.update(req.body, { where: { id } });
            return res.json({
                message: 'Entry updated successfully',
                data: { id }
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req?.params?.id;
            await this.model.update(
                { deleted: 1 },
                { where: { id } }
            );
            return res.json({
                message: 'Entry deleted successfully',
                data: { id }
            });
        } catch (error) {
            next(error);
        }
    }

}

export default RestController