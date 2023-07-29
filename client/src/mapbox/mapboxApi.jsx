// import axios from 'axios';

// const mapboxAPI = axios.create({
//   baseURL: 'https://api.mapbox.com',
//   params: {
//     access_token: 'pk.eyJ1Ijoic2hpamFzMDkiLCJhIjoiY2xpaXUyZHQzMDFzeDNlcGEwbHd6ejJmOCJ9.TZzIUmMeUTVSKfdqqSWgWg' // Replace with your Mapbox access token
//   }
// });

// export default mapboxAPI;



import axios from 'axios';

const mapboxAPI = axios.create({
  baseURL: 'https://api.mapbox.com',
  params: {
    access_token:process.env.REACT_APP_MAP_TOKEN
  }
});

export default mapboxAPI;