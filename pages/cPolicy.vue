<template>
  <div>
    <h1>Nuxt.js Cookie Control</h1>
    <p>
      <a 
        href="https://www.npmjs.com/package/nuxt-cookie-control" 
        target="_blank"
      >nuxt-cookie-control</a>
    </p>
    <section>
      <div>
        <button class v-text="'Open cookie control'" @click="cookies.modal = true" />
        <button
          class
          v-text="'Delete consent'"
          @click="deleteConsent()"
          v-if="cookies && cookies.consent"
        />
        <select v-model="lang">
          <option v-for="(l, key) in availableLang" :key="l.id" :value="key" v-text="l" />
        </select>
        <span v-if="!cookies.consent">(Be aware of the breakpoints)</span>
        <select v-model="cookies.barPosition" v-if="cookies && !cookies.consent">
          <option value="top-left">Top left</option>
          <option value="top-right">Top right</option>
          <option value="top-full">Top full</option>
          <option value="bottom-left">Bottom left</option>
          <option value="bottom-right">Bottom right</option>
          <option value="bottom-full">Bottom full</option>
        </select>
      </div>
      <img src="~/assets/logo.svg">
    </section>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/LXb3EKWsInQ"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <CookieControl :locale="$store.state.lang" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookies: this.$cookies,
      lang: this.$store.state.lang,
      availableLang: {
        en: "English",
        de: "Deutsch",
        it: "Italiano",
        es: "Español",
        fr: "Français",
        hr: "Hrvatski",
      },
    };
  },
  watch: {
    lang() {
      this.$store.commit("setData", {
        storage: this.$store.state,
        key: "lang",
        data: this.lang,
      });
    },
  },
  mounted: function () {
    console.log(this.$store.state.appStore.lang)
  },
  methods: {
    deleteConsent() {
      this.cookies.set({ name: "cookie_control_consent", value: false })
      window.location.reload()
    },
  },
}
</script>

<style >

* {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
  
a, p {
  font-size: 16px;
}
a {
  color: #206569;
}
</style>
<style scoped lang="scss">
h1 {
  color: #206569;
  margin-bottom: 5px;
  & + p {
    margin-top: 0;
  }
}

section {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

iframe,
.cookieControl__BlockedIframe {
  margin-top: 20px;
}

p {
  max-width: 500px;
}

img {
  display: block;
  max-width: 200px;
  margin-left: 50px;
}

select {
  border: 0;
  outline: 0;
  width: 100%;
  color: #fff;
  display: block;
  font-size: 18px;
  margin-top: 20px;
  max-width: 300px;
  padding: 15px 20px;
  background-color: #206569;
  & + span {
    display: block;
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
    & + select {
      margin-top: 0;
    }
  }
}

button {
  border: 0;
  outline: 0;
  width: 100%;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  max-width: 300px;
  padding: 15px 20px;
  background-color: #206569;
  transition: background-color 200ms;
  backface-visibility: hidden;
  &:hover {
    background-color: #2e495e;
  }

  & + button {
    margin-top: 20px;
  }
}
</style>


