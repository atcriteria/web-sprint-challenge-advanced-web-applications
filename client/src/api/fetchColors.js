import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

export const fetchColors = () => {
    axiosWithAuth()
        .get("http://localhost:5000/api/colors")
        .then(res => {
            return (res.data);
        })
        .catch(err => {
            console.log(`There was an error: ${err}`)
        })
}