<template>
    <a-table :columns="columns" :data-source="flights" row-key="id">
        <template>
            <p><strong>Data do Voo:</strong> {{ formatDate(record.date)}}</p>
            <p><strong>CEP de Destino:</strong> {{ record.zipDestination }}</p>
            <p><strong>País de Destino:</strong> {{ record.countryDestination }}</p>
            <p><strong>Estado de Destino:</strong> {{ record.stateDestination }}</p>
            <p><strong>Cidade de Destino:</strong> {{ record.cityDestination }}</p>
            <p><strong>CEP de Origem:</strong> {{ record.zipOrigin }}</p>
            <p><strong>País de Origem:</strong> {{ record.countryOrigin }}</p>
            <p><strong>Estado de Origem:</strong> {{ record.stateOrigin }}</p>
            <p><strong>Cidade de Origem:</strong> {{ record.cityOrigin }}</p>
        </template>
        <template #actionColumn="{ record }">
            <a-button @click="editFlight(record.id)" type="primary">Editar</a-button>
        </template>
    </a-table>
    <a-button type="primary" @click="redirectToNewFlight">Novo voo</a-button>
</template>
  
<script setup>
    import { flights, columns, formatDate, getAllFlights} from '../services/listFlightsService';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    
    onMounted(async () => {
        try {
            flights.value = await getAllFlights(); 
        } catch (error) {
            console.error('Erro ao carregar os voos:', error);
        }
    });

    const router = useRouter();
    const redirectToNewFlight = () => {
        router.push('/new');
    };

    const editFlight = (id) => {
        router.push({ path: `/update/${id}` });
    };
</script>