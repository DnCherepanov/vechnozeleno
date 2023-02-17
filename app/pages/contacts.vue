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
                  placeholder="Email"
                  type="email"
                  icon="mail-line"
                  required
                />
              </b-field>

              <b-field>
                <b-input
                  v-model="formData.phone"
                  v-cleave="masks.phone"
                  type="tel"
                  icon="phone-line"
                  pattern="^(\+7)[\s]\([0-9]{3}\)[\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$"
                  placeholder="+7 (000) 000-00-00"
                  validation-message="Введите телефон в формате +7 (000) 000-00-00"
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
              <p class="is-size-7 has-text-grey">
                Нажимая на кнопку, вы даете согласие на обработку персональных
                данных и соглашаетесь c
                <nuxt-link to="/privacy">
                  политикой конфиденциальности.
                </nuxt-link>
              </p>
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
import Cleave from 'cleave.js'
import Mailbox from '@/components/contacts/Mailbox'
const cleave = {
  name: 'cleave',
  bind(el, binding) {
    const input = el.querySelector('input')
    input._vCleave = new Cleave(input, binding.value)
  },
  unbind(el) {
    const input = el.querySelector('input')
    input._vCleave.destroy()
  },
}
export default {
  components: {
    Mailbox,
  },
  directives: { cleave },
  data() {
    return {
      success: false,
      formData: {
        name: '',
        email: '',
        phone: '',
        message: '',
      },
      masks: {
        phone: {
          delimiters: [' ', '(', ') ', '-'],
          prefix: '+7',
          blocks: [2, 0, 3, 3, 2, 2],
          noImmediatePrefix: true,
          numericOnly: true,
        },
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
        // eslint-disable-next-line security/detect-non-literal-fs-filename
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
