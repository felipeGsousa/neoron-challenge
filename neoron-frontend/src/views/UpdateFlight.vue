<template>
    <a-form
        :model="flight"
        name="basic"
        :label-col="{ span: 28 }"
        :wrapper-col="{ span: 32 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
        <h1>Criar novo voo</h1>
        <div class="flex">
            <div class="form">
                <h2>Cidade Origem</h2>
                <a-form-item
                    label="Cidade"
                    name="cidade"
                >
                    <a-auto-complete
                    v-model:value="flight.cityOrigin"
                    :options="filteredCities"
                    @search="searchCities"
                    @select="onSelectOriginCity"
                    placeholder="Digite a cidade de origem"
                    />
                </a-form-item>
            
                <a-form-item label="Estado" name="estado">
                    <a-input v-bind:value="flight.stateOrigin" readonly />
                </a-form-item>
            
                <a-form-item label="Código do País" name="codigo_pais" >
                    <a-input v-bind:value="flight.countryOrigin" readonly />
                </a-form-item>
            
                <a-form-item label="CEP" name="cep">
                    <a-input v-bind:value="flight.zipOrigin" readonly />
                </a-form-item>
            </div>

            <div class="form">
                <h2>Cidade Destino</h2>
                <a-form-item
                    label="Cidade"
                    name="cidade"
                >
                    <a-auto-complete
                    v-model:value="flight.cityDestination"
                    :options="filteredCities"
                    @search="searchCities"
                    @select="onSelectDestinationCity"
                    placeholder="Digite a cidade de destino"
                    />
                </a-form-item>
            
                <a-form-item label="Estado" name="estado">
                    <a-input v-bind:value="flight.stateDestination"/>
                </a-form-item>
            
                <a-form-item label="Código do País" name="codigo_pais" >
                    <a-input v-bind:value="flight.countryDestination"/>
                </a-form-item>
            
                <a-form-item label="CEP" name="cep">
                    <a-input v-bind:value="flight.zipDestination"/>
                </a-form-item>
            </div>
        </div>
        <div>
            <h2>Data e Hora</h2>
            <a-form-item>
                <a-date-picker v-model:value="flight.date" show-time format="YYYY-MM-DD HH:mm:ss" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">Editar</a-button>
            </a-form-item>
        </div>
        <a-button type="primary" @click="redirectToFlights">Voltar para voos</a-button>
    </a-form>
</template>
  
<script lang="ts" setup>

    import { flight, id, getFlight, onFinish, onFinishFailed, redirectToFlights, filteredCities, searchCities, onSelectDestinationCity, onSelectOriginCity, response} from '../services/updateFlightService';
    import { onMounted } from 'vue';
    import { useRoute } from 'vue-router';


    const route = useRoute();
    
    onMounted(async () => {
        try {
            id.value = parseInt(route.params.id as string, 10);
            response.value = await getFlight(id.value);

            flight.id = response.value.id;
            flight.cityOrigin = response.value.cityOrigin;
            flight.stateOrigin = response.value.stateOrigin;
            flight.countryOrigin = response.value.countryOrigin;
            flight.zipOrigin = response.value.zipOrigin;
            flight.cityDestination = response.value.cityDestination;
            flight.stateDestination = response.value.stateDestination;
            flight.countryDestination = response.value.countryDestination;
            flight.zipDestination = response.value.zipDestination;

            
        } catch (error) {
            console.error('Erro ao carregar voo:', error);
        }
    });

</script>