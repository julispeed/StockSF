<template>
  <div class="main-container">
    <h1>DEPOSITO</h1>
  <div class="fondo">    
    <form @submit.prevent="crearDeposito" class="formDeposito">
        <label for="Nombre"><Strong>Nombre</Strong></label>
        <input type="text" name="Nombre" v-model="Nombre" id="nombre" required />      
        <label for="Descripcion"><Strong>Descripcion</Strong></label>
        <input type="text" name="Descripcion" v-model="Descripcion" id="Descripcion" required />      
        <button type="submit">Crear</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      Nombre: '',
      Descripcion:''      
    };
  },
  methods: {
    async crearDeposito()
    {
      try {
      const res= await fetch('http://localhost:3000/depositos',
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify
        ({
          Nombre:this.Nombre,
          Descripcion:this.Descripcion
        })
      })
      if (!res.ok) throw new Error('Error al insertar');
        alert('Deposito Creado exitosamente');
      } catch (err) {
        alert('Error al insertar Deposito');
        console.error(err);
      }
    
    }
  },
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

.formDeposito {
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

.formDeposito label,
.formDeposito input,
.formDeposito select {
  margin-bottom: 15px;
  color: #fff;
  font-size: 14px;
}

.formDeposito input,
.formDeposito select {
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
.formDeposito label {
  color: rgb(0, 0, 0); 
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
}
</style>
