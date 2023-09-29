const express = require('express');
const _ = require('lodash');
const caching = require('../middleware/caching');
const router = express.Router();

router.get('/api/blog-stats', async (req, res) => {
    try {
        const analyticsData = await caching();
        res.status(200).json({ message: "success", analyticsData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/blog-search', async (req, res) => {
    const query = req.query?.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const data = await caching();
        const filteredBlogs = data.uniqueBlogTitles.filter((title) =>
            title.toLowerCase().includes(query.toLowerCase())
        );

        res.status(200).json({ message: "success", filteredBlogs });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router

