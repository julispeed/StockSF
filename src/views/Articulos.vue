<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="one">Crear Artículo</v-tab>
      <v-tab value="two">Crear Grupo</v-tab>
      <v-tab value="three">Crear Familia</v-tab>
      <v-tab value="four">Mantenimiento de Articulos</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">        
        <v-tabs-window-item value="one">
          <div class="main-container">
            <h1>ARTÍCULOS</h1>
            <div class="error" v-if="errorArticulo">
              <p class="error-mensaje"><strong>{{ errorArticulo }}</strong></p>
          </div>
          <div class="fondo">
              <form @submit.prevent="crearArticulo" class="formulario">
                <label><strong>Descripción</strong></label>
                <input type="text" v-model="DescripcionArticulo" required />

                <label><strong>Unidad de medida</strong></label>
                <select v-model="UnidadMedida">
                  <option>gramos</option>
                  <option>litros</option>
                  <option>unidad</option>
                </select>

                <label><strong>Código de barra</strong></label>
                <input type="text" v-model="CodigoBarra" />

                <label><strong>Código</strong></label>
                <input type="text" v-model="CodigoArticulo" />

                <label><strong>Precio</strong></label>
                <input type="number" v-model="Precio" step="any" />

                <label><strong>Costo</strong></label>
                <input type="number" v-model="Costo" step="any" />

                <label><strong>Grupo</strong></label>
                <select v-model="IdGrupoSeleccionado" required>
                  <option disabled value="">Seleccione un grupo</option>
                  <option v-for="grupo in grupos" :key="grupo.IdGrupoArticulo" :value="grupo.IdGrupoArticulo">
                    {{ grupo.Nombre }}
                  </option>
                </select>

                <button type="submit">Crear</button>
              </form>
            </div>
          </div>
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
<v-tabs-window-item value="four">
  <v-card flat>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title class="text-h5">
        MANTENIMIENTO DE ARTÍCULOS
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
        class="search-field"
      ></v-text-field>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="articulos"
      :items-per-page="10"
      :search="search"            
      class="elevation-1"
      :footer-props="{
        'items-per-page-options': [10, 20, 50],
        'items-per-page-text': 'Artículos por página:'
      }"
    >
      <template v-slot:item.precio="{ item }">
        {{ formatCurrency(item.precio) }}
      </template>
      
      <template v-slot:item.costo="{ item }">
        {{ formatCurrency(item.costo) }}
      </template>

      <template v-slot:item.acciones="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon 
              color="blue" 
              v-bind="attrs"
              v-on="on"
              @click="editarArticulo(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Editar artículo</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon 
              color="red" 
              v-bind="attrs"
              v-on="on"
              @click="eliminarArticulo(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar artículo</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: "one",
    
    // Artículo
      DescripcionArticulo: '',
      UnidadMedida: 'gramos',
      CodigoBarra: '',
      CodigoArticulo: '',
      Precio: '',
      Costo: '',
      IdGrupoSeleccionado: '',
      grupos: [] ,
      errorArticulo: '',
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
    articuloEditando: {}
  }),
  methods: {    
    async crearArticulo()
    {
      this.errorArticulo = '';
      try {
      const res= await fetch('http://localhost:3000/articulos/crear',
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify
        ({
          descripcion:this.DescripcionArticulo,
          unidad_medida:this.UnidadMedida,
          codigoBarra:this.codigoBarra,
          codigo:this.CodigoArticulo,
          precio:this.Precio,
          costo:this.Costo,
          IdGrupoArticulo: this.IdGrupoSeleccionado 
        })
      })
      if (!res.ok) {      
      const errorData = await res.json().catch(() => null);
      const mensaje = errorData?.message;      
      throw new Error(mensaje);      
      }
    alert("Articulo creado exitosamente");
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
    const response = await fetch('http://localhost:3000/articulos/listar');
    
    if (!response.ok) {
      throw new Error('Error al obtener los artículos');
    }
    
    const articulosData = await response.json();        
    this.articulos = articulosData.map(articulo => ({
      ...articulo,
      precio: articulo.precio ? parseFloat(articulo.precio) : 0,
      costo: articulo.costo ? parseFloat(articulo.costo) : 0
    }));
    
  } catch(err) {
    console.error('Error al obtener artículos:', err);
    this.articulos = [];     
    this.errorArticulo = 'No se pudieron cargar los artículos';
  }
},
    async eliminarArticulo()
    {

    },
    async editarArticulo()
    {

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
      mounted() {
      this.obtenerGrupos();
      this.obtenerFamilias();      
    },
  watch: {
    tab(newVal) {
    if (newVal === 'four') { // Cuando se active la pestaña de mantenimiento
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
