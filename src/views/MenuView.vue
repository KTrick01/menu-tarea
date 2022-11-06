<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>
<template>
    <section class="main__menu">
        <h1>Menu Principal</h1>
        <hr>
        <div class="main__buttons">
            <router-link class="link__button" to="/ciudades">Ciudades</router-link>
            <router-link class="link__button" to="/ec">Estado civil</router-link>
            <router-link class="link__button" to="/sexo">Sexo</router-link>
            <router-link class="link__button" to="/cobro">Cobro</router-link>
            <router-link class="link__button" to="/fallecidos">Fallecidos</router-link>
            <router-link class="link__button" to="/entierro">Entierro</router-link>
            <router-link class="link__button" to="/funeraria">Funeraria</router-link>
            <router-link class="link__button" to="/planentierro">Plan Entierro</router-link>
        </div>
    </section>
</template>

<style lang="scss">



.main__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}



</style>