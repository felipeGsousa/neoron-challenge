<template>
    <a-form
        :model="formState"
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
                    v-model="formState.cityOrigin"
                    :options="filteredCities"
                    @search="searchCities"
                    @select="onSelectOriginCity"
                    placeholder="Digite a cidade de origem"
                    />
                </a-form-item>
            
                <a-form-item label="Estado" name="estado">
                    <a-input v-bind:value="formState.stateOrigin" readonly />
                </a-form-item>
            
                <a-form-item label="Código do País" name="codigo_pais" >
                    <a-input v-bind:value="formState.countryOrigin" readonly />
                </a-form-item>
            
                <a-form-item label="CEP" name="cep">
                    <a-input v-bind:value="formState.zipOrigin" readonly />
                </a-form-item>
            </div>

            <div class="form">
                <h2>Cidade Destino</h2>
                <a-form-item
                    label="Cidade"
                    name="cidade"
                >
                    <a-auto-complete
                    v-model="formState.cityDestination"
                    :options="filteredCities"
                    @search="searchCities"
                    @select="onSelectDestinationCity"
                    placeholder="Digite a cidade de destino"
                    />
                </a-form-item>
            
                <a-form-item label="Estado" name="estado">
                    <a-input v-bind:value="formState.stateDestination" readonly />
                </a-form-item>
            
                <a-form-item label="Código do País" name="codigo_pais" >
                    <a-input v-bind:value="formState.countryDestination" readonly />
                </a-form-item>
            
                <a-form-item label="CEP" name="cep">
                    <a-input v-bind:value="formState.zipDestination" readonly />
                </a-form-item>
            </div>
        </div>
        <div>
            <h2>Data e Hora</h2>
            <a-form-item>
                <a-date-picker v-model:value="formState.date" show-time format="YYYY-MM-DD HH:mm:ss" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">Enviar</a-button>
            </a-form-item>
        </div>
        <a-button type="primary" @click="redirectToFlights">Voltar para voos</a-button>
    </a-form>
</template>

<script setup>
    import {formState, onFinish, onFinishFailed, redirectToFlights, filteredCities, searchCities, onSelectDestinationCity, onSelectOriginCity} from '../services/newFligtService';
</script>