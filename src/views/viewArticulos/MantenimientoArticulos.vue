<template>
    <h1>Mantenimiento de articulos</h1>
      <v-btn color="primary">Botón de Vuetify</v-btn>

     <table class="tabla">
        <thead>
           <tr>
              <th>Eliminar</th>
              <th>Editar</th>              
              <th>Codigo Articulo</th>
              <th>Descripcion</th>
              <th>Codigo Barras</th>
              <th>Precio</th>
              <th>Costo</th>
              <th>Unidad de medida</th>
              <th>Grupo Articulo</th>
            </tr>          
        </thead>
        <tbody>
          <tr v-for="(articulo, index) in articulos" :key="articulo.IdArticulo">
            <td><button @click="eliminarArticulo(index)" class="eliminar">❌</button></td>
            <td><button @click="editarArticulo(index)">✏️</button></td>                      
            <td><input v-model="articulo.Codigo"></input></td>
            <td><input v-model="articulo.Descripcion"></input></td>
            <td>{{ articulo.Codigo_barra }}</td>
            <td>{{ articulo.Precio }}</td>
            <td>{{ articulo.Costo }}</td>
            <td>{{(articulo.Unidad_medida)}}</td>
            <td>{{articulo.IdGrupoArticulos}}</td> 
          </tr>
        </tbody>
        <tfoot>
          <tr>            
          </tr>
</tfoot>
    </table>
</template>
<script>

export default {
  data() {
    return {            
      Articulo: {
        IdArticulo: null,                
        codigo: '',
        descripcion: '',
        CodigoBarra: '',
        precio: 0,
        costo: 0,
        Unidad_medida:''
      },      
      articulos: [],
    };
},
methods: {

    async ListarArticulos() {
      try {
        const res = await fetch('http://localhost:3000/articulos/listar');
        const data = await res.json();
        this.articulos = data;
      } catch(error) {
        console.error('Error al listar articulos', error);
      }
    },
    eliminarArticulo(index) {
      console.log('Eliminar artículo', this.articulos[index]);
    },
    editarArticulo(index) {
      console.log('Editar artículo', this.articulos[index]);
    }
  },
  mounted() {
    this.ListarArticulos();
  }
};
</script>
<style>
h1{
    color: black;
    text-align: center;
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
.eliminar
{  
  background-color: rgb(255, 255, 255);
}

</style>