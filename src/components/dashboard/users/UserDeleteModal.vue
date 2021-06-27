<template>
  <v-dialog :value="showModal" @click:outside="$emit('close')" max-width="550px">
    <v-card>
      <v-card-title class="text-h5"
        >Tem certeza que deseja excluir o usuario {{ editedItem.name }}?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="$emit('delete')">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UserDeleteModal',
  props: {
    showModal: {
      default: false,
      required: true,
    },
    editedItem: {
      default: {},
      required: true,
    },
  },
};
</script>
