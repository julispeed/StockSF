<template>
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
                <p class="textoventa"><strong>Comprobante:</strong> {{ 1 }}-{{ 1 }}</p>        
            </div>

            <div>              
              <label for="depositos"><strong>Deposito Origen:</strong></label>
              <select v-model="IddepositosSeleccionado" required>
              <option disabled value="">Seleccione un deposito</option>
              <option v-for="depositos in depositos" :key="depositos.Iddepositos" :value="depositos.Iddepositos">
              {{ depositos.Nombre }}
          </option>
        </select>
            </div>
    </div>

    <table class="tabla">
        <thead>
            <tr>
                <th>buscar</th>
                <th>Cantidad</th>
                <th>Codigo Articulo</th>
                <th>Descripcion</th>
                <th>Codigo Barras</th>
                <th>Precio</th>
                <th>costo</th>
            </tr>
              <tr>
            <td><button @click="agregarArticulo">Buscar</button></td>
            <td><input v-model.number="Articulo.cantidad" type="number" min="1" /></td>
            <td><input v-model="Articulo.codigo" /></td>
            <td><input v-model="Articulo.descripcion" /></td>
            <td><input v-model="Articulo.CodigoBarra"></td>
            <td>{{ Articulo.precio}}</td>
            <td>{{ Articulo.costo}}</td>          
        </tr>
        </thead>
        <tbody>
          <tr v-for="(articulo, index) in articulos" :key="index">
          <td>{{ articulo.cantidad }}</td>
          <td>{{ articulo.codigo }}</td>
          <td>{{ articulo.descripcion }}</td>                  
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  data() {
    return {
        TipoMovimiento:'Egreso',
        Comprobante:`1`,
        Articulo: {
        cantidad: 1,
        codigo: '',
        descripcion: '',
        precio: 0,
        costo: 0
      },
      articulos: [],
      depositos: [],
      IddepositosSeleccionado:''
    };
  },
  methods: {
    async obtenerDepositos()
    {
      try {
        const res = await fetch('http://localhost:3000/depositos');
        this.depositos = await res.json();
      } catch (err) {
        console.error('Error al obtener depositos:', err);
      }
    },
/*
    agregarArticulo() {
      if (this.Articulo.codigo && this.Articulo.descripcion) {
        this.articulos.push({ ...this.Articulo });        
        this.oArticulo = {
          cantidad: 1,
          codigo: '',
          descripcion: '',
          precio: 0,
          costo: 0
        };
      } else {
        alert('Me falta laburar');
      }
    }*/
  },
  mounted() {
  this.obtenerDepositos();
}
};


</script>

<style scoped>
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
</style>