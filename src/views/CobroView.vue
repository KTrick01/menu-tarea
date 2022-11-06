<script setup>
import axios from 'axios';
import { ref } from 'vue';
const newTab = ref();
const ID = ref('');
const Fecha = ref(null);
const Pago = ref(null);
const Fallecido = ref(null);
const error = ref(null);
const saveMsg = ref(null);
const guardado = ref(false);
const idUp = ref(null);
const fechaUp = ref(null);
const pagoUp = ref(null);
const falleUp = ref(null);
const modifyTab = ref();
const cobro = ref([]);
const columnCount = ref([]);

async function getCiudad() {
	const res = await axios.get('http://localhost:5000/cobro');
	cobro.value = res.data;
	columnCount.value = Object.keys(cobro.value[0]).length;

	console.log(res.data);
}
async function deleteCiudad(id) {
	try {
		await axios.delete(`http://localhost:5000/cobro/${id}`);
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
async function updateCiudad(id) {
	try {
		await axios.put(`http://localhost:5000/cobro/${id}`, {
			idCobro: idUp.value,
			fechacobro: fechaUp.value,
			tipoDePago: pagoUp.value,
			fallecido_idfallecido: falleUp.value,
			
		});
		getCiudad();
	} catch (error) {
		console.log(error);
	}
}
function updateData(id, fecha, tipo, falle) {
	modifyTab.value.style.animation = 'enter .5s both';
	idUp.value = id;
	fechaUp.value = fecha;
	pagoUp.value = tipo;
	falleUp.value = falle;
}
async function newId() {
	try {
		const newid = await axios.get('http://localhost:5000/idcobro');
		ID.value = newid.data[0].id;
		console.log();
	} catch (error) {
		console.log(error);
	}
}
async function newSexo() {
	if (ID.value && Fecha.value && Pago.value && Fallecido.value) {
		error.value = false;
		try {
			await axios.post('http://localhost:5000/cobro', {
				idCobro: ID.value,
				fechacobro: Fecha.value,
				tipoDePago: Pago.value,
				fallecido_idfallecido: Fallecido.value,
				
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
		Fecha.value = '';
		Fallecido.value = ""
		Pago.value = ""
		saveMsg.value.style.animation = 'saveLeave .5s both';
	}, 300);
}
newId();
getCiudad();
</script>
<template>
	<section class="main__section">
		<h1>Listado de Cobros</h1>
		<div class="lds-facebook" v-if="!cobro.length">
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div class="data__table" v-else>
			<div class="table__labels cobro">
				<p>ID</p>
				<p>Fecha</p>
				<p>Tipo Pago</p>
				<p>Fallecido</p>
				<p>Eliminar</p>
				<p>Modificar</p>
			</div>
			<div
				class="table__row cobro"
				v-for="(ciudad, index) in cobro"
				:key="index"
			>
				<p>{{ ciudad.idCobro }}</p>

				<p>{{ ciudad.fechacobro }}</p>
				<p>{{ ciudad.tipoDePago }}</p>
				<p>{{ ciudad.fallecido_idfallecido }}</p>
				<button
					title="Eliminar"
					class="link__button row__button"
					@click="deleteCiudad(ciudad.idCobro)"
				>
					<i class="fa-solid fa-trash"></i>
				</button>
				<button
					title="Modificar"
					class="link__button row__button"
					@click="
						updateData(
							ciudad.idCobro,
							ciudad.fechacobro,
							ciudad.tipoDePago,
							ciudad.fallecido_idfallecido
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
					Fecha
					<input type="text" v-model="fechaUp" />
				</label>
				<label>
					Tipo Pago
					<input type="text" v-model="pagoUp" />
				</label>
				<label>
					Fallecido
					<input type="text" v-model="falleUp" />
				</label>
				<button
					class="link__button"
					@click="updateCiudad(idUp, pagoUp, fechaUp, falleUp)"
				>
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
						Fecha
						<input type="text" v-model="Fecha" required />
					</label>
					<label>
						Tipo Pago
						<input type="text" v-model="Pago" required />
					</label>
					<label>
						Fallecido
						<input type="text" v-model="Fallecido" required />
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
.cobro {
	grid-template-columns: repeat(v-bind('columnCount + 2'), 1fr);
}
</style>
