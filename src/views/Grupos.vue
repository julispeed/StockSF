<template>
    <h1>GRUPOS</h1>
  <div class="fondo">    
    <form @submit.prevent="crearGrupo" class="formGrupo">
        <label for="Nombre"><Strong>Nombre</Strong></label>
        <input type="text" name="Nombre" v-model="Nombre" id="nombre" required />      
        <label for="Descripcion"><Strong>Descripcion</Strong></label>
        <input type="text" name="Descripcion" v-model="Descripcion" id="Descripcion" required />      
        <label for="familia"><strong>Familia</strong></label>
        <select v-model="IdFamiliaSeleccionada" required>
          <option disabled value="">Seleccione una familia</option>
          <option v-for="familia in familias" :key="familia.IdFamilia" :value="familia.IdFamilia">
            {{ familia.Nombre }}
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
      Nombre: '',
      Descripcion: '',
      IdFamiliaSeleccionada: '',
      familias: [] 
    };
  },
  methods: {
    async crearGrupo() {
      try {
        const res = await fetch('http://localhost:3000/grupos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Nombre: this.Nombre,
            Descripcion: this.Descripcion,
            IdFamilia: this.IdFamiliaSeleccionada  
          })
        });

        if (!res.ok) throw new Error('Error al insertar');
        alert('Grupo creado exitosamente');
      } catch (err) {
        alert('Error al insertar grupo');
        console.error(err);
      }
    },

    async obtenerFamilias() {
      try {
        const res = await fetch('http://localhost:3000/familias');
        this.familias = await res.json();
      } catch (err) {
        console.error('Error al obtener familias:', err);
      }
    }
  },
  mounted() {
    this.obtenerFamilias();
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

.formGrupo {
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

.formGrupo label,
.formGrupo input,
.formGrupo select {
  margin-bottom: 15px;
  color: #fff;
  font-size: 14px;
}

.formGrupo input,
.formGrupo select {
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
.formGrupo label {
  color: rgb(0, 0, 0); 
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
}
</style>
