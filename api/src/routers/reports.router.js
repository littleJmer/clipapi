import express from 'express';
import ReportsController from '@controllers/report.controller';

var router = express.Router();
router.post('/bytype', ReportsController.bytype);

export default router;