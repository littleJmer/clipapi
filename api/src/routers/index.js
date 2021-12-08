import fs from 'fs';
import path from 'path';

const router = (app) => {

    const basename = path.basename(__filename);

    fs
        .readdirSync(__dirname)
        .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach(file => {
            const router = require(path.join(__dirname, file)).default;
            const [prefix] = file.split('.');
            app.use('/' + prefix, router);
        });
};

export default router;