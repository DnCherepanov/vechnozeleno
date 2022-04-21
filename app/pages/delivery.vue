<template>
  <main class="py-5">
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
          <div class="column has-text-weight-bold">ОПЛАТА</div>
          <div class="column">
            <div class="block">Оплата картой на сайте временно недоступна.</div>
          </div>
          <div class="column">
            <div class="block">
              Оплата возможна наличными при получении товара, либо переводом.
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
          <div class="column has-text-weight-bold">ДОСТАВКА</div>
          <div class="column">
            <div class="block">
              Все изделия мы тщательно упаковываем перед отправкой, чтобы они
              дошли до вас в целости.
            </div>
            <div class="block">
              Если товар из вашего заказа повредился в процессе транспортировки,
              напишите нам письмо или свяжитесь по телефону.
            </div>
          </div>
          <div class="column">
            <div class="block">
              Осуществляем доставку с помошью сервиса Яндекс Go. Стоимость
              расчитывается в зависимости от удаленности и загруженности дорог.
            </div>
            <div class="block">
              Вы можете забрать ваш заказ самостоятельно. Неоплаченные заказы
              хранятся 7 дней, после этого срока мы с вами свяжемся, чтобы
              уточнить актуальность заказа.
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  head() {
    const title = 'Оплата и доставка'
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
}
</script>
