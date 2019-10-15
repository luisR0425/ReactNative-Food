import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 
      'Bearer bjJnfcPEpB8HPw_0-2nqn7GCvHtENLPRDw3UsI6pE2f73sgU-cZTuqtfPrz6poEaIn8J3U2KTA8h9lNYW19j8deEAPYVcQsvy9j_QS2uZIw9eFzOsW2oCe4BfeajXXYx'
  }
});

//yelp.get('/search')