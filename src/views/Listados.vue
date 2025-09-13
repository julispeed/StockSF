<template>
  <v-card >
    <v-tabs v-model="tab" bg-color="light-blue-darken-4" >
      <v-tab value="one">Stocks Artículos</v-tab>
      <v-tab value="two">Stocks por Grupo</v-tab>
      <v-tab value="three">Stock por Familias</v-tab>      
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">  
        
        <v-tabs-window-item value="one">
          <v-card>
            <v-toolbar color="light-blue-darken-4" dark flat>
              <v-toolbar-title>Stock de Artículos</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>              
            </v-toolbar>

    <!-- Tabla de artículos -->
            <v-data-table
              :headers="headersArticulos"
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
            </v-data-table>
    </v-card>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <v-card>
            <v-toolbar color="light-blue-darken-4" dark flat>
              <v-toolbar-title>Gestión de Grupos</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field> 
            </v-toolbar>
          </v-card> 

            <v-data-table
              :headers="headersGrupos"
              :items="grupos"
              :search="search"
              class="elevation-1"
            >                                        
            </v-data-table>            
          
        </v-tabs-window-item>
        <!-- TAB FAMILIAS -->
        <v-tabs-window-item value="three">
          <v-card>
            <v-toolbar color="light-blue-darken-4" dark flat>
              <v-toolbar-title>Gestión de Familias</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>              
            </v-toolbar>
          </v-card> 

            <v-data-table
              :headers="headersFamilia"
              :items="familias"
              :search="search"
              class="elevation-1"
            >                          
            </v-data-table>          
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
import { apiRequest, apiCreate, apiUpdate, apiDelete } from '@/../utils/api'
export default {
  data: () => ({
    tab: "one",
    editando:true,
    search: '',
  
  
headersArticulos: [
  { text: 'Código', value: 'Codigo', width: '120px' },
  { text: 'Descripción', value: 'Descripcion', width: '120px' },
  { text: 'Unidad de medida', value: 'Unidad_medida', width: '100px' },  
  { text: 'Precio', value: 'Precio', width: '120px', align: 'right' },
  { text: 'Costo', value: 'Costo', width: '120px', align: 'right' },
  { text: 'Grupo de Articulos', value: 'IdGrupoArticulo', width: '120px', align: 'right' },
  { text: 'Acciones', value: 'acciones', width: '150px', sortable: false },
  { text: 'Stock', value: 'StockActual', width: '100px', align: 'right' }, 
],
  articulos: [],

  headersGrupos: [
  { text: 'Nombre', value: 'Nombre', width: '120px' , class: 'header-text'  },
  { text: 'Descripcion', value: 'Descripcion',width: '120px' },
  { text: 'Acciones', value: 'acciones', width: '150px', sortable: false }
  ], 
  grupos:[],
  gruposEditando : 
  {
    IdGrupoArticulo:null,
    Nombre:'',
    Descripcion:'',
    IdFamilia:''
  },
  dialogGR: false,            

   headersFamilia: [
  { text: 'Nombre', value: 'Nombre', width: '120px' , class: 'header-text'  },
  { text: 'Descripcion', value: 'Descripcion',width: '120px' } ,
  { text: 'Acciones', value: 'acciones', width: '150px', sortable: false }
  ],
  familias:[],
  familiaseditando :
  {
    IdFamilia:null,
    Nombre:'',
    Descripcion:''
  },
  dialogF:false,
  }),

  methods: {    
    //get
    async obtenerArticulosStock() { 
      this.articulos = await apiRequest('https://stocksfback-production.up.railway.app/stocks/stockArticulos') 
    },    

    async obtenerGrupos() { 
      this.grupos = await apiRequest('https://stocksfback-production.up.railway.app/grupos');
    },
    async obtenerFamilias() {
     this.familias = await apiRequest('https://stocksfback-production.up.railway.app/familias');
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
      this.obtenerArticulosStock();
      apiRequest;      
    },
  watch: {
    tab(newVal) {
    if (newVal === 'four') { 
      this.obtenerArticulosStock();
    }
    },
  }
}
</script>
