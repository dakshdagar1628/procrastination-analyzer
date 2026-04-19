import {
  createActivity,
  getAllActivities,
  getCategoryAnalytics,
  deleteActivity
} from '../models/activityModel.js';

const validCategories = ['productive', 'neutral', 'distracting'];

export const addActivity = async (req, res) => {
  try {
    const { websiteName, minutes, category } = req.body;

    if (!websiteName || !String(websiteName).trim()) {
      return res.status(400).json({ message: 'Website name is required.' });
    }

    if (!minutes || Number(minutes) <= 0) {
      return res.status(400).json({ message: 'Time spent must be greater than 0.' });
    }

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: 'Category must be productive, neutral, or distracting.'
      });
    }

    const newActivity = await createActivity({
      websiteName: String(websiteName).trim(),
      minutes: Number(minutes),
      category
    });

    return res.status(201).json(newActivity);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add activity.' });
  }
};

export const fetchActivities = async (req, res) => {
  try {
    const activities = await getAllActivities();
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch activities.' });
  }
};

export const fetchAnalytics = async (req, res) => {
  try {
    const analytics = await getCategoryAnalytics();
    return res.status(200).json(analytics);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch analytics.' });
  }
};

export const removeActivity = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'Valid activity ID is required.' });
    }

    const deleted = await deleteActivity(Number(id));

    if (!deleted) {
      return res.status(404).json({ message: 'Activity not found.' });
    }

    return res.status(200).json({ message: 'Activity deleted.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete activity.' });
  }
};
