const express = require('express');
const app = express();
const linkedIn = require('linkedin-jobs-api'); // Make sure this is correctly installed and configured
const cors = require('cors');

app.use(express.static('dist'))
app.use(cors());
app.use(express.json());


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.post('/api/jobs', async (req, res) => {
    const { jobTitle, location, dateSincePosted, limit, sortBy } = req.body;

    const queryOptions = {
        keyword : jobTitle,
        location,
        dateSincePosted,
        limit: limit, // Convert limit to a number
        sortBy
    };
    console.log(queryOptions);
    try {
        const response = await linkedIn.query(queryOptions); // Query LinkedIn API
        res.json(response); // Send job listings data to the frontend
    } catch (error) {
        console.error('Error fetching job listings from LinkedIn:', error);
        res.status(500).json({ error: 'Failed to fetch job listings' });
    }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;