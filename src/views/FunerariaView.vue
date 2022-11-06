<script setup>
import axios from 'axios';
import { ref } from 'vue';
const newTab = ref();
const ID = ref('');
const Telefono = ref(null);
const Direccion = ref(null);
const Ciudad = ref(null);
const error = ref(null);
const saveMsg = ref(null);
const guardado = ref(false);
const idUp = ref(null);
const telUp = ref(null);
const dirUp = ref(null);
const ciuUp = ref(null);
const modifyTab = ref();
const funeraria = ref([]);
const columnCount = ref([]);

async function getCiudad() {
	const res = await axios.get('http://localhost:5000/funeraria');
	funeraria.value = res.data;
	columnCount.value = Object.keys(funeraria.value[0]).length;

	console.log(res.data);
}
async function deleteCiudad(id) {
	try {
		await axios.delete(`http://localhost:5000/funeraria/${id}`);
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
async function updateCiudad(id) {
	try {
		await axios.put(`http://localhost:5000/funeraria/${id}`, {
			direccion: dirUp.value,
			ciudad_idciudad: ciuUp.value,
			telefono: telUp.value,
			idfuneraria: idUp.value,
		});
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
function updateData(id, tel, dir, ciu) {
	modifyTab.value.style.animation = 'enter .5s both';
	idUp.value = id;
	telUp.value = tel;
	dirUp.value = dir;
	ciuUp.value = ciu;
}
async function newId() {
	try {
		const newid = await axios.get('http://localhost:5000/idfuneraria');
		ID.value = newid.data[0].id;
		console.log();
	} catch (error) {
		console.log(error);
	}
}
async function newSexo() {
	if (ID.value && Direccion.value && Ciudad.value && Telefono.value) {
		error.value = false;
		try {
			await axios.post('http://localhost:5000/funeraria', {
				direccion: Direccion.value,
				ciudad_idciudad: Ciudad.value,
				telefono: Telefono.value,
				idfuneraria: ID.value,
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
		Direccion.value = '';
		Ciudad.value = '';
		Telefono.value = '';
		saveMsg.value.style.animation = 'saveLeave .5s both';
	}, 300);
}
newId();
getCiudad();
</script>
<template>
	<section class="main__section">
		<h1>Listado de Funerarias</h1>
		<div class="lds-facebook" v-if="!funeraria.length">
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div class="data__table" v-else>
			<div class="table__labels funeraria">
				<p>ID</p>
				<p>Telefono</p>
				<p>Direccion</p>
				<p>Ciudad</p>
				<p>Eliminar</p>
				<p>Modificar</p>
			</div>
			<div
				class="table__row funeraria"
				v-for="(ciudad, index) in funeraria"
				:key="index"
			>
				<p>{{ ciudad.idfuneraria }}</p>

				<p>{{ ciudad.telefono }}</p>
				<p>{{ ciudad.direccion }}</p>
				<p>{{ ciudad.ciudad_idciudad }}</p>
				<button
					title="Eliminar"
					class="link__button row__button"
					@click="deleteCiudad(ciudad.idfuneraria)"
				>
					<i class="fa-solid fa-trash"></i>
				</button>
				<button
					title="Modificar"
					class="link__button row__button"
					@click="
						updateData(
							ciudad.idfuneraria,
							ciudad.telefono,
							ciudad.direccion,
							ciudad.ciudad_idciudad
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
					Telefono
					<input type="text" v-model="telUp" />
				</label>
				<label>
					Direccion
					<input type="text" v-model="dirUp" />
				</label>
				<label>
					Ciudad
					<input type="text" v-model="ciuUp" />
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
						Telefono
						<input type="text" v-model="Telefono" required />
					</label>
					<label>
						Direccion

						<input type="text" v-model="Direccion" required />
					</label>
					<label>
						Ciudad

						<input type="text" v-model="Ciudad" required />
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
.funeraria {
	grid-template-columns: repeat(v-bind('columnCount+2'), 1fr);
}
</style>
