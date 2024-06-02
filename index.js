const express = require('express');
const app = express();
const linkedIn = require('linkedin-jobs-api'); // Make sure this is correctly installed and configured
const cors = require('cors');
const axios = require('axios');

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
    try {
        const response = await linkedIn.query(queryOptions); // Query LinkedIn API
        res.json(response); // Send job listings data to the frontend
    } catch (error) {
        console.error('Error fetching job listings from LinkedIn:', error);
        res.status(500).json({ error: 'Failed to fetch job listings' });
    }
});

app.post('/api/jobs1', async (req, res) => {
    const { query, date_posted, page} = req.body;
    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        headers: {
        'X-RapidAPI-Key': 'b03a04e701msh8d1955b60a71041p12f45ajsnf531f5a0bc5e',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
        query: query,
        page: page,
        num_pages: '1',
        date_posted: date_posted
        
        },
    };
    console.log(options);
    try {
        const response = await axios.request(options);
        const data = response.data.data;
        res.json(data);
        } catch (error) {
        console.error('ERROR', error);
      }
})

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;