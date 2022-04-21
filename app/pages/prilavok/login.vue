<template>
  <section class="hero is-fullheight">
    <div class="bkg" />
    <div class="hero-body">
      <div class="container is-fullhd">
        <div class="columns">
          <div class="column is-one-quarter login">
            <b-field type="is-dark">
              <b-input
                v-model="login.username"
                type="text"
                placeholder="Логин"
                rounded
                icon="user-line"
              ></b-input>
            </b-field>
            <b-field type="is-dark">
              <b-input
                v-model="login.password"
                type="password"
                placeholder="Пароль"
                rounded
                icon="lock-line"
                password-reveal
              ></b-input>
            </b-field>
            <b-button rounded expanded type="is-primary" @click="userLogin">
              Встать за прилавок
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },
  head() {
    return {
      title: 'Встать за прилавок',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        this.$buefy.toast.open({
          message: 'Приветики-пистолетики',
          type: 'is-success',
        })
      } catch {
        this.$buefy.toast.open({
          message: 'Данные некорректны',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bkg {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: url(/illustration-login.svg) no-repeat right center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login .input {
  background-color: transparent;
}
.login .control.has-icons-left .icon {
  color: #8a8a8a;
}
</style>
