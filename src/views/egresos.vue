<template>
    <div class="info">

        <form @submit.prevent="enviarFormulario" class="formventa">
            <label for="tipo" class="textoventa">Tipo de egreso:</label>
            <select id="tipo" v-model="tipoSeleccionado">        
                <option value="venta">Venta</option>
                <option value="devolucion">Devolución</option>
                <option value="baja">Baja</option>
            </select>        
        </form>
            <div class="numeracion">
                <p class="textoventa"><strong>Comprobante:</strong> {{ 1 }}-{{ 1 }}</p>        
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
        tipoSeleccionado:'venta',
      Articulo: {
        cantidad: 1,
        codigo: '',
        descripcion: '',
        precio: 0,
        costo: 0
      },
      articulos: []
    };
  },
  methods: {
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
    }
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