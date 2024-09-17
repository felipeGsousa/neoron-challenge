import axios from "axios";
import { ref } from 'vue';
import router  from '../router' 

export const flights = ref([]);

export const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Cidade Origem',
        dataIndex: 'cityOrigin',
        key: 'cityOrigin',
    },
    {
        title: 'Estado Origem',
        dataIndex: 'stateOrigin',
        key: 'stateOrigin',
    },
    {
        title: 'País Origem',
        dataIndex: 'countryOrigin',
        key: 'countryOrigin',
    },
    {
        title: 'CEP Origem',
        dataIndex: 'zipOrigin',
        key: 'zipOrigin',
    },
    {
        title: 'Cidade Destino',
        dataIndex: 'cityDestination',
        key: 'cityDestination',
    },
    {
        title: 'Estado Destino',
        dataIndex: 'stateDestination',
        key: 'stateDestination',
    },
    {
        title: 'País Destino',
        dataIndex: 'countryDestination',
        key: 'countryDestination',
    },
    {
        title: 'CEP Destino',
        dataIndex: 'zipDestination',
        key: 'zipDestination',
    },
    {
        title: 'Data do Voo',
        dataIndex: 'date',
        key: 'date',
        customRender: ({ text }) => formatDate(text),
    },
    {
        title: 'Ações',
        key: 'actions',
        slots: { customRender: 'actionColumn' },
    },
];
  
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
};
 
export const getAllFlights = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/flights');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os voos:', error);
        throw error;
    }
}