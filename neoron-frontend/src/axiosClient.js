import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-postal-code@public/records?',
})

export default axiosClient;