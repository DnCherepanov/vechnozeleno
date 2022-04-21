<template>
  <main class="py-5">
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-variable is-8">
          <div class="column has-text-weight-bold">ВОЗВРАТ</div>
          <div class="column">
            <div class="block">
              Если товар по какой-либо причине вам не подошел, вы можете вернуть
              товар нам по почте или в наш магазин.
            </div>
            <div class="block">
              Если товар оказался с браком, мы незамедлительно оформим возврат.
            </div>
          </div>
          <div class="column">
            <div class="block">
              Если вы хотите вернуть товар, вам необходимо сообщить нам об этом
              в течение 5 дней с момента получения заказа.
            </div>
            <div class="block">
              Мы не несем ответственности, если изделие эксплуатировалось не по
              инструкции. Если у вас есть дополнительные вопросы по уходу, вы
              всегда можете написать нам.
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-variable is-4">
          <div class="column has-text-weight-bold">ОБМЕН</div>
          <div class="column">
            <div class="block">
              Если вы хотите обменять товар на другой, вы можете это сделать у
              нас в магазине. Или отправить нам заказ обратно почтой, после
              получения посылки, мы отправим вам замену.
            </div>
          </div>
          <div class="column">
            <div class="block">
              Если обмен не по причине производственного брака, транспортные
              расходы по возврату берет на себя покупатель.
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
    const title = 'Возврат и обмен'
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
