<script setup>
import axios from 'axios';
import { ref } from 'vue';
const newTab = ref();
const ID = ref('');
const Cementerio = ref(null);
const Funeraria = ref(null);
const error = ref(null);
const saveMsg = ref(null);
const guardado = ref(false);
const idUp = ref(null);
const ceUp = ref(null);
const fuUp = ref(null);
const modifyTab = ref();
const entierro = ref([]);
const columnCount = ref([]);

async function getCiudad() {
	const res = await axios.get('http://localhost:5000/entierro');
	entierro.value = res.data;
	columnCount.value = Object.keys(entierro.value[0]).length;

	console.log(res.data);
}
async function deleteCiudad(id) {
	try {
		await axios.delete(`http://localhost:5000/entierro/${id}`);
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
async function updateCiudad(id) {
	try {
		await axios.put(`http://localhost:5000/entierro/${id}`, {
			funeraria_idfuneraria: fuUp.value,
			cementerio: ceUp.value,
			identierro: idUp.value,
		});
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
function updateData(id, cemen, fun) {
	modifyTab.value.style.animation = 'enter .5s both';
	idUp.value = id;
	ceUp.value = cemen;
	fuUp.value = fun;
}
async function newId() {
	try {
		const newid = await axios.get('http://localhost:5000/identierro');
		ID.value = newid.data[0].id;
		console.log();
	} catch (error) {
		console.log(error);
	}
}
async function newSexo() {
	if (ID.value && Funeraria.value && Cementerio.value) {
		error.value = false;
		try {
			await axios.post('http://localhost:5000/entierro', {
				funeraria_idfuneraria: Funeraria.value,
				cementerio: Cementerio.value,
				identierro: ID.value,
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
		newId();
		Funeraria.value = '';
		Cementerio.value = '';
		saveMsg.value.style.animation = 'saveLeave .5s both';
	}, 300);
}
newId();
getCiudad();
</script>
<template>
	<section class="main__section">
		<h1>Listado de Entierros</h1>
		<div class="lds-facebook" v-if="!entierro.length">
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div class="data__table" v-else>
			<div class="table__labels entierro">
				<p>ID</p>
				<p>Cementerio</p>
				<p>Funeraria</p>
				<p>Eliminar</p>
				<p>Modificar</p>
			</div>
			<div
				class="table__row entierro"
				v-for="(ciudad, index) in entierro"
				:key="index"
			>
				<p>{{ ciudad.identierro }}</p>

				<p>{{ ciudad.cementerio }}</p>
				<p>{{ ciudad.funeraria_idfuneraria }}</p>
				<button
					title="Eliminar"
					class="link__button row__button"
					@click="deleteCiudad(ciudad.identierro)"
				>
					<i class="fa-solid fa-trash"></i>
				</button>
				<button
					title="Modificar"
					class="link__button row__button"
					@click="
						updateData(
							ciudad.identierro,
							ciudad.cementerio,
							ciudad.funeraria_idfuneraria
						)
					"
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
					Cementerio
					<input type="text" v-model="ceUp" />
				</label>
				<label>
					Funeraria
					<input type="text" v-model="fuUp" />
				</label>
				<button class="link__button" @click="updateCiudad(idUp)">
					Guardar
				</button>
				<button
					class="link__button"
					@click="modifyTab.style.animation = 'leave .5s forwards'"
				>
					Cancelar
				</button>
			</div>
			<section class="newEntry" ref="newTab">
				<h1>Nueva Ciudad</h1>
				<div
					class="guardado"
					v-if="guardado"
					ref="saveMsg"
					@animationend="animaLeave"
				>
					<h3>Guardado</h3>
					<i class="fa-solid fa-check"></i>
				</div>
				<div class="new-data__container">
					<label>
						ID
						<input type="text" v-model="ID" required />
					</label>
					<label>
						Cementerio
						<input type="text" v-model="Cementerio" required />
					</label>
					<label>
						Funeraria
						
						<input type="text" v-model="Funeraria" required />
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
			<button
				@click="newTab.style.animation = 'enterNew .5s forwards'"
				title="Nuevo registro"
				class="link__button btn-table new"
			>
				<i class="fa-solid fa-plus"></i>
			</button>
		</div>
	</section>
</template>

<style lang="scss">
.entierro {
	grid-template-columns: repeat(v-bind('columnCount + 2'), 1fr);
}
</style>
