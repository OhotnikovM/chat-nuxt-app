<template>
  <v-app app>
  <v-navigation-drawer v-model="showDrower" app mobile-break-point="650">
    <v-list subheader>
      <v-subheader>Люди в комнате</v-subheader>

      <v-list-item
        v-for="item in users"
        :key="item.id"
        @click.prevent 
      >

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="item.id === user.id ? 'pink accent-4' : 'grey'">mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="showDrower =!showDrower"></v-app-bar-nav-icon>
        <v-btn icon @click="exit">
           <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      <v-toolbar-title>Чат комнаты {{user.room}}</v-toolbar-title>
      </v-app-bar>
    <v-content>
      <div style="height: 100%;">
        <nuxt />
      </div>
    </v-content>
</v-app>
</template>

<script>

import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      showDrower: true,
    }
  },
  computed: mapState(["user", "users"]),
  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
            this.$router.push('/?message=leftChat');
            this.clearData();
      })
    }
  }
};
</script>
