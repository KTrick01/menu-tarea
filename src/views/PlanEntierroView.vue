<script setup>
import axios from 'axios';
import { ref } from 'vue';
const newTab = ref();
const ID = ref('');
const Entierro = ref(null);
const Cuotas = ref(null);
const Vencimiento = ref(null);
const saveMsg = ref(null);
const error = ref(null);
const guardado = ref(false);

const idUp = ref(null);
const venUp = ref(null);
const cuUp = ref(null);
const enUp = ref(null);
const modifyTab = ref();
const planentierro = ref([]);
const columnCount = ref([]);
async function getCiudad() {
	const res = await axios.get('http://localhost:5000/planentierro');
	planentierro.value = res.data;
	columnCount.value = Object.keys(planentierro.value[0]).length;
}
async function deleteCiudad(id) {
	try {
		await axios.delete(`http://localhost:5000/planentierro/${id}`);
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
async function updateCiudad(id) {
	try {
		await axios.put(`http://localhost:5000/planentierro/${id}`, {
			Entierro_identierro: enUp.value,
			cuotas: cuUp.value,
			vencimiento: venUp.value,
			idplanEntierro: idUp.value,
		});
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
function updateData(id, ven, cuo, ent) {
	modifyTab.value.style.animation = 'enter .5s both';
	idUp.value = id;
	venUp.value = ven;
	cuUp.value = cuo;
	enUp.value = ent;
}
async function newId() {
	try {
		const newid = await axios.get('http://localhost:5000/idplan');
		ID.value = newid.data[0].id;
		console.log();
	} catch (error) {
		console.log(error);
	}
}
async function newSexo() {
	if (ID.value && Entierro.value && Cuotas.value && Vencimiento.value) {
		error.value = false;
		try {
			await axios.post('http://localhost:5000/planentierro', {
				Entierro_identierro: Entierro.value,
				cuotas: Cuotas.value,
				vencimiento: Vencimiento.value,
				idplanEntierro: ID.value,
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
		Entierro.value = '';
		Vencimiento.value = '';
		Cuotas.value = '';
		saveMsg.value.style.animation = 'saveLeave .5s both';
	}, 300);
}
newId();
getCiudad();
</script>
<template>
	<section class="main__section">
		<h1>Listado de Plan Entierros</h1>
		<div class="lds-facebook" v-if="!planentierro.length">
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div class="data__table" v-else>
			<div class="table__labels planentierro">
				<p>ID</p>
				<p>Vencimiento</p>
				<p>Cuotas</p>
				<p>Entierro</p>
				<p>Eliminar</p>
				<p>Modificar</p>
			</div>
			<div
				class="table__row planentierro"
				v-for="(ciudad, index) in planentierro"
				:key="index"
			>
				<p>{{ ciudad.idplanEntierro }}</p>

				<p>{{ ciudad.vencimiento }}</p>
				<p>{{ ciudad.cuotas }}</p>
				<p>{{ ciudad.Entierro_identierro }}</p>
				<button
					title="Eliminar"
					class="link__button row__button"
					@click="deleteCiudad(ciudad.idplanEntierro)"
				>
					<i class="fa-solid fa-trash"></i>
				</button>
				<button
					title="Modificar"
					class="link__button row__button"
					@click="
						updateData(
							ciudad.idplanEntierro,
							ciudad.vencimiento,
							ciudad.cuotas,
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
					Vencimiento
					<input type="text" v-model="venUp" />
				</label>
				<label>
					Cuotas
					<input type="text" v-model="cuUp" />
				</label>
				<label>
					Entierro
					<input type="text" v-model="enUp" />
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
						Vencimiento
						<input type="text" v-model="Vencimiento" required />
					</label>
					<label>
						Cuotas

						<input type="text" v-model="Cuotas" required />
					</label>
					<label>
						Entierro

						<input type="text" v-model="Entierro" required />
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
.planentierro {
	grid-template-columns: repeat(v-bind('columnCount+2'), 1fr);
}
</style>
