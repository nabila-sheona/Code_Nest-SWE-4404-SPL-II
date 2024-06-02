import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/about', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/about',
    headers: {
      'X-RapidAPI-Key': '2426a6b2e8mshd51031441618bd2p15de9cjsn1d91d3360f1d', // Replace with your own RapidAPI key
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Judge0');
  }
});

export default router;
