import express from 'express';
import {
  addActivity,
  fetchActivities,
  fetchAnalytics,
  removeActivity
} from '../controllers/activityController.js';

const router = express.Router();

router.post('/activities', addActivity);
router.get('/activities', fetchActivities);
router.get('/analytics', fetchAnalytics);
router.delete('/activities/:id', removeActivity);

export default router;
