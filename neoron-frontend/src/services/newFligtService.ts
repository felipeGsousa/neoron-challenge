import { reactive, ref } from 'vue';
import axiosClient from '../axiosClient.js';
import { DatePicker } from 'ant-design-vue';
import router from '../router';
import axios from 'axios';
    
export const formState = reactive({
    zipOrigin: "",
    countryOrigin: "",
    cityOrigin: "",
    stateOrigin: "",
    zipDestination: "",
    countryDestination: "",
    cityDestination: "",
    stateDestination: "",
    date: null,
});
    
export const filteredCities = ref([]);

export const searchCities = async (searchText) => {
    if (searchText.length >= 3) {
        const response = await axiosClient.get(
            `select=place_name%2C%20admin_name1%2C%20country_code%2C%20postal_code&where=place_name%20LIKE%20%22%25${searchText}%25%22&group_by=place_name%2C%20admin_name1%2C%20country_code%2C%20postal_code&limit=10`
        );
        
        filteredCities.value = response.data.results.map((city) => ({
            value: city.place_name + ' - ' + city.country_code,                
            data: city,
        }));
    } else {
        filteredCities.value = [];
    }
};
    
export const onSelectOriginCity= (value) => {
    const selectedCity = filteredCities.value.find(
        (option) => option.value === value
    );
    
    formState.cityOrigin = selectedCity.data.place_name || "";
    formState.stateOrigin = selectedCity.data.admin_name1 || "";
    formState.countryOrigin = selectedCity.data.country_code || "";
    formState.zipOrigin = selectedCity.data.postal_code || "";
        
};

export const onSelectDestinationCity = (value) => {
    const selectedCity = filteredCities.value.find(
        (option) => option.value === value
    );
    
    formState.cityDestination = selectedCity.data.place_name || "";
    formState.stateDestination = selectedCity.data.admin_name1 || "";
    formState.countryDestination = selectedCity.data.country_code || "";
    formState.zipDestination = selectedCity.data.postal_code || "";
        
};

export const onFinish = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/flights/new', formState);
        console.log('Resposta:', response.data);
        if (response.data === "Voo criado com sucesso") {
            router.push('/')
        }
    }   catch (error) {
        console.error('Erro ao enviar a requisição:', error);
    }
};

export const redirectToFlights = () => {
    router.push('/');
};

export const onFinishFailed = (errorInfo: any) => {
    console.log('Erro ao enviar:', errorInfo);
};