<template>
  <div id="app">
    <v-app id="inspire">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          fixed-header
          height="350px"
          hide-default-footer
          hide-default-header
          max-width="600"
        >
          <v-divider inset></v-divider>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <div class="d-flex w-100">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  dense
                  outlined
                  single-line
                  hide-details
                ></v-text-field>
                <v-btn color="primary" class="ml-2 white--text" @click="addNew">
                  <v-icon dark>mdi-plus</v-icon>Add
                </v-btn>
              </div>
            </v-toolbar>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-text-field
              v-model="editedItem.name"
              :hide-details="true"
              dense
              single-line
              :autofocus="true"
              v-if="item.id === editedItem.id"
            ></v-text-field>
            <v-text-field v-else class="mx-10" v-model="item.name"></v-text-field>
          </template>
          <template v-slot:[`item.calories`]="{ item }">
            <v-text-field
              v-model="editedItem.calories"
              :hide-details="true"
              dense
              single-line
              v-if="item.id === editedItem.id"
            ></v-text-field>
            <span v-else>{{ item.calories }}</span>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div v-if="item.id === editedItem.id">
              <v-icon color="red" class="mr-3" @click="close">
                mdi-window-close
              </v-icon>
              <v-icon color="green" @click="save"> mdi-content-save </v-icon>
            </div>
            <div v-else>
              <v-icon color="green" class="mr-3" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </div>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Dessert (100g serving)',
        value: 'name',
        sortable: false,
      },
      { text: 'Actions', value: 'actions', sortable: false, width: '100px' },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      calories: 0,
    },
    defaultItem: {
      id: 0,
      name: 'New Item',
      calories: 0,
    },
  }),
  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          id: 1,
          name: 'A',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1)
    },

    close() {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    addNew() {
      const addObj = Object.assign({}, this.defaultItem)
      addObj.id = this.desserts.length + 1
      this.desserts.unshift(addObj)
      this.editItem(addObj)
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      }
      this.close()
    },
  },
}
</script>
