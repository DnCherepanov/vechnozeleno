<template>
  <main>
    <section class="section">
      <div v-if="!success" class="container">
        <div class="columns is-vcenteredis-variable is-8">
          <div class="column is-5">
            <div
              class="columns is-centered contact-us-header-mailbox is-mobile"
            >
              <div class="column is-narrow">
                <Mailbox />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <form @submit.prevent="onSubmit">
              <div class="content is-normal">
                <h2>СВЯЗАТЬСЯ С НАМИ</h2>
                <p>
                  Если у вас остались вопросы или вы хотите сотрудничать с нами,
                  воспользуйтесь формой обратной связи, и мы обязательно ответим
                  вам.
                </p>
              </div>
              <b-field>
                <b-input
                  v-model="formData.name"
                  placeholder="Имя"
                  type="text"
                  required
                  pattern="^[А-Яа-яЁё\s]+$"
                  validation-message="Введите свое имя на кириллице"
                />
              </b-field>

              <b-field>
                <b-input
                  v-model="formData.email"
                  placeholder="E-mail"
                  type="email"
                  required
                />
              </b-field>

              <b-field>
                <b-input
                  v-model="formData.phone"
                  type="tel"
                  placeholder="8xxxxxxxxxx"
                  pattern="(8)\d{10}"
                  required
                  validation-message="Введите телефон в формате 8xxxxxxxxxx"
                />
              </b-field>

              <b-field>
                <b-input
                  v-model="formData.message"
                  placeholder="Сообщение"
                  type="textarea"
                  required
                  maxlength="200"
                ></b-input>
              </b-field>

              <b-field>
                <p class="control">
                  <b-button
                    type="is-dark"
                    outlined
                    expanded
                    label="Отправить сообщение"
                    native-type="submit"
                  />
                </p>
              </b-field>
            </form>
          </div>
        </div>
      </div>
      <div v-else class="container has-text-centered">
        <img src="/confetti.gif" width="200px" alt="конфетти" />
        <h2 class="title is-4">Ваше сообщение отправлено</h2>
        <b-button class="mt-5" tag="nuxt-link" to="/"
          >Перейти к покупкам</b-button
        >
      </div>
    </section>
  </main>
</template>

<script>
import Mailbox from '@/components/contacts/Mailbox'
export default {
  components: {
    Mailbox,
  },
  data() {
    return {
      success: false,
      formData: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
    }
  },
  head() {
    const title = 'Контакты'
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
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('forms/createContactUs', this.formData)
        this.success = true
      } catch (error) {
        this.$buefy.toast.open({
          message: this.$store.state.error,
          position: 'is-bottom-right',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>
