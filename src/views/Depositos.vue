<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="light-blue-darken-4">
      <v-tab value="one">Gestión de Depósitos</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">        
        <v-tabs-window-item value="one">
          <v-card>
            <v-toolbar color="light-blue-darken-4" dark flat>
              <v-toolbar-title>Gestión de Depósitos</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
              <v-btn color="secondary" @click="editarDeposito(null)">
                Nuevo Depósito
              </v-btn>
            </v-toolbar>

            <v-data-table
              :headers="headersDepositos"
              :items="depositos"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:item.acciones="{ item }">
                <v-btn icon small color="blue" @click="editarDeposito(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="red" @click="eliminarDeposito(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>

            <v-dialog v-model="dialogD" max-width="600px">
              <v-card>
                <v-card-title>
                  {{ editando ? "Editar" : "Nuevo" }} Depósito
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Nombre"
                      v-model="depositoEditando.Nombre"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Descripción"
                      v-model="depositoEditando.Descripcion"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="dialogD = false">Cancelar</v-btn>
                  <v-btn color="green" text @click="EjecutarD()">
                    {{ editando ? "Actualizar" : "Crear" }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
import { apiRequest, apiCreate, apiUpdate, apiDelete } from "@/../utils/api";

export default {
  data: () => ({
    tab: "one",
    search: "",
    editando: false,

    headersDepositos: [
      { text: "Nombre", value: "Nombre", width: "150px" },
      { text: "Descripción", value: "Descripcion", width: "250px" },
      { text: "Acciones", value: "acciones", width: "150px", sortable: false },
    ],

    depositos: [],
    depositoEditando: {
      IdDeposito: null,
      Nombre: "",
      Descripcion: "",
    },
    dialogD: false,
  }),

  methods: {
    async crearDeposito() {
      try {
        await apiCreate("http://localhost:3000/depositos/crear", this.depositoEditando);
        alert("Depósito creado con éxito");
        this.dialogD = false;
        this.obtenerDepositos();
      } catch (err) {
        alert("Error al crear depósito: " + (err.message || ""));
        console.error(err);
      }
    },

    async obtenerDepositos() {
      this.depositos = await apiRequest("http://localhost:3000/depositos");
    },
    
    async eliminarDeposito(item) {
      if (!confirm("¿Seguro que quieres eliminar este depósito?")) return;
      try {
        
        const url = `http://localhost:3000/depositos/eliminar/${item.IdDeposito}`;
        await apiDelete(url);
        alert("Depósito eliminado con éxito");
        this.obtenerDepositos();
      } catch (err) {
        alert("No se pudo eliminar el depósito: " + (err.message || ""));
        console.error(err);
      }
    },

    // editar
    editarDeposito(item) {
      if (!item) {
        this.editando = false;
        this.depositoEditando = { Nombre: "", Descripcion: "" };
      } else {
        this.editando = true;
        this.depositoEditando = { ...item };
      }
      this.dialogD = true;
    },

    async guardarEdicionD() {
      try {
        const url = `http://localhost:3000/depositos/actualizar/${this.depositoEditando.IdDeposito}`;
        await apiUpdate(url, {
          Nombre: this.depositoEditando.Nombre,
          Descripcion: this.depositoEditando.Descripcion,
        });

        alert("Depósito actualizado con éxito");
        this.dialogD = false;
        this.obtenerDepositos();
      } catch (err) {
        alert("Error al actualizar depósito: " + (err.message || ""));
        console.error(err);
      }
    },

    async EjecutarD() {
      if (this.editando) {
        this.guardarEdicionD();
      } else {
        this.crearDeposito();
      }
    },
  },

  mounted() {
    this.obtenerDepositos();
  },
};
</script>
