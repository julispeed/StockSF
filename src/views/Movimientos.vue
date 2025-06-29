<template>
   <div class="main-container"> 
    <div class="info">

        <form @submit.prevent="enviarFormulario" class="formventa">
            <label for="tipo">Tipo de Movimiento:</label>
              <select v-model="TipoMovimiento" id="tipo" required>                
                <option value="ING">Ingreso</option>
                <option value="EGR">Egreso</option>
                <option value="AJU">Ajuste</option>
                <option value="DEV">Devolución</option>
                <option value="REM">Remito</option>
                <option value="VEN">Venta</option>
              </select>     
        </form>
        
            <div class="numeracion">
                <p class="textoventa" ><strong>Comprobante:</strong> {{ 1 }}-{{ ProximoNumero }}</p>        
            </div>

            <div>              
              <label for="depositos"><strong>Deposito Origen:</strong></label>
              <select v-model="IddepositosSeleccionado" required>
              <option disabled value="">Seleccione un deposito</option>
              <option v-for="deposito in depositos" :key="deposito.IdDeposito" :value="deposito.IdDeposito">
              {{ deposito.Nombre }}
          </option>
        </select>
            </div>
    </div>
    
<div class="inputs">
    <label for="Articulos">Articulo: </label>
    <input
      name="Articulos"
      class="busqueda"
      type="text"
      placeholder="Buscar"
      v-model="busqueda"
      @keyup.enter="buscarArticulo"
    />    
</div>
<div v-if="mostrarSugerencias" class="sugerencias-overlay">
  <div class="sugerencias-box">
    <ul>
      <li v-for="item in sugerencias" :key="item.IdArticulo" @click="seleccionarArticulo(item)">
        <strong>{{ item.Codigo }}</strong> - {{ item.Descripcion }} - {{ item.Codigo_barra }}
     </li>
    </ul>
  </div>
</div>

<div v-if="mostrarCantidad" class="sugerencias-overlay">
  <div class="sugerencias-box">
    <h3>Ingrese cantidad para: {{ Articulo.descripcion }}</h3>
    <input 
      type="number" 
      placeholder="Cantidad" 
      v-model.number="cantidadTemporal"
      @keyup.enter="confirmarCantidad"
      min="1"
    />
    <button @click="confirmarCantidad">Aceptar</button>
  </div>
</div>


    <table class="tabla">
        <thead>
           <tr>
              <th>Acción</th>
              <th>Cantidad</th>
              <th>Codigo Articulo</th>
              <th>Descripcion</th>
              <th>Codigo Barras</th>
              <th>Precio</th>
              <th>Costo</th>
            </tr>          
        </thead>
        <tbody>
          <tr v-for="(articulo, index) in articulos" :key="index">
            <td>✔</td>
            <td>{{ articulo.cantidad }}</td>            
            <td>{{ articulo.codigo }}</td>
            <td>{{ articulo.descripcion }}</td>
            <td>{{ articulo.CodigoBarra }}</td>
            <td>{{ articulo.precio }}</td>
            <td>{{ articulo.costo }}</td>
          </tr>
        </tbody>
    </table>
    
      <div class="button-container">
        <button @click="guardarMovimiento">Guardar Movimiento</button>
      </div>
   </div>

</template>

