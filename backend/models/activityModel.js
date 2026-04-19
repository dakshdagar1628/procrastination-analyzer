import pool from '../config/db.js';

export const initializeActivityTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS activities (
      id SERIAL PRIMARY KEY,
      website_name VARCHAR(255) NOT NULL,
      minutes INTEGER NOT NULL CHECK (minutes > 0),
      category VARCHAR(20) NOT NULL CHECK (category IN ('productive', 'neutral', 'distracting')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(query);
};

export const createActivity = async ({ websiteName, minutes, category }) => {
  const query = `
    INSERT INTO activities (website_name, minutes, category)
    VALUES ($1, $2, $3)
    RETURNING id, website_name AS "websiteName", minutes, category, created_at AS "createdAt";
  `;

  const values = [websiteName, minutes, category];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllActivities = async () => {
  const query = `
    SELECT id, website_name AS "websiteName", minutes, category, created_at AS "createdAt"
    FROM activities
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query);
  return result.rows;
};

export const getCategoryAnalytics = async () => {
  const query = `
    SELECT category, COALESCE(SUM(minutes), 0)::INTEGER AS total
    FROM activities
    GROUP BY category
    ORDER BY category;
  `;

  const result = await pool.query(query);

  const defaultTotals = {
    productive: 0,
    neutral: 0,
    distracting: 0
  };

  result.rows.forEach((row) => {
    defaultTotals[row.category] = row.total;
  });

  return defaultTotals;
};

export const deleteActivity = async (id) => {
  const query = `DELETE FROM activities WHERE id = $1 RETURNING id;`;
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};
