<template>
  <v-card >
    <v-tabs v-model="tab" bg-color="primary" >
      <v-tab value="one">Crear Artículo</v-tab>
      <v-tab value="two">Crear Grupo</v-tab>
      <v-tab value="three">Crear Familia</v-tab>      
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">  
        
        <v-tabs-window-item value="one">
  <v-card>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Gestión de Artículos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="secondary"  @click="editarArticulo(item)">Nuevo Artículo</v-btn>
    </v-toolbar>

    <!-- Tabla de artículos -->
    <v-data-table
      :headers="headers"
      :items="articulos"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.precio="{ item }">
        {{ formatCurrency(item.Precio) }}
      </template>
      <template v-slot:item.costo="{ item }">
        {{ formatCurrency(item.Costo) }}
      </template>
      <template v-slot:item.acciones="{ item }">
        <v-btn icon small color="blue" @click="editarArticulo(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="red" @click="eliminarArticulo(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Diálogo de crear/editar -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ editando ? 'Editar' : 'Nuevo' }} Artículo</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Descripción" v-model="articuloEditando.Descripcion" required></v-text-field>
            <v-select
              label="Unidad de Medida"
              :items="['gramos', 'litros', 'unidad']"
              v-model="articuloEditando.Unidad_medida"
              required
            ></v-select>
            <v-text-field label="Código de Barra" v-model="articuloEditando.Codigo_barra"></v-text-field>
            <v-text-field label="Código" v-model="articuloEditando.Codigo"></v-text-field>
            <v-text-field label="Precio" type="number" v-model="articuloEditando.Precio"></v-text-field>
            <v-text-field label="Costo" type="number" v-model="articuloEditando.Costo"></v-text-field>
            <v-select
              label="Grupo"
              :items="grupos"
              item-text="Nombre"
              item-value="IdGrupoArticulo"
              v-model="articuloEditando.IdGrupoArticulos"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green" text @click="Ejecutar()">
            {{ editando ? 'Actualizar' : 'Crear' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  
</v-tabs-window-item>
                      <!-- TAB GRUPOS -->
        <v-tabs-window-item value="two">
          <div class="main-container">
            <h1>GRUPOS</h1>
            <div class="error" v-if="errorGrupo">
              <p class="error-mensaje"><strong>{{ errorGrupo }}</strong></p>
            </div>
            <div class="fondo">
              <form @submit.prevent="crearGrupo" class="formulario">
                <label><strong>Nombre</strong></label>
                <input type="text" v-model="NombreGrupo" required />

                <label><strong>Descripción</strong></label>
                <input type="text" v-model="DescripcionGrupo" required />

                <label><strong>Familia</strong></label>
                <select v-model="IdFamiliaSeleccionada" required>
                  <option disabled value="">Seleccione una familia</option>
                  <option v-for="familia in familias" :key="familia.IdFamilia" :value="familia.IdFamilia">
                    {{ familia.Nombre }}
                  </option>
                </select>

                <button type="submit">Crear</button>
              </form>
            </div>
          </div>
        </v-tabs-window-item>

        <!-- TAB FAMILIAS -->
        <v-tabs-window-item value="three">
          <div class="main-container">
            <h1>FAMILIAS</h1>
            <div class="error" v-if="errorFamilia">
              <p class="error-mensaje"><strong>{{ errorFamilia }}</strong></p>
            </div>
            <div class="fondo">
              <form @submit.prevent="crearFamilia" class="formulario">
                <label><strong>Nombre</strong></label>
                <input type="text" v-model="NombreFamilia" required />

                <label><strong>Descripción</strong></label>
                <input type="text" v-model="DescripcionFamilia" required />

                <button type="submit">Crear</button>
              </form>
            </div>
          </div>
        </v-tabs-window-item>
        <!-- TAB MANTENIMIENTO DE ARTICULOS -->
         

      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: "one",
    editando:true,
    // Grupo
    NombreGrupo: "",
    DescripcionGrupo: "",
    IdFamiliaSeleccionada: "",
    familias: [],
    errorGrupo: "",
    // Familia
       NombreFamilia: '',
      Descripcion:'' ,
      errorFamilia:'',
      //MANTENIMIENTOS
  search: '',
  headers: [
    { text: 'Código', value: 'Codigo', width: '120px' , class: 'header-text' },
    { text: 'Descripción', value: 'Descripcion',width: '120px' },
    { text: 'Unidad de medida', value: 'Unidad_medida', width: '100px' },
    { text: 'Codigo de Barra', value: 'Codigo_barra', width: '100px' },
    { text: 'Precio', value: 'Precio', width: '120px', align: 'right' },
    { text: 'Costo', value: 'Costo', width: '120px', align: 'right' },
    { text: 'Grupo de Articulos', value: 'IdGrupoArticulos', width: '120px', align: 'right' },
    { text: 'Acciones', value: 'acciones', width: '150px', sortable: false }
  ],
    articulos: [], 
    dialog: false,
    articuloEditando: {
    IdArticulo: null,
    Descripcion: '',
    Unidad_medida: '',
    Codigo_barra: '',
    Codigo: '',
    Precio: 0,
    Costo: 0,
    IdGrupoArticulos: ''
  }
  }),
  methods: {    
    async crearArticulo()
    {
      this.errorArticulo = '';
      try {
        console.log(this.articuloEditando)
        const res= await fetch('http://localhost:3000/articulos/crear',
        {
        
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          Descripcion: this.articuloEditando.Descripcion,
          Unidad_medida: this.articuloEditando.Unidad_medida,
          Codigo_barra: this.articuloEditando.Codigo_barra,
          Codigo: this.articuloEditando.Codigo,
          Precio: this.articuloEditando.Precio, 
          Costo: this.articuloEditando.Costo,
          IdGrupoArticulos: this.articuloEditando.IdGrupoArticulos
          })
        })
        if (!res.ok) {      
          const errorData = await res.json().catch(() => null);
          const mensaje = errorData?.message;      
          throw new Error(mensaje);      
        }
        alert("Articulo creado exitosamente");
        this.dialog=false;
        this.obtenerArticulos();
      } catch (err) {
        alert('Error al insertar articulo');
        this.errorArticulo = err.message;
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
      
    async crearFamilia()
    {
      this.errorFamilia='';
      try {
      const res= await fetch('http://localhost:3000/familias',
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify
        ({
          Nombre:this.NombreFamilia,
          Descripcion:this.Descripcion
        })
      })
      if (!res.ok){
        const errorData= await res.json().catch(()=> null);
        const mensaje= errorData?.message;
        throw new Error (mensaje);
      }
        alert('Familia Creado exitosamente');
        this.dialog = false;
      } catch (err) {
        alert('Error al insertar Familia');
        this.errorFamilia=err.message;
        console.error(err);
      }
      
    },
     async crearGrupo() {
      this.errorGrupo='';
      try {
        const res = await fetch('http://localhost:3000/grupos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Nombre: this.NombreGrupo,
            Descripcion: this.DescripcionGrupo,
            IdFamilia: this.IdFamiliaSeleccionada  
          })
        });

        if (!res.ok) {
          const errorData = await res.json().catch(()=> null);
          const mensaje = errorData?.message;
          throw new Error (mensaje);
        }
        alert("Grupo creado exitosamente")
      } catch (err) {
        alert('Error al insertar grupo');
        this.errorGrupo=err.message;
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
    },
  async obtenerArticulos() {
  try {
    this.articulos=[];
    const response = await fetch('http://localhost:3000/articulos/listar');
    
    if (!response.ok) {
      throw new Error('Error al obtener los artículos');
    }
    
    const articulosData = await response.json();        
    this.articulos = articulosData.map(articulo => ({
      ...articulo,
      precio: articulo.precio ? parseFloat(articulo.Precio) : 0,
      costo: articulo.costo ? parseFloat(articulo.Costo) : 0
    }));
    
  } catch(err) {
    console.error('Error al obtener artículos:', err);
    this.articulos = [];     
    this.errorArticulo = 'No se pudieron cargar los artículos';
  }
    },
