<template>
  <div class="fondo">
  <v-container >
    <v-form >
      <v-row class="mb-4" >
        <v-col cols="12" md="4" >
          <!-- Tipomovimiento guarda el valor elegido por el usuario de tiposmovimientos-->
    <v-select
      bg-color="light-blue-darken-4"
      v-model="TipoMovimiento" 
      :items="tiposMovimiento"
      item-title="text"
      item-value="value"
      label="Tipo de Movimiento"
      outlined
      density="compact"
      required
    ></v-select>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <div>
            <strong>Comprobante:</strong> 1-{{ ProximoNumero }}
          </div>
        </v-col>
        <v-col cols="12" md="4">
<v-select
  bg-color="light-blue-darken-4"
  v-model="IddepositosSeleccionado"
  :items="depositos"
  item-title="Nombre"
  item-value="IdDeposito"
  label="Depósito Origen"
  outlined
  density="compact"
  required
></v-select>
  </v-col>
    </v-row>


<v-text-field
  bg-color="light-blue-darken-4"
  v-model="busqueda"  
  label="Buscar Articulo"
  outlined
  dense
  @input="buscarArticulo"
></v-text-field>
<div
  v-if="mostrarSugerencias"
  class="panel-sugerencias"
>
  <v-list>
    <v-list-item
      v-for="item in sugerencias"
      :key="item.IdArticulo"
      @click="seleccionarArticulo(item)"
    >
      <v-list-item-title>
        <strong>{{ item.Codigo }}</strong> - 
        {{ item.Descripcion }} - 
        {{ item.Codigo_barra }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</div>
</v-form>
    
    <v-dialog v-model="mostrarCantidad" max-width="400">
      <v-card>
        <v-card-title>Ingrese cantidad para: {{ Articulo.descripcion }}</v-card-title>
        <v-card-text>
          <v-text-field
          bg-color="light-blue-darken-4"
            type="number"
            v-model.number="cantidadTemporal"
            label="Cantidad"
            min="1"
            @keyup.enter="confirmarCantidad"
            ref="inputCantidad"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="confirmarCantidad">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<v-data-table
  :headers="headers"
  :items="articulos"
  item-key="IdArticulo"
  class="elevation-1"
  :pagination="false"
  hide-default-footer
>

  <template #item.Eliminar="{ item, index }">
    <v-btn icon @click="eliminarArticulo(index)">
      ❌
    </v-btn>
  </template>

  <template #item.Editar="{ item, index }">
    <v-btn icon color="blue" @click="editarArticulo(index)">
      ✏️
    </v-btn>
  </template>

  <template #item.totalCosto="{ item }">
    {{ (item.costo * item.cantidad).toFixed(2) }}
  </template>

  <template #item.totalPrecio="{ item }">
    {{ (item.precio * item.cantidad).toFixed(2) }}
  </template>

<template #body.append>
  <tr><td colspan="10" style="height: 12px;"></td></tr>

  <tr style="background-color: #0d47a1;">
    <td colspan="7"></td>

    <td class="text-right"
        style="font-weight: bold; color: white; padding: 10px; white-space: nowrap;">
      Costo Total: {{ totalCosto }}
    </td>

    <td class="text-right"
        style="font-weight: bold; color: white; padding: 10px; white-space: nowrap;">
      Precio Total: {{ totalPrecio }}
    </td>
  </tr>
</template>
</v-data-table>

    <v-row justify="end" class="mt-4">
      <v-btn color="success" @click="guardarMovimiento">Guardar Movimiento</v-btn>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import { apiRequest, apiCreate, apiUpdate, apiDelete } from '@/../utils/api'

export default {
  data() {
    return {

      TipoMovimiento: 'EGR',
      tiposMovimiento: [
        { text: 'Ingreso', value: 'ING' },
        { text: 'Egreso', value: 'EGR' },
        { text: 'Ajuste', value: 'AJU' },
        { text: 'Devolución', value: 'DEV' },
        { text: 'Remito', value: 'REM' },
        { text: 'Venta', value: 'VEN' },
      ],
      Articulo: {
        IdArticulo: null,
        cantidad: '',
        codigo: '',
        descripcion: '',
        CodigoBarra: '',
        precio: 0,
        costo: 0,
      },
      articulos: [],
      depositos: [],
      IddepositosSeleccionado: '',
      busqueda: '',
      sugerencias: [],
      mostrarSugerencias: false,
      mostrarCantidad: false,
      cantidadTemporal: 1,
      ProximoNumero: '',
      headers: [
  { title: 'Eliminar', key: 'Eliminar', align: 'center' },
  { title: 'Editar', key: 'Editar', align: 'center' },
  { title: 'Cantidad', key: 'cantidad' },
  { title: 'Código Artículo', key: 'codigo' },
  { title: 'Descripción', key: 'descripcion' },
  { title: 'Código Barras', key: 'CodigoBarra' },
  { title: 'Precio', key: 'precio' },
  { title: 'Costo', key: 'costo' },
  { title: 'Total Costo', key: 'totalCosto' },
  { title: 'Total Precio', key: 'totalPrecio' },
],
    
    };
    
  },
  computed: {
    totalPrecio() {
      return this.articulos.reduce((acc, a) => acc + a.precio * a.cantidad, 0).toFixed(2);
    },
    totalCosto() {
      return this.articulos.reduce((acc, a) => acc + a.costo * a.cantidad, 0).toFixed(2);
    },
  },
  methods: {
    async eliminarArticulo(index) {
      this.articulos.splice(index, 1);
    },

    async editarArticulo(index) {
      const articulo = this.articulos[index];
      this.Articulo = { ...articulo };
      this.cantidadTemporal = articulo.cantidad;
      this.articulos.splice(index, 1);
      this.mostrarCantidad = true;
      this.$nextTick(() => {
        const input = this.$refs.inputCantidad;
        if (input) input.focus();
      });
    },

    async obtenerDepositos() {
      try {
        const res = await fetch('http://localhost:3000/depositos');
        const data = await res.json();
        this.depositos = data;  
        if (data.length > 0) {
          this.IddepositosSeleccionado = data[0].IdDeposito;
        }

      } catch (err) {
        console.error('Error al obtener depósitos:', err);
      }
    },
    
    async buscarArticulo() {
      const termino = this.busqueda.trim();  
      if (termino.length === 0) {
        const data = await apiRequest(`http://localhost:3000/articulos/buscar`);
        this.sugerencias = data;
        this.mostrarSugerencias = true;
        return;
      }
      try {
        const data = await apiRequest(
          `http://localhost:3000/articulos/buscar?termino=${encodeURIComponent(termino)}`
        );

        this.sugerencias = data;
        this.mostrarSugerencias = true;

      } catch (err) {
        console.error("Error en búsqueda:", err);
        this.sugerencias = [];
      }
    },

    handleClickOutside(e) {
      const panel = this.$el.querySelector(".panel-sugerencias");
      if (panel && !panel.contains(e.target)) {
        this.mostrarSugerencias = false;
      }
    },
    seleccionarArticulo(articulo) {
      this.Articulo = {
        IdArticulo: articulo.IdArticulo,
        codigo: articulo.Codigo,
        descripcion: articulo.Descripcion,
        CodigoBarra: articulo.Codigo_barra,
        precio: articulo.Precio,
        costo: articulo.Costo,
      };

      this.mostrarSugerencias = false;
      this.mostrarCantidad = true;

      this.cantidadTemporal = 1;

      this.$nextTick(() => {
        const input = this.$refs.inputCantidad;
        if (input) input.focus();
      });
    },
   
    confirmarCantidad() {
      if (!this.cantidadTemporal || this.cantidadTemporal <= 0) {
        alert('Debe ingresar una cantidad válida');
        return;
      }
      this.articulos.push({ ...this.Articulo, cantidad: this.cantidadTemporal });
      this.Articulo = { IdArticulo: null, codigo: '', descripcion: '', CodigoBarra: '', precio: 0, costo: 0 };
      this.cantidadTemporal = 1;
      this.mostrarCantidad = false;
      this.busqueda='';
    },

    async guardarMovimiento() {
      if (!this.TipoMovimiento || !this.IddepositosSeleccionado || this.articulos.length === 0) {
        alert('Faltan datos para guardar el movimiento');
        return;
      }
      try {
        const Movimiento= 
        {
          TipoMovimiento: this.TipoMovimiento,
          Prefijo:1,
          IdDeposito:this.IddepositosSeleccionado,
          Articulos: this.articulos.map(a => ({ IdArticulo: a.IdArticulo, Cantidad: a.cantidad })),
        }
        await apiCreate('http://localhost:3000/movimientos',Movimiento);        
        alert(`Movimiento guardado`);
        await this.obtenerProximo();
        this.articulos = [];
      } catch (err) {
        console.error(err);
        alert('Hubo un error al guardar el movimiento');
      }
    },
    async obtenerProximo() {
      try {
        const res = await fetch(`http://localhost:3000/movimientos/proximo-numero?TipoMovimiento=${this.TipoMovimiento}&Prefijo=1`);
        const data = await res.json();
        this.ProximoNumero = data.proximoNumero;
      } catch (err) {
        console.error(err);
      }
    },


  },

  mounted() {
  document.addEventListener("click", this.handleClickOutside);
  this.obtenerDepositos();
  this.obtenerProximo();
}
};
</script>
<style scoped >
.panel-sugerencias {
  position: absolute;
  width: 100%;
  max-height: 280px;
  overflow-y: auto;
  background: white;
  z-index: 999;
  border: 2px solid #2196f3;
  border-radius: 6px;
  margin-top: 4px;
}
</style>
