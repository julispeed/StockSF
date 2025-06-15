<template>
  <h1>ARTICULOS</h1>
  <div class="fondo">
    <form @submit.prevent="crearArticulo" class="formArticulo">
      <label for="DescripcionArticulo"><Strong>Descripción</Strong></label>
      <input type="text" name="DescripcionArticulo" v-model="Descripcion" id="Descripcion" required />

      <label for="UnidadMedida"><strong>Unidad de medida</strong></label>
      <select id="UnidadMedida" name="UnidadMedida" v-model="UnidadMedida">
        <option>gramos</option>
        <option>Litros</option>
        <option>Unidad</option>
      </select>

      <label for="CodigoBarra"><strong>Código de barra</strong></label>
      <input type="text" name="CodigoBarra" v-model="CodigoBarra" id="CodigoBarra" />

      <label for="Codigo"><strong>Código</strong></label>
      <input type="text" name="Codigo" v-model="Codigo" id="Codigo" />

      <label for="Precio"><strong>Precio</strong></label>
      <input type="number" name="Precio" v-model="Precio" id="Precio" step="any" />

      <label for="Costo"><strong>Costo</strong></label>
      <input type="number" name="Costo" v-model="Costo" id="Costo" step="any" />

      <label for="grupos"><strong>Grupos</strong></label>
      <select v-model="IdGrupoSeleccionado" required>
        <option disabled value="">Seleccione un grupo</option>
        <option v-for="grupo in grupos" :key="grupo.IdGrupoArticulo" :value="grupo.IdGrupoArticulo">
          {{ grupo.Nombre }}
        </option>
      </select>
      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Descripcion: '',
      UnidadMedida: 'gramos',
      CodigoBarra: '',
      Codigo: '',
      Precio: '',
      Costo: '',
      IdGrupoSeleccionado: '',
      grupos: [] 
    };
  },
  methods: {
    async crearArticulo()
    {
      try {
      const res= await fetch('http://localhost:3000/articulos',
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify
        ({
          descripcion:this.Descripcion,
          unidad_medida:this.UnidadMedida,
          codigoBarra:this.CodigoBarra,
          codigo:this.Codigo,
          precio:this.Precio,
          costo:this.Costo,
          IdGrupoArticulo: this.IdGrupoSeleccionado 
        })
      })
      if (!res.ok) throw new Error('Error al insertar');
        alert('Articulo Creado exitosamente');
      } catch (err) {
        alert('Error al insertar articulo');
        console.error(err);
      }
    
    },
      async obtenerGrupos() {
      try {
        const res = await fetch('http://localhost:3000/grupos');
        this.grupos = await res.json();
      } catch (err) {
        console.error('Error al obtener grupos:', err);
      }
    },  
      
  },
  mounted() {
      this.obtenerGrupos();
    }  
};
</script>

<style scoped>
h1
{
    text-align: center;
    font-family: sans-serif;
    color: black;
}
input , select
{
    background-color: #2c3e50;
}
.fondo {
  display: flex;
  justify-content: center;
  align-items: center;    
}

.formArticulo {
    margin: 1%;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color:  #42b983;;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.formArticulo label,
.formArticulo input,
.formArticulo select {
  margin-bottom: 15px;
  color: #fff;
  font-size: 14px;
}

.formArticulo input,
.formArticulo select {
  padding: 20px;
  border-radius: 4px;
  border: none;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 40%;
  align-self: center; 
}
.formArticulo label {
  color: rgb(0, 0, 0); 
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
}
</style>
