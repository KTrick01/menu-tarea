<script setup>
import axios from 'axios';
import { ref } from 'vue';
const newTab = ref();
const ID = ref('');
const Desc = ref(null);
const error = ref(null);
const saveMsg = ref(null);
const guardado = ref(false);
const sexo = ref([]);
const idUp = ref(null);
const descUp = ref(null);
const modifyTab = ref();
async function getCiudad() {
	const res = await axios.get(`http://localhost:5000/sexo`);
	sexo.value = res.data;
}
async function deleteCiudad(id) {
	try {
		await axios.delete(`http://localhost:5000/sexo/${id}`);
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
async function updateCiudad(id) {
	try {
		await axios.put(`http://localhost:5000/sexo/${id}`, {
			descripcionSex: descUp.value,
			idsexo: idUp.value,
		});
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
function updateData(id, desc) {
	modifyTab.value.style.animation = 'enter .5s both';
	idUp.value = id;
	descUp.value = desc;
}
async function newId() {
	try {
		const newid = await axios.get('http://localhost:5000/idsexo');
		ID.value = newid.data[0].id;
		console.log();
	} catch (error) {
		console.log(error);
	}
}
async function newSexo() {
	if (ID.value && Desc.value) {
		error.value = false;
		try {
			await axios.post('http://localhost:5000/sexo', {
				idsexo: ID.value,
				descripcionSex: Desc.value,
			});
			guardado.value = true;
			getCiudad();
		} catch (error) {
			console.log(error);
		}
	} else {
		error.value = true;
		console.log('Error');
	}
}
function animaLeave() {
	setTimeout(() => {
		newId()
		Desc.value = ""
		saveMsg.value.style.animation ="saveLeave .5s both"
	}, 300);
}
newId();
getCiudad();
</script>
<template>
	<section class="main__section">
		<h1>Listado de Sexos</h1>
		<div class="lds-facebook" v-if="!sexo.length">
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div class="data__table" v-else>
			<div class="table__labels">
				<p>ID</p>
				<p>Descripcion</p>
				<p>Eliminar</p>
				<p>Modificar</p>
			</div>
			<div class="table__row" v-for="(ciudad, index) in sexo" :key="index">
				<p>{{ ciudad.idsexo }}</p>

				<p>{{ ciudad.descripcionSex }}</p>
				<button
					title="Eliminar"
					class="link__button row__button"
					@click="deleteCiudad(ciudad.idsexo)"
				>
					<i class="fa-solid fa-trash"></i>
				</button>
				<button
					title="Modificar"
					class="link__button row__button"
					@click="updateData(ciudad.idsexo, ciudad.descripcionSex)"
				>
					<i class="fa-solid fa-pen-to-square"></i>
				</button>
			</div>
			<div class="modify" ref="modifyTab">
				<label>
					ID
					<input type="text" v-model="idUp" />
				</label>
				<label>
					Descripcion
					<input type="text" v-model="descUp" />
				</label>
				<button class="link__button" @click="updateCiudad(idUp)">
					Guardar
				</button>
				<button class="link__button" @click="modifyTab.style.animation='leave .5s forwards'">Cancelar</button>
			</div>
			<section class="newEntry" ref="newTab">
				<h1>Nueva Ciudad</h1>
				<div class="guardado" v-if="guardado" ref="saveMsg" @animationend="animaLeave">
					<h3>Guardado</h3>
					<i class="fa-solid fa-check"></i>
				</div>
				<div class="new-data__container">
					<label>
						ID
						<input type="text" v-model="ID" required />
					</label>
					<label>
						Descripcion
						<input type="text" v-model="Desc" required />
					</label>
					<button class="link__button" @click="newSexo">Guardar</button>
					<button
						class="link__button"
						@click="newTab.style.animation = 'leaveNew .5s forwards'"
					>
						Cancelar
					</button>
					<div v-if="error" class="error">
						<h3>Rellena todos los campos</h3>
					</div>
				</div>
			</section>
		</div>
		<div class="btn-table-container">
			<router-link title="Inicio" to="/" class="link__button btn-table home"
				><i class="fa-solid fa-house"></i
			></router-link>
			<button @click="newTab.style.animation = 'enterNew .5s forwards'" title="Nuevo registro" class="link__button btn-table new">
				<i class="fa-solid fa-plus"></i>
			</button>
		</div>
	</section>
</template>
<style lang="scss">

</style>
