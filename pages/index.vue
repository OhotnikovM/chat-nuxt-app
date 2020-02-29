<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8>
    <v-card min-width="400">
      <v-snackbar
      v-model="snackbar"
      top
    >
      {{ message }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
      <v-card-title>
        <h3>Welcome to chat</h3>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Ваше имя"
              required
            ></v-text-field>

            <v-text-field
                v-model="room"
                :rules="roomRules"
                label="Комната"
                required
            ></v-text-field>

            <v-btn
                :disabled="!valid"
                color="pink"
                class="mr-4"
                @click="submit"
            >
              Войти
            </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  layout: "empty",
  head: {
    title: 'Добро пожаловать в чат'
  },
  sockets: {
    connect() {
      console.log('client IO connected')
    }
  },
  data: () => ({
      snackbar: false,
      message: '', 
      valid: true,
      name: '',
      room: '',
      nameRules: [
        v => !!v || 'Введите имя',
        v => (v && v.length <= 16) || 'Имя не должно превышать 16 символов',
      ],
      email: '',
      roomRules: [
        v => !!v || 'Введите название комнаты',
      ],
    }),
    mounted() {
      const { message } = this.$route.query;
      if (message === 'noUser') {
        this.message = 'Введите данные';
      } else if (message === 'leftChat'){
        this.message = 'Вы вышли из чата';
      }

      this.snackbar = !!this.message;
    },
    methods: {
      ...mapMutations(['setUser']),
      submit () {
        if (this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room
          };

          this.$socket.emit('userJoined', user, data => {
            if (typeof data === 'string') {
              console.error(data);
            } else {
              user.id = data.userId;
              this.setUser(user);
              this.$router.push('/chat');
            }
          });
        }
      },
    },
}
</script>
