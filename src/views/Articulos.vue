<template>
  <v-card >
    <v-tabs v-model="tab" bg-color="light-blue-darken-4" >
      <v-tab value="one">Crear Artículo</v-tab>
      <v-tab value="two">Crear Grupo</v-tab>
      <v-tab value="three">Crear Familia</v-tab>      
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">  
        
        <v-tabs-window-item value="one">
          <v-card>
            <v-toolbar color="light-blue-darken-4" dark flat>
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
            <v-dialog v-model="dialogAR" max-width="600px">
              <v-card>
                <v-card-title>{{ editando ? 'Editar' : 'Nuevo' }} Artículo</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Descripción" v-model="articuloEditando.Descripcion" :rules="[v => !!v || 'La descripcion es obligatorio']" :error-messages="descripcionError" required></v-text-field>
                    <v-select
                      label="Unidad de Medida"
                      :items="['gramos', 'litros', 'unidad']"
                      v-model="articuloEditando.Unidad_medida"                      
                      required
                    ></v-select>
                    <v-text-field label="Código de Barra" v-model="articuloEditando.Codigo_barra"></v-text-field>
                    <v-text-field label="Código" v-model="articuloEditando.Codigo" maxlength="5" counter="5" :rules="[v => !!v || 'El código es obligatorio']" :error-messages="codigoError" ></v-text-field>
                    <v-text-field label="Precio" type="number" v-model="articuloEditando.Precio" min="1" step="0.01" ></v-text-field>
                    <v-text-field label="Costo" type="number" v-model="articuloEditando.Costo"></v-text-field>
                    <v-select
                      v-model="articuloEditando.IdGrupoArticulos"
                      :items="grupos"
                      item-text="Nombre"
                      item-value="IdGrupoArticulo"
                      label="Grupo"
                      outlined
                      dense
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="dialogAR = false">Cancelar</v-btn>
                  <v-btn color="green" text @click="EjecutarA()">
                    {{ editando ? 'Actualizar' : 'Crear' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
              <v-btn color="secondary"  @click="editarGrupo(item)">Nuevo Grupos</v-btn>
            </v-toolbar>
          </v-card> 

            <v-data-table
              :headers="headersGrupos"
              :items="grupos"
              :search="search"
              class="elevation-1"
            >                          
              <template v-slot:item.acciones="{ item }">
                <v-btn icon small color="blue" @click="editarGrupo(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="red" @click="eliminarGrupo(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <!--Dialogo grupo-->
            <v-dialog v-model="dialogGR" max-width="600px">
              <v-card>
                <v-card-title>{{ editando ? 'Editar' : 'Nuevo' }} Grupo</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Nombre" v-model="gruposEditando.Nombre" required></v-text-field>                                        
                    <v-text-field label="Descripción" v-model="gruposEditando.Descripcion" required></v-text-field>                                                            
                    <v-select
                      label="Familia"
                      :items="familias"
                      item-text="Nombre"
                      item-value="IdFamilia"
                      v-model="gruposEditando.IdFamilia"
                      required
                    ></v-select>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="dialogGR = false">Cancelar</v-btn>
                  <v-btn color="green" text @click="EjecutarG()">
                    {{ editando ? 'Actualizar' : 'Crear' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          
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
              <v-btn color="secondary"  @click="editarFamilia(item)">Nueva Familia</v-btn>
            </v-toolbar>
          </v-card> 

            <v-data-table
              :headers="headersFamilia"
              :items="familias"
              :search="search"
              class="elevation-1"
            >                          
              <template v-slot:item.acciones="{ item }">
                <v-btn icon small color="blue" @click="editarFamilia(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="red" @click="eliminarFamilia(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <!--Dialogo grupo-->
            <v-dialog v-model="dialogF" max-width="600px">
              <v-card>
                <v-card-title>{{ editando ? 'Editar' : 'Nuevo' }} Familia</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Nombre" v-model="familiaseditando.Nombre" required></v-text-field>                                        
                    <v-text-field label="Descripción" v-model="familiaseditando.Descripcion" required></v-text-field>                                                            
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="dialogF = false">Cancelar</v-btn>
                  <v-btn color="green" text @click="EjecutarF()">
                    {{ editando ? 'Actualizar' : 'Crear' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          
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
      { text: 'Código', value: 'Codigo', width: '120px' , class: 'header-text' },
      { text: 'Descripción', value: 'Descripcion',width: '120px' },
      { text: 'Unidad de medida', value: 'Unidad_medida', width: '100px' },
      { text: 'Codigo de Barra', value: 'Codigo_barra', width: '100px' },
      { text: 'Precio', value: 'Precio', width: '120px', align: 'right' },
      { text: 'Costo', value: 'Costo', width: '120px', align: 'right' },
      { text: 'Grupo de Articulos', value: 'IdGrupoArticulo', width: '120px', align: 'right' },
      { text: 'Acciones', value: 'acciones', width: '150px', sortable: false }
    ],
  articulos: [],
  articuloEditando: {
    IdArticulo: null,
    Descripcion: '',
    Unidad_medida: '',
    Codigo_barra: '',
    Codigo: '',
    Precio: 0,
    Costo: 0,
    IdGrupoArticulos: ''
  },
  dialogAR: false,


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
    async crearArticulo()
    {      
     try {
    await apiCreate('https://stocksfback-production.up.railway.app/articulos/crear', this.articuloEditando);
        
    alert('Artículo creado con éxito');

    this.dialogAR = false;
    this.obtenerArticulos();
  } catch (err) {    
    alert('Error al crear artículo: ' + (err.message || ''));
    console.error(err);
  }

    },
    async crearGrupo() {      
          try {
    await apiCreate('https://stocksfback-production.up.railway.app/grupos/crear', this.gruposEditando);
        
    alert('grupo creado con éxito');

    this.dialogGR = false;
    this.obtenerGrupos();
  } catch (err) {    
    alert('Error al crear grupo: ' + (err.message || ''));
    console.error(err);
  }
    },
    async crearFamilia()
    {
           try {
            await apiCreate('https://stocksfback-production.up.railway.app/familias/crear', this.familiaseditando);
        
    alert('Familia creada con éxito');

    this.dialogF = false;
    this.obtenerFamilias();
  } catch (err) {    
    alert('Error al crear familia: ' + (err.message || ''));
    console.error(err);
  }  
    },
    //getCannot GET /familia

    async obtenerArticulos() { 
      this.articulos = await apiRequest('https://stocksfback-production.up.railway.app/articulos/listar') //('http://localhost:3000/articulos/listar');
    },

    async obtenerGrupos() { 
      this.grupos = await apiRequest('https://stocksfback-production.up.railway.app/grupos');
    },
    async obtenerFamilias() {
     this.familias = await apiRequest('https://stocksfback-production.up.railway.app/familias');//http://localhost:3000/familia
    },   
    //delete
    async eliminarArticulo(item) {  
      if (!confirm('¿Seguro que quieres eliminar este artículo?')) return;

  try {
    const url = `https://stocksfback-production.up.railway.app/articulos/eliminar/${item.IdArticulo}`;
    await apiDelete(url);

    alert('Artículo eliminado con éxito');
    this.obtenerArticulos();
  } catch (err) {
    alert('No se pudo eliminar el artículo: ' + (err.message || ''));
    console.error(err);
  }
    },
    async eliminarGrupo(item)
    {
        if (!confirm('¿Seguro que quieres eliminar este grupo?')) return;
  try {
    const url = `https://stocksfback-production.up.railway.app/grupos/eliminar/${item.IdGrupoArticulo}`;
    await apiDelete(url);

    alert('Grupo eliminado con éxito');
    this.obtenerGrupos(); 
  } catch (err) {
    alert('No se pudo eliminar el grupo: ' + (err.message || ''));
    console.error(err);
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
    async eliminarFamilia(item)
    {
       if (!confirm('¿Seguro que quieres eliminar esta familia?')) return;
  try {
    const url = `https://stocksfback-production.up.railway.app/familias/eliminar/${item.IdFamilia}`;
    await apiDelete(url);

    alert('Familia eliminado con éxito');
    this.obtenerFamilias(); 
  } catch (err) {
    alert('No se pudo eliminar la Familia: ' + (err.message || ''));
    console.error(err);
  }
    },
    //put
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
            IdGrupoArticulo: ''
          }
        this.dialogAR = true;
      }
      else{        
        this.editando=true;
        this.articuloEditando = { ...item };
        this.dialogAR = true;
      }
    },
    async guardarEdicionA() {
     try {
    const url = `https://stocksfback-production.up.railway.app/articulos/actualizar/${this.articuloEditando.IdArticulo}`;
    
    await apiUpdate(url, {
      Descripcion: this.articuloEditando.Descripcion,
      Unidad_medida: this.articuloEditando.Unidad_medida,
      Codigo_barra: this.articuloEditando.Codigo_barra,
      Codigo: this.articuloEditando.Codigo,
      Precio: this.articuloEditando.Precio,
      Costo: this.articuloEditando.Costo,
      IdGrupoArticulos: this.articuloEditando.IdGrupoArticulos
    });

    alert('Artículo actualizado con éxito');
    this.dialogAR = false; // cerrar el diálogo
    this.obtenerArticulos(); // refrescar tabla
  } catch (err) {
    alert('Error al actualizar el artículo: ' + (err.message || ''));
    console.error(err);
  }
    },

    editarGrupo(item) {
      console.log(item);
      if (!item)
      {        
        this.editando=false;
            this.gruposEditando= {
            Nombre:'',
            Descripcion: '',                                                            
            IdFamilia: ''
          }
        this.dialogGR = true;
      }
      else{        
        this.editando=true;
        this.gruposEditando = { ...item };
        this.dialogGR = true;
      }
    },
    async guardarEdicionG() {
           try {
    const url = `https://stocksfback-production.up.railway.app/grupos/${this.gruposEditando.IdGrupoArticulo}`;
    
    await apiUpdate(url, {      
      Nombre:this.gruposEditando.Nombre,
      Descripcion: this.gruposEditando.Descripcion,      
      IdFamilia: this.gruposEditando.IdFamilia
    });

    alert('grupo actualizado con éxito');
    this.dialogGR = false; // cerrar el diálogo
    this.obtenerGrupos(); // refrescar tabla
  } catch (err) {
    alert('Error al actualizar el grupo: ' + (err.message || ''));
    console.error(err);
  }
    },
    editarFamilia(item)
    {
      if (!item)
    {
      this.editando=false;
      this.familiaseditando= {
        Nombre:'',
        Descripcion:''
      }
      this.dialogF =true;
    }
    else {
      this.editando=true;
      this.familiaseditando={ ...item};
      this.dialogF=true;  
    }
    },
    async guardarEdicionF()
    {
                 try {
    const url = `https://stocksfback-production.up.railway.app/familias/actualizar/${this.familiaseditando.IdFamilia}`;
    
    await apiUpdate(url, {      
      Nombre:this.familiaseditando.Nombre,
      Descripcion: this.familiaseditando.Descripcion,            
    });

    alert('Familia actualizada con éxito');
    this.dialogF = false; // cerrar el diálogo
    this.obtenerFamilias(); // refrescar tabla
  } catch (err) {
    alert('Error al actualizar la familia: ' + (err.message || ''));
    console.error(err);
  }
    },
    //miss
    async EjecutarA() {
      if (this.editando)
        {        
          this.guardarEdicionA();
        }
      else 
        {    
          this.crearArticulo();
        }
    },
    async EjecutarG() {
      if (this.editando)
        {        
          this.guardarEdicionG();
        }
      else 
        {    
          this.crearGrupo();
        }
    },
    async EjecutarF(){
      if (this.editando)
        {        
          this.guardarEdicionF();
        }
      else 
        {    
          this.crearFamilia();
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
  mounted() {
      this.obtenerGrupos();
      this.obtenerFamilias();
      this.obtenerArticulos();
      apiRequest;
      apiCreate;      
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