async eliminarArticulo(item) {  
  if (!confirm('¿Seguro que quieres eliminar este artículo?')) return;

  try {
    const res = await fetch(`http://localhost:3000/articulos/eliminar/${item.IdArticulo}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Error al eliminar el artículo');

    const data = await res.json();
    alert(data.message || "Artículo eliminado");
    this.obtenerArticulos();
  } catch (err) {
    console.error(err);
    alert('No se pudo eliminar el artículo');
  }
},
    editarArticulo(item) {  
      if (!item)
      {        
        this.editando=false;
            this.articuloEditando= {
            Descripcion: '',
            Unidad_medida: '' ,
            Codigo_barra: '',
            Codigo: '',
            Precio: 0,
            Costo: 0,
            IdGrupoArticulos: ''
          }
        this.dialog = true;
      }
      else{        
        this.editando=true;
        this.articuloEditando = { ...item };
        this.dialog = true;
      }
    },
async Ejecutar()
{
  if (this.editando)
  {        
        this.guardarEdicion();
  }
  else 
  {    
        this.crearArticulo();
  }
},
    async guardarEdicion() {
      try {        
          if (!confirm('¿Seguro que quieres eliminar este artículo?')) return;
            const res = await fetch(`http://localhost:3000/articulos/actualizar/${this.articuloEditando.IdArticulo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Descripcion: this.articuloEditando.Descripcion,
              Unidad_medida: this.articuloEditando.Unidad_medida,
              Codigo_barra: this.articuloEditando.Codigo_barra,
              Codigo: this.articuloEditando.Codigo,
              Precio: this.articuloEditando.Precio, 
              Costo: this.articuloEditando.Costo,
              IdGrupoArticulos: this.articuloEditando.IdGrupoArticulos
          })
            });  
        if (!res.ok) {
          const errorData = await res.json().catch(() => null); 
          throw new Error(errorData?.message || 'Error al actualizar el artículo');
          }

          alert('Artículo actualizado con éxito');
          this.dialog = false;
          this.obtenerArticulos();           
  } catch (err) {
    console.error(err);
    alert('No se pudo actualizar el artículo: ' + err.message);
  }
},
formatCurrency(value) {
  // Verificar si el valor es numérico o convertible a número
  const numberValue = parseFloat(value);
  
  // Si no es un número válido o es NaN, devolver cadena vacía o símbolo de moneda sin valor
  if (isNaN(numberValue)) {
    return '$ -'; // O puedes devolver 'N/A' o similar
  }
  
  // Formatear el número válido
  return '$' + numberValue.toFixed(2);
}
    
  },  
    mounted() 
    {
      this.obtenerGrupos();
      this.obtenerFamilias();
      this.obtenerArticulos();
    },
  watch: {
    tab(newVal) {
    if (newVal === 'four') { 
      this.obtenerArticulos();
    }
    },
  }}
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
  padding-bottom: 60px;
}

h1 {
  text-align: center;
  font-family: sans-serif;
  color: black;
}

.fondo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.formulario {
  margin: 1%;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding: 25px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #42b983;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.formulario label {
  color: black;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
}

.formulario input,
.formulario select {
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 4px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 15px;
  color: white;
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

.error {
  background-color: #42b983;
}

.error-mensaje {
  text-align: center;
  color: #2c3e50;
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
}

</style>