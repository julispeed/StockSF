<template>
<v-card class="w-100">
  <v-tabs
    v-model="tab"
    bg-color="primary"
    grow
    class="justify-center"
  >
    <v-tab value="one">Crear Depósito</v-tab>
    <v-tab value="two">Mantenimiento de depósitos</v-tab>        
  </v-tabs>

  <v-card-text>
    <v-tabs-window v-model="tab"> 
      <v-tabs-window-item value="one">
          <div class="main-container">
    <h1>DEPOSITO</h1>

      <div class="error" >
        <p v-if="errorDeposito" class="error-mensaje"><strong>{{ errorDeposito }}</strong></p>
      </div>

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
      </v-tabs-window-item>
      <v-tabs-window-item value="two">
        <h1>Contenido 2</h1>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card-text>
</v-card>
</template>

<script>
import { toHandlerKey } from 'vue';

export default {
  data() {
    return {
      tab:'one',
      Nombre: '',
      Descripcion:'',
      errorDeposito:'',      
    };
  },
  methods: {
    async crearDeposito()    
    {
      this.errorDeposito='';
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
      if (!res.ok){
          const errorData= await res.json().catch(()=>null);
          const mensaje= errorData?.message;
          throw new Error (mensaje);
      }
        alert('Deposito Creado exitosamente');
      } catch (err) {
        alert('Error al insertar Deposito');
        this.errorDeposito=err.message;
        console.error(err);
      }
    
    }
  },
};
</script>
<!--

<template>
  <div class="main-container">
    <h1>DEPOSITO</h1>

      <div class="error" >
        <p v-if="errorDeposito" class="error-mensaje"><strong>{{ errorDeposito }}</strong></p>
      </div>

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
import { toHandlerKey } from 'vue';

export default {
  data() {
    return {
      Nombre: '',
      Descripcion:'',
      errorDeposito:'',      
    };
  },
  methods: {
    async crearDeposito()    
    {
      this.errorDeposito='';
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
      if (!res.ok){
          const errorData= await res.json().catch(()=>null);
          const mensaje= errorData?.message;
          throw new Error (mensaje);
      }
        alert('Deposito Creado exitosamente');
      } catch (err) {
        alert('Error al insertar Deposito');
        this.errorDeposito=err.message;
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
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 60px;
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

.error-mensaje
{
  text-align:  center;
  color: #2c3e50;
  font-family: 'Courier New', Courier, monospace;  
  font-size: 20px;
}
.error
{
  background-color: #42b983;
}
</style>
-->

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.main-container {
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 60px;
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

.error-mensaje
{
  text-align:  center;
  color: #2c3e50;
  font-family: 'Courier New', Courier, monospace;  
  font-size: 20px;
}
.error
{
  background-color: #42b983;
}


</style>

