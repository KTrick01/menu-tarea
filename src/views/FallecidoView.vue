<script setup>
import axios from 'axios';
import { ref } from 'vue';
const newTab = ref();
const ID = ref('');
const CI = ref(null);
const Nombre = ref(null);
const Apelldio = ref(null);
const Sexo = ref(null);
const Ciudad = ref(null);
const Direccion = ref(null);
const Estado = ref(null);
const Entierro = ref(null);
const Fallecido = ref(null);
const error = ref(null);
const saveMsg = ref(null);
const guardado = ref(false);
const idUp = ref(null);
const ciUp = ref(null);
const nomUp = ref(null);
const apeUp = ref(null);
const ciuUp = ref(null);
const dirUp = ref(null);
const sexUp = ref(null);
const ecUp = ref(null);
const entUp = ref(null);
const modifyTab = ref();
const fallecido = ref([]);
const columnCount = ref([]);

async function getCiudad() {
	const res = await axios.get('http://localhost:5000/fallecido');
	fallecido.value = res.data;
	columnCount.value = Object.keys(fallecido.value[0]).length;

	console.log(res.data);
}
async function deleteCiudad(id) {
	try {
		await axios.delete(`http://localhost:5000/fallecido/${id}`);
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
async function updateCiudad(id) {
	try {
		await axios.put(`http://localhost:5000/fallecido/${id}`, {
			cinumero: ciUp.value,
			nombre: nomUp.value,
			apellido: apeUp.value,
			direccion: dirUp.value,
			sexo_idsexo: sexUp.value,
			estado_civil_idestado_civil: ecUp.value,
			ciudad_idciudad: ciuUp.value,
			Entierro_identierro: entUp.value,
			idfallecido: idUp.value,
		});
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
function updateData(
	id,
	ci,
	nombre,
	apellido,
	direccion,
	sexo,
	ec,
	ciudad,
	entierro
) {
	modifyTab.value.style.animation = 'enter .5s both';
	idUp.value = id;
	ciUp.value = ci;
	(nomUp.value = nombre),
		(apeUp.value = apellido),
		(ciuUp.value = ciudad),
		(dirUp.value = direccion),
		(sexUp.value = sexo),
		(ecUp.value = ec),
		(entUp.value = entierro);
}
async function newId() {
	try {
		const newid = await axios.get('http://localhost:5000/idfallecido');
		ID.value = newid.data[0].id;
		console.log();
	} catch (error) {
		console.log(error);
	}
}
async function newSexo() {
	if (ID.value && Ciudad.value && Sexo.value && Estado.value && Entierro.value && Nombre.value && Apelldio.value && Direccion.value && CI.value) {
		error.value = false;
		try {
			await axios.post('http://localhost:5000/fallecido', {
				cinumero: CI.value,
				nombre: Nombre.value,
				apellido: Apelldio.value,
				direccion: Direccion.value,
				sexo_idsexo: Sexo.value,
				estado_civil_idestado_civil: Estado.value,
				ciudad_idciudad: Ciudad.value,
				Entierro_identierro: Entierro.value,
				idfallecido: ID.value,
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
		CI.value = ""
		Nombre.value = ""
		Apelldio.value = ""
		Ciudad.value = ""
		Sexo.value = ""
		Estado.value = ""
		Direccion.value  = ""
		Entierro.value = ""
		saveMsg.value.style.animation = 'saveLeave .5s both';
	}, 300);
}
newId();
getCiudad();
</script>
<template>
	<section class="main__section">
		<h1>Listado de Fallecidos</h1>
		<div class="lds-facebook" v-if="!fallecido.length">
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div class="data__table" v-else>
			<div class="table__labels fallecido">
				<p>ID</p>
				<p>C.I</p>
				<p>Nombre</p>
				<p>Apellido</p>
				<p>Direccion</p>
				<p>Sexo</p>
				<p>Estado Civil</p>
				<p>Ciudad</p>
				<p>Entierro</p>
				<p>Eliminar</p>
				<p>Modificar</p>
			</div>
			<div
				class="table__row fallecido"
				v-for="(ciudad, index) in fallecido"
				:key="index"
			>
				<p>{{ ciudad.idfallecido }}</p>

				<p>{{ ciudad.cinumero }}</p>
				<p>{{ ciudad.nombre }}</p>
				<p>{{ ciudad.apellido }}</p>
				<p>{{ ciudad.direccion }}</p>
				<p>{{ ciudad.sexo_idsexo }}</p>
				<p>{{ ciudad.estado_civil_idestado_civil }}</p>
				<p>{{ ciudad.ciudad_idciudad }}</p>
				<p>{{ ciudad.Entierro_identierro }}</p>
				<button
					title="Eliminar"
					class="link__button row__button"
					@click="deleteCiudad(ciudad.idfallecido)"
				>
					<i class="fa-solid fa-trash"></i>
				</button>
				<button
					title="Modificar"
					class="link__button row__button"
					@click="
						updateData(
							ciudad.idfallecido,
							ciudad.cinumero,
							ciudad.nombre,
							ciudad.apellido,
							ciudad.direccion,
							ciudad.sexo_idsexo,
							ciudad.estado_civil_idestado_civil,
							ciudad.ciudad_idciudad,
							ciudad.Entierro_identierro
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
					C.I
					<input type="text" v-model="ciUp" />
				</label>
				<label>
					Nombre
					<input type="text" v-model="nomUp" />
				</label>
				<label>
					Apellido
					<input type="text" v-model="apeUp" />
				</label>
				<label>
					Direccion
					<input type="text" v-model="dirUp" />
				</label>
				<label>
					Sexo
					<input type="text" v-model="sexUp" />
				</label>
				<label>
					Estado civil
					<input type="text" v-model="ecUp" />
				</label>
				<label>
					Ciudad
					<input type="text" v-model="ciuUp" />
				</label>
				<label>
					Entierro
					<input type="text" v-model="entUp" />
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
			<div class="newEntry" ref="newTab">
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
						C.I
						<input type="text" v-model="CI" />
					</label>
					<label>
						Nombre
						<input type="text" v-model="Nombre" />
					</label>
					<label>
						Apellido
						<input type="text" v-model="Apelldio" />
					</label>
					<label>
						Direccion
						<input type="text" v-model="Direccion" />
					</label>
					<label>
						Sexo
						<input type="text" v-model="Sexo" />
					</label>
					<label>
						Estado civil
						<input type="text" v-model="Estado" />
					</label>
					<label>
						Ciudad
						<input type="text" v-model="Ciudad" />
					</label>
					<label>
						Entierro
						<input type="text" v-model="Entierro" />
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
			</div>
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
.fallecido {
	grid-template-columns: repeat(v-bind('columnCount + 2'), 1fr);
}

</style>
