import express from 'express';
import router from '@routers';
import CONFIG from '@config';

const app = express();
const port = CONFIG.APP_PORT;

// set default timezone
process.env.TZ = 'America/Tijuana';

// parse requests
// - application/json
// - application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('::: Client request :::');
    console.log('Path: ', req.path);
    console.log('Body: ', JSON.stringify(req.body, null, '\t'));
    next(); // calling next middleware function or handler
});

// route for testing
app.get('/', (req, res) => {
    res.json({ time: new Date() });
});

// adding routes to app
router(app);

// error-handling middleware
app.use((error, req, res, next) => {
    console.log('::: Error Handling Middleware called :::');
    console.log('Path: ', req.path);
    console.error('Error: ', error);

    if (error?.name === 'SequelizeValidationError') {
        return res.status(500).json({ error: error.name, data: error.errors.map(e => e.message) });
    }

    if (error?.name === 'SequelizeForeignKeyConstraintError') {
        let data = ' does not exist.';
        let sqlMessage = error.parent?.sqlMessage ?? '';
        const [foreignKey] = sqlMessage.match(/FOREIGN KEY \(`[A-Za-z]*`\)/ig);
        data = foreignKey + data;
        return res.status(500).json({ error: error.name, data });
    }

    if (error?.name === 'SequelizeDatabaseError') {
        let data = error.parent?.sqlMessage ?? '';
        return res.status(500).json({ error: error.name, data });
    }

    res.status(500).json({ error: 'GENERAL', data: 'We sorry please try later' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Running ENV ${process.env.NODE_ENV}`)
});