<template>
<div id="app">
  <v-app id="inspire">
<div id="app">
  <v-app id="inspire">
    <v-treeview v-model="tree" :open="open" :items="items" item-key="name">
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}          
        </v-icon>
        <v-icon v-else @click="buscaBlob(item)">
          {{ files[item.file] }}
        </v-icon>       
        <v-btn v-if="!item.file" color="primary" class="ma-2" dark @click="addChildFile(item)">新增區</v-btn>
        <v-btn v-if="!item.file" color="primary" class="ma-2" dark @click="addChildFolder(item)">新增棟</v-btn>
      </template>
      
    </v-treeview>
    
<v-dialog v-model="dialog" max-width="500px">
  <v-card>
    <v-card-title>
      Novo documento
    </v-card-title>
    <v-card-text>
      <v-file-input
                    type="file"
                    v-model="selectedFile"
                    color="ivory accent-4"
                    counter
                    label="Anexo de Propostas"
                    multiple
                    v-on:change="onFileSelected()"
                    placeholder="Select your files"
                    prepend-icon="mdi-paperclip"
                    outlined
                    hint="Na edição, caso um arquivo ja tenha sido enviado, ele será substituido."
                    persistent-hint
                    :show-size="1000"
                    requeired
                    >
        <template v-slot:fd="{ text }">
          <v-chip
                  v-for="file in fd" :slot="file.name" :key="file.name"
                  color="slategray accent-4"
                  dark
                  label
                  small
                  id = "uploadedFile"
                  >
            {{ text }}
          </v-chip>
          <span
                class="overline grey--text text--darken-3 mx-2"
                >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text @click="dialog = false" > Close </v-btn>
      <v-btn color="primary" text @click="addChildFile(item)" > Save </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
<v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>
          Nova pasta
        </v-card-title>
        <v-card-text>
          <v-col cols="12" sm="12" md="12">
            <v-text-field v-model="nomePasta" label="Nome da pasta"></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog2 = false" > Close </v-btn>
          <v-btn color="primary" text @click="addChildFile(item)" > Save </v-btn>
        </v-card-actions>
      </v-card>
</v-dialog>
    
  </v-app>
</div>
  </v-app>
</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'hello-world',
	data: () => ({
    fd: [],
    selectedFile: null,
    dialog: false,
    dialog2: false,
    nomePasta: '',
    open: ['public'],
    files: {
      pdf: 'mdi-file-pdf',
    },
    tree: [],
    items: [
      { name: 'COMERCIALIZAÇÃO', 
        children: [
          {},
        ],
      },
      { name: 'DISTRIBUIÇÃO', 
        children: [
          {},
        ],
      },
      { name: 'GERAÇÃO',
        children: [
          { },
        ],
      },
      { name: 'SERVIÇOS',
        children: [
          { },
        ],
      },
      { name: 'TRANSMISSÃO',
        children: [
          { name: '	01. Implementação dos projetos de transmissão de energia',
            children: [
              {}
            ],
          },
          { name: '	02. OeM da Transmissão de energia',
            children: [
              { }
            ],
          },
          { name: '	03. Gestão comercial da Transmissão',
            children: [
              {}
            ],
          },
          { name: '	04. Processos de suporte',
            children: [
              { }
            ],
          },
          { },
        ],
      },
    ],
  }),
  
  methods: {
    buscaBlob (item) {      axios.get(`https://localhost:44392/api/Files/GetSpecific/5?blobName=PDF TESTE.pdf`)
        .then(response => {
          item.comCheckout = 1
          // this.editedItem.urlAnexo = response.data.uri
          const file = response.data
          const docfile = new File([file], `${file.name}`)
          // const objectURL = window.URL.createObjectURL(file);
          const link = document.createElement('a')
          // link.href = window.URL.createObjectURL(docfile);
          link.href = file.StorageUri.PrimaryUri
          link.download = docfile.name
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
    },
    
    addChildFile(item) {
      if (!item.children) {
        this.$set(item, "children", []);
      }

      const name = 'kkk';
      const file = 'pdf';
      item.children.push({
        name,
        file
      });
    },
    addChildFolder(item) {
      if (!item.children) {
        this.$set(item, "children", []);
      }

      const name = 'kkk';
      const id = this.nextId++;
      item.children.push({
        id,
        name
      });
    },
}
}
</script>


