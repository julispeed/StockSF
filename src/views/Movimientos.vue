<template>
  <div class="fondo">
  <v-container >
    <v-form >
      <v-row class="mb-4" >
        <v-col cols="12" md="4" >
          <v-select          
          bg-color="light-blue-darken-4"
            v-model="TipoMovimiento"
            :items="tiposMovimiento"
            item-text="s"
            label="Tipo de Movimiento"
            outlined
            dense
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
            item-text="Nombre"
            item-value="IdDeposito"
            label="Depósito Origen"
            outlined
            dense
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row class="mb-4" >
        <v-col cols="12" md="6">
          <v-text-field
          bg-color="light-blue-darken-4"
            v-model="busqueda"
            label="Buscar Artículo"
            outlined
            dense
            @keyup.enter="buscarArticulo"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <!-- Sugerencias -->
    <v-dialog v-model="mostrarSugerencias" max-width="500" >
      <v-card >
        <v-card-title>Seleccione un Artículo</v-card-title>
        <v-card-text >
          <v-list bg-color="light-blue-darken-4">
            <v-list-item            
              v-for="item in sugerencias"
              :key="item.IdArticulo"
              @click="seleccionarArticulo(item)"
            >
              <v-list-item-content>
                <v-list-item-title >
                  <strong>{{ item.Codigo }}</strong> - {{ item.Descripcion }} - {{ item.Codigo_barra }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Ingreso de Cantidad -->
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

    <!-- Tabla de artículos -->
    <v-data-table
    
      :headers="headers"
      :items="articulos"
      item-key="IdArticulo"
      class="elevation-1"
    >
      <template #item.Eliminar="{ item, index }">
        <v-btn icon  @click="eliminarArticulo(index)">
          ❌
        </v-btn>
      </template>

      <template #item.Editar="{ item, index }">
        <v-btn icon color="blue" @click="editarArticulo(index)">
          ✏️
        </v-btn>
      </template>

      <template #footer.prepend>
        <tr>
          <td colspan="7"><strong>Total:</strong></td>
          <td><strong>{{ totalCosto }}</strong></td>
          <td><strong>{{ totalPrecio }}</strong></td>
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
        { text: 'Eliminar', value: 'Eliminar', align: 'center' },
        { text: 'Editar', value: 'Editar', align: 'center' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Codigo Articulo', value: 'codigo' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Codigo Barras', value: 'CodigoBarra' },
        { text: 'Precio', value: 'precio' },
        { text: 'Costo', value: 'costo' },
        { text: 'Total Costo', value: 'totalCosto' },
        { text: 'Total Precio', value: 'totalPrecio' },
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
        const res = await fetch('https://stocksfback-production.up.railway.app/depositos');
        this.depositos = await res.json();
      } catch (err) {
        console.error('Error al obtener depósitos:', err);
      }
    },

    
    async buscarArticulo() {
      const termino = this.busqueda.trim();
      if (!termino) return;
      try {
        const data =await apiRequest(`https://stocksfback-production.up.railway.app/articulos/buscar?termino=${encodeURIComponent(termino)}`) 
        if (data.length === 1) {
          this.seleccionarArticulo(data[0]);
        } else {
          this.sugerencias = data;
          this.mostrarSugerencias = true;
        }
      } catch (err) {
        console.error(err);
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
    },
    /*
    async guardarMovimiento() {
      if (!this.TipoMovimiento || !this.IddepositosSeleccionado || this.articulos.length === 0) {
        alert('Faltan datos para guardar el movimiento');
        return;
      }
      try {
        const res = await fetch('http://localhost:3000/movimientos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            TipoMovimiento: this.TipoMovimiento,
            Prefijo: 1,
            IdDeposito: this.IddepositosSeleccionado,
            Articulos: this.articulos.map(a => ({ IdArticulo: a.IdArticulo, Cantidad: a.cantidad })),
          }),
        });
        if (!res.ok) throw new Error('Error al guardar movimiento');
        const data = await res.json();
        alert(`Movimiento guardado. Comprobante: ${data.Numero}`);
        this.articulos = [];
      } catch (err) {
        console.error(err);
        alert('Hubo un error al guardar el movimiento');
      }
    },*/

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
        await apiCreate('https://stocksfback-production.up.railway.app/movimientos',Movimiento);        
        alert(`Movimiento guardado`);
        this.articulos = [];
      } catch (err) {
        console.error(err);
        alert('Hubo un error al guardar el movimiento');
      }
    },
    async obtenerProximo() {
      try {
        const res = await fetch(`https://stocksfback-production.up.railway.app/movimientos/proximo-numero?TipoMovimiento=${this.TipoMovimiento}&Prefijo=1`);
        const data = await res.json();
        this.ProximoNumero = data.proximoNumero;
      } catch (err) {
        console.error(err);
      }
    },


  },
  mounted() {
    this.obtenerDepositos();
    this.obtenerProximo();
    apiRequest;
    apiCreate;  
  },
};
</script>
<style scoped >

</style>