<script>
export default {
  data() {
    return {
      TipoMovimiento: 'EGR',
      Comprobante: `1`,
      Articulo: {
        IdArticulo: null,        
        cantidad:'',
        codigo: '',
        descripcion: '',
        CodigoBarra: '',
        precio: 0,
        costo: 0
      },      
      articulos: [],
      depositos: [],
      IddepositosSeleccionado: '',
      busqueda: '',
      sugerencias: [],
      mostrarSugerencias: false,
      mostrarCantidad: false,
      cantidadTemporal: '',
      ProximoNumero:'',
    };
  },

  watch: {
  TipoMovimiento() {
    this.obtenerProximo();
  },
  Prefijo() {
    this.obtenerProximo();
  }
},

  methods: {
    async obtenerDepositos() {
      try {
        const res = await fetch('http://localhost:3000/depositos');
        this.depositos = await res.json();
      } catch (err) {
        console.error('Error al obtener depositos:', err);
      }
    },

    async buscarArticulo() {
      console.log("Buscar Articulo");
      const termino = this.busqueda.trim();

      if (!termino) {
        this.sugerencias = [];
        this.mostrarSugerencias=false;
        return;
      }
      try {
        const res = await fetch(`http://localhost:3000/articulos/buscar?termino=${encodeURIComponent(termino)}`);
        const data = await res.json();
          console.log(data);
        if (data.length === 0) {
          this.sugerencias = [];
          this.mostrarSugerencias=false;
          return;
        }

        this.sugerencias = data;
        this.mostrarSugerencias=true;

        } catch (err) {
          console.error("Error en la búsqueda:", err);
        }   
    },

    async guardarMovimiento() {
      console.log(this.TipoMovimiento);
       console.log("Id del depósito seleccionado:", this.IddepositosSeleccionado);
      console.log(this.articulos);
      if (!this.TipoMovimiento || !this.IddepositosSeleccionado || this.articulos.length === 0) {
        alert("Faltan datos para guardar el movimiento");
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
            Articulos: this.articulos.map(a => ({
              IdArticulo: a.IdArticulo,
              Cantidad: a.cantidad
            }))
          })
        });

        if (!res.ok) throw new Error("Error al guardar movimiento");

        const data = await res.json();
        alert(`Movimiento guardado. Comprobante: ${data.Numero}`);

        // Resetear
        this.articulos = [];
      } catch (err) {
        console.error("Error al guardar:", err);
        alert("Hubo un error al guardar el movimiento");
      }
    },
    seleccionarArticulo(articulo) {
  this.Articulo = {
    IdArticulo: articulo.IdArticulo,
    codigo: articulo.Codigo,
    descripcion: articulo.Descripcion,
    CodigoBarra: articulo.Codigo_barra,
    precio: articulo.Precio,
    costo: articulo.Costo        
  };

  this.mostrarSugerencias = false;
  this.mostrarCantidad = true;
  this.cantidadTemporal = ''; // limpiar input
  this.busqueda = '';
  this.sugerencias = [];
},


async obtenerProximo()
  {
    try {
      const res= await fetch(`http://localhost:3000/movimientos/proximo-numero?TipoMovimiento=${this.TipoMovimiento}&Prefijo=1`);
      const data=await res.json();      
      this.ProximoNumero=data.proximoNumero;
        }
    catch(err)
        {
          console.error("Error al obtener el numero",err);
        }
  },
confirmarCantidad() {
  if (!this.cantidadTemporal || this.cantidadTemporal <= 0) {
    alert("Debe ingresar una cantidad válida");
    return;
  }

  const articuloConCantidad = {
    ...this.Articulo,
    cantidad: this.cantidadTemporal
  };

  this.articulos.push(articuloConCantidad);

  // Reset
  this.Articulo = {
    IdArticulo: null,
    codigo: '',
    descripcion: '',
    CodigoBarra: '',
    precio: 0,
    costo: 0
  };
  this.cantidadTemporal = '';
  this.mostrarCantidad = false;
}

  },
  
  mounted() {
    this.obtenerDepositos();
    this.obtenerProximo();
  }
};
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.main-container {
  min-height: calc(100vh - 60px); /* Deja espacio para el footer */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 60px; /* Espacio para que el botón no tape el footer */
}

.textoventa
{
    font-size: 25px;    
}
.numeracion
{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.info
{
    background-color: #2c3e50;
    display: flex;
    align-items: center;     
    justify-content: space-between;
    position: relative;        
    padding:2%;
}
select
{    
    padding: 10px;
    background-color: #42b983;
    color: rgb(255, 255, 255);
    box-sizing: border-box;  
    width: auto;
    border-radius:10px;
    cursor: pointer;
}
.tabla
{
    border-collapse: collapse;
    width: 100%;
    border: 2px;
    table-layout: fixed; 
}
.tabla th, .tabla td
{
    border: 1px solid;
    color: black;
    text-align: center;
}

.sugerencias-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.sugerencias-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
}

.sugerencias-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sugerencias-box li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.sugerencias-box li:hover {
  background-color: #f0f0f0;
}
.busqeda
{
  display: flex;
  align-items: center;
  justify-content: center;
}
.inputs {
  display: flex; 
  justify-content: center;
  align-items: center; 
  width: 100%;   
  color: black;
}


.button-container {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  margin-bottom: 20px; 
}
button
{
  padding: 10px;
  background-color: #42b983;
  color: black;
  font-family:sans-serif;  
  border: none;
  border-radius: 10px;
  cursor: pointer;    
}


</style>