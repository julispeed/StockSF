<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary" grow>
      <v-tab value="one">Gestión de Proveedores</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <!-- TAB PROVEEDORES -->
        <v-tabs-window-item value="one">
          <v-card>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Gestión de Proveedores</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
              ></v-text-field>
              <v-btn color="secondary" @click="editarProveedor(null)">
                Nuevo Proveedor
              </v-btn>
            </v-toolbar>

            <!-- Tabla proveedores -->
            <v-data-table
              :headers="headersProveedores"
              :items="proveedores"
              :search="search"
              class="elevation-1"
              :pagination="false"
              hide-default-footer
            >
              <template v-slot:item.acciones="{ item }">
                <v-btn icon small color="blue" @click="editarProveedor(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon small color="red" @click="eliminarProveedor(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>

            <!-- Dialogo proveedores -->
            <v-dialog v-model="dialogP" max-width="600px">
              <v-card>
                <v-card-title>
                  {{ editando ? "Editar" : "Nuevo" }} Proveedor
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Razón Social" v-model="proveedorEditando.RazonSocial" required />
                    <v-text-field label="Código" v-model="proveedorEditando.Codigo" />
                    <v-text-field label="Dirección" v-model="proveedorEditando.Direccion" />
                    <v-select
                      label="Condición IVA"
                      v-model="proveedorEditando.CondicionIVA"
                      :items="['Responsable Inscripto','Monotributista','Exento']"
                    />
                    <v-text-field label="Teléfono" v-model="proveedorEditando.Telefono" />
                    <v-text-field label="CBU" v-model="proveedorEditando.CBU" />
                    <v-text-field label="Correo" v-model="proveedorEditando.Correo" />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="dialogP = false">Cancelar</v-btn>
                  <v-btn color="green" text @click="EjecutarP()">
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

    headersProveedores: [
      { title: "Razón Social", value: "RazonSocial" },
      { title: "Razón Social", value: "RazonSocial" },
      { title: "Condición IVA", value: "CondicionIVA" },
      { title: "Teléfono", value: "Telefono" },
      { title: "Correo", value: "Correo" },
      { title: "Acciones", value: "acciones", sortable: false },
    ],

    proveedores: [],
    proveedorEditando: {
      IdProveedor: null,
      RazonSocial: "",
      Codigo: "",
      Direccion: "",
      CondicionIVA: "Responsable Inscripto",
      Telefono: "",
      CBU: "",
      Correo: "",
    },
    dialogP: false,
  }),

  methods: {
    // Crear
    async crearProveedor() {
      try {
        await apiCreate("http://localhost:3000/proveedores/crear", this.proveedorEditando);
        alert("Proveedor creado con éxito");
        this.dialogP = false;
        this.obtenerProveedores();
      } catch (err) {
        alert("Error al crear proveedor: " + (err.message || ""));
        console.error(err);
      }
    },

    // Listar
    async obtenerProveedores() {
      this.proveedores = await apiRequest("http://localhost:3000/proveedores");
    },

    // Eliminar
    async eliminarProveedor(item) {
      if (!confirm("¿Seguro que quieres eliminar este proveedor?")) return;
      try {
        const url = `http://localhost:3000/proveedores/eliminar/${item.IdProveedor}`;
        await apiDelete(url);
        alert("Proveedor eliminado con éxito");
        this.obtenerProveedores();
      } catch (err) {
        alert("No se pudo eliminar el proveedor: " + (err.message || ""));
        console.error(err);
      }
    },

    // Editar
    editarProveedor(item) {
      if (!item) {
        this.editando = false;
        this.proveedorEditando = {
          RazonSocial: "",
          Codigo: "",
          Direccion: "",
          CondicionIVA: "Responsable Inscripto",
          Telefono: "",
          CBU: "",
          Correo: "",
        };
      } else {
        this.editando = true;
        this.proveedorEditando = { ...item };
      }
      this.dialogP = true;
    },

    // Actualizar
    async guardarEdicionP() {
      try {
        const url = `http://localhost:3000/Proveedores/actualizar/${this.proveedorEditando.IdProveedor}`;
        await apiUpdate(url, {
          RazonSocial: this.proveedorEditando.RazonSocial,
          Codigo: this.proveedorEditando.Codigo,
          Direccion: this.proveedorEditando.Direccion,
          CondicionIVA: this.proveedorEditando.CondicionIVA,
          Telefono: this.proveedorEditando.Telefono,
          CBU: this.proveedorEditando.CBU,
          Correo: this.proveedorEditando.Correo,
        });

        alert("Proveedor actualizado con éxito");
        this.dialogP = false;
        this.obtenerProveedores();
      } catch (err) {
        alert("Error al actualizar proveedor: " + (err.message || ""));
        console.error(err);
      }
    },

    async EjecutarP() {
      if (this.editando) {
        this.guardarEdicionP();
      } else {
        this.crearProveedor();
      }
    },
  },

  mounted() {
    this.obtenerProveedores();
  },
};
</script>
