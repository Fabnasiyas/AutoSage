import axios from 'axios';

const mapboxAPI = axios.create({
  baseURL: 'https://api.mapbox.com',
  params: {
    access_token: process.env.REACT_APP_MAP_TOKEN
  }
});

export default mapboxAPI;