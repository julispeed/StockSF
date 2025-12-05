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
              :pagination="false"
              hide-default-footer
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
              :pagination="false"
              hide-default-footer
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
              :pagination="false"
              hide-default-footer
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
      { title: 'Código', key: 'Codigo', width: '120px' , class: 'header-text' },
      { title: 'Descripción', key: 'Descripcion',width: '120px' },
      { title: 'Unidad de medida', key: 'Unidad_medida', width: '100px' },
      { title: 'Codigo de Barra', key: 'Codigo_barra', width: '100px' },
      { title: 'Precio', key: 'Precio', width: '120px', align: 'right' },
      { title: 'Costo', key: 'Costo', width: '120px', align: 'right' },
      { title: 'Grupo', key: 'GrupoNombre', width: '150px', align: 'right' },
      { title: 'Stock', key: 'StockActual', width: '100px', align: 'right' }
],
  articulos: [],

  headersGrupos: [
  { title: 'Nombre', value: 'Nombre', width: '120px' , class: 'header-text'  },
  { title: 'Descripcion', value: 'Descripcion',width: '120px' },
  { title: 'Familia', value: 'FamiliaNombre',width: '120px' },

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
  { title: 'Nombre', value: 'Nombre', width: '120px' , class: 'header-text'  },
  { title: 'Descripcion', value: 'Descripcion',width: '120px' } 
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

 async obtenerArticulos() { 
  const articulosAPI = await apiRequest('http://localhost:3000/stocks/stockArticulos');
  this.articulos = articulosAPI.map(a => {
    const grupo = this.grupos.find(g => g.IdGrupoArticulo === a.IdGrupoArticulos);
    return {
      ...a,
      GrupoNombre: grupo ? grupo.Nombre : "Sin grupo"
    };
  });
},
    async obtenerGrupos() { 
      const gruposAPI = await apiRequest('http://localhost:3000/grupos');
      this.grupos= gruposAPI.map(g => {
        const  familia = this.familias.find( f =>f.IdFamilia === g.IdFamilia);
        return {
          ... g,
          FamiliaNombre: familia ? familia.Nombre : "Sin Familia"
        }
      });
    },
    async obtenerFamilias() {
     this.familias = await apiRequest('http://localhost:3000/familias');
    },   
    formatCurrency(value) {      
      const numberValue = parseFloat(value);        
      if (isNaN(numberValue)) {
        return '$ -'; 
      }
      return '$' + numberValue.toFixed(2);
    }
  },  
  async mounted() {
    await this.obtenerFamilias();
    await this.obtenerGrupos();
    await this.obtenerArticulos();
    await apiRequest;      
    },
  watch: {
    tab(newVal) {
    if (newVal === 'four') { 
      this.obtenerArticulos();
    }
    },
  }
}
</script>
