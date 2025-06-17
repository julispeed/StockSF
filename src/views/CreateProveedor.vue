<template>
  <h1>PROVEEDOR</h1>
  <div class="fondo">
    <form @submit.prevent="crearProveedor" class="formProveedor">
      <label for="RazonSocial"><Strong>Razon Social</Strong></label>
      <input type="text" name="RazonSocial" v-model="Descripcion" id="Descripcion" required />

      <label for="Codigo"><strong>Código</strong></label>
      <input type="text" name="Codigo" v-model="Codigo" id="Codigo" />

      <label for="Direccion"><strong>Dirección</strong></label>
      <input type="text" name="Direccion" v-model="Direccion" id="Direccion" />

      <label for="CondicionIVA"><strong>Condicion IVA</strong></label>
      <select id="CondicionIVA" name="CondicionIVA" v-model="CondicionIVA">
        <option>Responsable Inscripto</option>
        <option>Monotributista</option>
        <option>Exento</option>
      </select>

      <label for="telefono"><strong>Teléfono</strong></label>
      <input type="number" name="telefono" v-model="telefono" id="telefono" step="any" />

      <label for="CBU"><strong>CBU</strong></label>
      <input type="number" name="CBU" v-model="CBU" id="CBU" step="any" />

      <label for="correo"><strong>Correo</strong></label>
      <input type="text" name="correo" v-model="correo" id="correo" step="any" />

      <label for="descripcion"><strong>Descripcion</strong></label>
      <input type="text" name="descripcion" v-model="descripcion" id="descripcion" step="any" />

      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Descripcion: '',
      CondicionIVA: 'gramos',
      Direccion: '',
      Codigo: '',
      telefono: '',
      CBU: '',
      IdGrupoSeleccionado: '',
      grupos: [] 
    };
  },
  methods: {
    async crearProveedor()
    {
      try {
      const res= await fetch('http://localhost:3000/articulos',
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify
        ({
          descripcion:this.Descripcion,
          unidad_medida:this.CondicionIVA,
          Direccion:this.Direccion,
          codigo:this.Codigo,
          telefono:this.telefono,
          CBU:this.CBU,
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

.formProveedor {
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

.formProveedor label,
.formProveedor input,
.formProveedor select {
  margin-bottom: 15px;
  color: #fff;
  font-size: 14px;
}

.formProveedor input,
.formProveedor select {
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
.formProveedor label {
  color: rgb(0, 0, 0); 
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
}
</style>
