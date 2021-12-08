import CONFIG from '@config';

const { PAGINATION_DEFAULT_PAGESIZE } = CONFIG;

export default async (Model, options = {}, pagination = {}) => {

    const paginationOptions = {};

    paginationOptions.current = pagination?.current || 1;
    paginationOptions.pageSize = pagination?.pageSize || PAGINATION_DEFAULT_PAGESIZE;
    paginationOptions.total = await Model.count(options);

    options.offset = (paginationOptions.current - 1) * paginationOptions.pageSize;
    options.limit = paginationOptions.pageSize;
    const data = await Model.findAll(options);

    return {
        data,
        pagination: paginationOptions
    };

}