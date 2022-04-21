<template>
  <section class="hero is-hidden-mobile">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column">
            <div class="columns is-centered">
              <div class="column is-narrow">
                <h2
                  id="with-love"
                  class="subtitle is-size-5 has-text-grey-light has-text-centered-mobile"
                >
                  Создано с любовью к природе
                </h2>
                <h1 id="title" class="title is-size-2 has-text-centered-mobile">
                  Магазин экотоваров
                </h1>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-centered is-vcentered is-mobile">
              <div class="column">
                <hero-picture />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeroPicture from '@/components/common/HeroPicture'
export default {
  components: {
    HeroPicture,
  },
}
</script>
