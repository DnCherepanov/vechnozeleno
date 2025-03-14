<template>
  <section class="hero is-fullheight">
    <div v-if="!success" class="columns is-flex-grow-1 is-gapless">
      <div class="column is-two-fifths tree">
        <div class="m-5">
          <NuxtLink to="/">
            <Logo />
          </NuxtLink>
        </div>
      </div>
      <div class="column m-5 is-align-self-center">
        <div class="columns is-centered is-gapless">
          <div class="column is-7">
            <form @submit.prevent="onSubmit">
              <div class="content is-normal">
                <h2>Регистрация</h2>
                <p>
                  После регистрации вы получите скидку 1000 рублей на ваш заказ.
                </p>
              </div>
              <b-field grouped>
                <b-field label="Имя" expanded>
                  <b-input
                    v-model="formData.firstName"
                    type="text"
                    required
                    pattern="^[А-Яа-яЁё\s]+$"
                    validation-message="Введите свое имя на кириллице"
                  />
                </b-field>
                <b-field label="Фамилия" expanded>
                  <b-input
                    v-model="formData.lastName"
                    type="text"
                    required
                    pattern="^[А-Яа-яЁё\s]+$"
                    validation-message="Введите свою фамилию на кириллице"
                  />
                </b-field>
              </b-field>
              <b-field label="Номер мобильного телефона">
                <b-input
                  v-model="formData.phone"
                  type="tel"
                  pattern="8[0-9]{10}"
                  placeholder="8xxxxxxxxxx"
                  required
                  validation-message="Введите телефон в формате 8xxxxxxxxxx"
                />
              </b-field>
              <b-field
                label="Сертификат"
                message="*Сертификат прикрепляется к номеру телефона"
              >
                <b-input v-model="formData.certificate" disabled></b-input>
              </b-field>
              <b-field class="my-5">
                <p class="control">
                  <b-button
                    type="is-dark"
                    outlined
                    expanded
                    label="Зарегистрироваться"
                    native-type="submit"
                  />
                </p>
              </b-field>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="hero-body">
      <div class="container has-text-centered">
        <div class="m-5">
          <img src="/confetti.gif" width="200px" alt="конфетти" />
        </div>
        <h2 class="title is-4">Вы успешно зарегистрировались</h2>
        <b-button class="mt-5" tag="nuxt-link" to="/"
          >Перейти к покупкам</b-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '@/components/common/Logo'
export default {
  components: { Logo },
  layout: 'empty',
  data() {
    return {
      success: false,
      formData: {
        firstName: '',
        lastName: '',
        phone: '',
        certificate: '',
      },
    }
  },
  head() {
    const title = 'Регистрация сертификата'
    const description = 'Эко магазин товаров для дома'
    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
      ],
    }
  },
  created() {
    this.formData.certificate = this.$route.query.coupon
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('forms/createCertificate', this.formData)
        this.success = true
      } catch (e) {
        this.$buefy.snackbar.open({
          type: 'is-danger',
          position: 'is-bottom',
          message: 'Сертификат уже зарегистрирован',
          actionText: '',
        })
      }
    },
  },
}
</script>
<style>
@media screen and (min-width: 769px) {
  .tree {
    background-image: url(/sbertree.jpg);
    background-size: cover;
  }
}
</style>
