import CONFIG from '@config';

const { OPEN_HOUR, CLOSE_HOUR } = CONFIG;

export default (req, res, next) => {
    const today = new Date();
    const hours = today.getHours();
    if (hours >= OPEN_HOUR && hours < CLOSE_HOUR) {
        next();
    } else {
        return res.send(500, { error: 'OutOfTime', message: 'My Dinner is Close' });
    }
}