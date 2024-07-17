<template>
  <!-- Body-->
  <main class="page-wrapper">
    <!-- Sign In Modal-->
    <signin />
    <!-- Sign Up Modal-->
    <signup />
    <!-- Nav bar -->
    <!-- Nav bar -->
    <toolbar />
    <!-- Page content-->
    <!-- Breadcrumb-->
    <div class="container mt-5 mb-md-4 pt-5">
      <nav class="mb-3 pt-md-3" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="breadcrumb-item active" aria-current="page">Richiesta appuntamento</li>
        </ol>
      </nav>
    </div>
    <!-- Hero-->
    <section class="container mb-5 pb-2 pb-md-4 pb-lg-5">
      <div class="row align-items-md-start align-items-center gy-4">
        <div class="col-lg-5 col-md-6">
          <div
            class="mx-md-0 mx-auto mb-md-5 mb-4 pb-md-4 text-md-start text-center"
            style="max-width: 416px"
          >
            <h1 class="mb-4">Mettiamoci in contatto!</h1>
            <p class="mb-0 fs-lg text-muted">
              Compila il form accanto per richiedere un appuntamento. Ti contatteremo
              prima possibile
            </p>
          </div>
          <img
            class="d-block mx-auto"
            src="img/real-estate/illustrations/contact.svg"
            alt="Illustration"
          />
        </div>
        <div class="col-md-6 offset-lg-1">
          <div class="card border-0 bg-secondary p-sm-3 p-2">
            <div class="card-body m-1">
              <div class="needs-validation" novalidate>
                <div class="mb-4">
                  <label class="form-label" for="c-name">Nome Completo</label>
                  <input
                    class="form-control form-control-lg"
                    id="c-name"
                    type="text"
                    v-model="contact.name"
                    required
                  />
                  <div class="invalid-tooltip mt-1">Perfavore, inserisci il tuo nome</div>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="c-email">La tua Email</label>
                  <input
                    class="form-control form-control-lg"
                    id="c-email"
                    type="email"
                    v-model="contact.email"
                    required
                  />
                  <div class="invalid-tooltip mt-1">Perfavore, inserisci la tua email</div>
                </div>
                <div class="mb-4">
                  <label class="form-label" for="c-message">Messaggio</label>
                  <textarea
                    class="form-control form-control-lg"
                    id="c-message"
                    rows="4"
                    placeholder="Leave your message"
                    v-model="contact.msg"
                    required
                  ></textarea>
                  <div class="invalid-tooltip mt-1">Perfavore, digita il messaggio</div>
                </div>
                <div class="pt-sm-2 pt-1">
                  <button
                    class="btn btn-lg btn-primary w-sm-auto w-100"
                    @click="sendMessage"
                  >
                    Invia
                  </button>
                  <!--
                    <b-button @click="addItem" variant="primary">Inserisci</b-button>   
                  -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Contact cards-->
    <section class="container mb-5 pb-2 pb-md-4 pb-lg-5">
      <div class="row g-4">
        <!-- Item-->
        <div class="col-md-4">
          <a class="icon-box card card-hover h-100" href="mailto:info@difalcoimmobiliare.it">
            <div class="card-body">
              <div class="icon-box-media text-primary rounded-circle shadow-sm mb-3">
                <i class="fi-mail"></i>
              </div>
              <span class="d-block mb-1 text-body">Scrivici una mail</span>
              <h3 class="h4 icon-box-title mb-0 opacity-90">info@difalcoimmobiliare.it</h3>
            </div></a
          >
        </div>
        <!-- Item-->
        <div class="col-md-4">
          <a class="icon-box card card-hover h-100" href="tel:4065550120">
            <div class="card-body">
              <div class="icon-box-media text-primary rounded-circle shadow-sm mb-3">
                <i class="fi-device-mobile"></i>
              </div>
              <span class="d-block mb-1 text-body">Chiama quando vuoi</span>
              <h3 class="h4 icon-box-title mb-0 opacity-90">(406) 555-0120</h3>
            </div></a
          >
        </div>
        <!-- Item-->
        <div class="col-md-4">
          <a class="icon-box card card-hover h-100" href="#">
            <div class="card-body">
              <div class="icon-box-media text-primary rounded-circle shadow-sm mb-3">
                <i class="fi-instagram"></i>
              </div>
              <span class="d-block mb-1 text-body">Seguici</span>
              <h3 class="h4 icon-box-title mb-0 opacity-90">@finder_directory</h3>
            </div></a
          >
        </div>
      </div>
    </section>
    <CookieControl :locale="$store.state.lang" />
  </main>
  <!-- Footer-->
</template>

<script>
import signin from "~/components/modals/signin.vue";
import signup from "~/components/modals/signup.vue";
import toolbar from "~/components/main/header.vue";

export default {
  components: {
    signin,
    signup,
    toolbar,
  },
  data() {
    return {
      cookies: this.$cookies,
      lang: this.$store.state.lang,
      contact: {
        name: "",
        email: "",
        msg: "",
      },
    };
  },
  computed: {
    mail_msg: function () {
      return this.contact;
    },
  },

  mounted() {
    //console.log(">", this.$axios);
  },
  methods: {
    sendMessage: function () {
      console.log("> send message function");
      //let payload = this.contact;
      //let payload = {};
      let payload = this.mail_msg;
      console.log(">", payload);
      this.$store.dispatch("mainDataStore/postData", payload);
      this.$router.push("/");
    },
  },
};
</script>
