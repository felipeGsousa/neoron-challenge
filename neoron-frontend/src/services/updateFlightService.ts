import { reactive, ref } from "vue";
import axiosClient from '../axiosClient.js';
import axios from "axios";
import router from '../router'


export const response = ref();

export const filteredCities = ref([]);

export const flight = reactive({
    id: 0,
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

export const id = ref<number | null>(null);

export const getFlight = async (id: number) => {
    try {
        const response = await axios.get('http://localhost:3000/api/flights/'+ id);
        return response.data;
    } catch (error){
        console.error('Erro ao buscar os voos:', error);
        throw error;
    }
}

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
    
    flight.cityOrigin = selectedCity.data.place_name || "";
    flight.stateOrigin = selectedCity.data.admin_name1 || "";
    flight.countryOrigin = selectedCity.data.country_code || "";
    flight.zipOrigin = selectedCity.data.postal_code || "";
        
};

export const onSelectDestinationCity = (value) => {
    const selectedCity = filteredCities.value.find(
        (option) => option.value === value
    );
    
    flight.cityDestination = selectedCity.data.place_name || "";
    flight.stateDestination = selectedCity.data.admin_name1 || "";
    flight.countryDestination = selectedCity.data.country_code || "";
    flight.zipDestination = selectedCity.data.postal_code || "";
        
};

export const onFinish = async () => {
    try {
        const response = await axios.put('http://localhost:3000/api/flights/update', flight);
        console.log('Resposta:', response.data);
        if (response.data === "Voo editado com sucesso") {
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