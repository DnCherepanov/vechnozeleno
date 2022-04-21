<template>
  <div class="wrapper">
    <Header />
    <nuxt keep-alive />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
export default {
  components: { Header, Footer },
  mounted() {
    ;(function (d, w, c) {
      w.ChatraID = 'fJMtGakwqKjrEAzbP'
      const s = d.createElement('script')
      w[c] =
        w[c] ||
        function () {
          ;(w[c].q = w[c].q || []).push(arguments)
        }
      s.async = true
      s.src = 'https://call.chatra.io/chatra.js'
      if (d.head) d.head.appendChild(s)
    })(document, window, 'Chatra')
    window.ChatraSetup = {
      colors: {
        buttonBg: '#e8bba1' /* цвет фона кнопки чата */,
      },
    }
  },
}
</script>
