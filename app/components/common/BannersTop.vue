<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6">
          <div class="card">
            <div class="card-image">
              <b-image
                src="/eko-dom_800x.webp"
                alt="Эко-дом"
                webp-fallback=".jpg"
                ratio="2by1"
              >
                <template #placeholder>
                  <b-skeleton height="100%" />
                </template>
              </b-image>
              <NuxtLink to="/catalog/eko-dom" class="overlay">
                <p class="title is-2">Эко-дом</p>
                <p class="subtitle is-hidden-touch">
                  Организуй красивый и экологичный быт
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="card">
            <div class="card-image">
              <b-image
                src="/krasota_800x.webp"
                alt="Красота и гигиена"
                webp-fallback=".jpg"
                ratio="2by1"
              >
                <template #placeholder>
                  <b-skeleton height="100%" />
                </template>
              </b-image>
              <NuxtLink to="/catalog/krasota-i-gigiena" class="overlay">
                <p class="title is-2">Красота и гигиена</p>
                <p class="subtitle is-hidden-touch">
                  Натуральные товары без пластика
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 0;
}
.b-skeleton {
  height: 100%;
  position: absolute;
  top: 0;
}
.overlay {
  position: absolute;
  top: 0;
  border: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(34 34 34 / 20%);
  border-radius: 0.5rem;
}
.overlay:hover {
  background: rgb(0 0 0 / 10%);
}

.overlay p {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .overlay .title {
    font-size: 1.8rem;
    margin: 0;
  }
}
</style>
