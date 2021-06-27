<template>
  <v-container class="fill-height" >
    <v-row align="center" justify="center">
      <h4>Ooops, Página não encontrada.</h4>
      <v-btn class="mt-1 ml-2" text @click="$router.push({ name: 'Home'})">
        Voltar a home
      </v-btn>
    </v-row>
  </v-container>
</template>
