<template>
  <footer class="section has-background-light">
    <div class="container is-size-7">
      <div class="columns">
        <div class="column has-text-centered has-text-left-tablet">
          <b-menu class="is-size-7">
            <b-menu-list>
              <b-menu-item
                label="ДОСТАВКА И ОПЛАТА"
                tag="nuxt-link"
                to="/delivery"
              ></b-menu-item>
              <b-menu-item
                label="ОБМЕН И ВОЗВРАТ"
                tag="nuxt-link"
                to="/return"
              ></b-menu-item>
              <b-menu-item
                label="КОНТАКТЫ"
                tag="nuxt-link"
                to="/contacts"
              ></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
        <div class="column is-half has-text-centered">
          <p class="mb-4">FOLLOW US</p>
          <div>
            <a
              href="https://www.instagram.com/pourtoi_sakh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b-icon
                icon="instagram-line"
                custom-class="social-icon"
                type="is-dark"
              />
            </a>
            <a
              href="https://www.facebook.com/pourtoi.sakh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b-icon
                icon="facebook-circle-fill"
                custom-class="social-icon"
                type="is-dark"
              />
            </a>
          </div>
        </div>
        <div class="column has-text-centered has-text-left-tablet">
          <p>693000, Южно-Сахалинск, пр-кт Победы</p>
          <p>ПН-ВС 9:00 - 21:00</p>
          <p>info@pourtoi.ru</p>
          <p>+7 914 749 58 56 (с 9:00 до 21:00)</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style>
.social-icon {
  font-size: 1.5rem !important;
}
</style>
