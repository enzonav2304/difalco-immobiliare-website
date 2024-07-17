<template>
<!-- Navbar-->

<header class="navbar navbar-expand-lg navbar-light bg-light fixed-top" data-scroll-header>
    <!-- Off Canvas Side -->
    <div class="container">
        <a class="navbar-brand me-3 me-xl-4" href="real-estate-home.html">
            <img class="d-block" src="../../assets/img/logo/logo-dark.svg" width="116" alt="Finder">
        </a>
        <button class="navbar-toggler ms-auto" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="btn btn-sm text-primary d-none d-lg-block order-lg-3" 
            href="#signin-modal" 
            data-bs-toggle="modal"
        >
            <div v-if="$auth.loggedIn">
                <a href="#" @click="logout">
                    <i class="fi-user me-2"></i>Log out
                  </a>                  
                <!--<i class="fi-user me-2"></i>Log out-->
            </div>
        </a>
        <a class="btn btn-primary btn-sm ms-2 order-lg-3" 
            href="real-estate-add-property.html"
        >
            <i class="fi-plus me-2"></i>Add<span class='d-none d-sm-inline'> property</span>
        </a>
        <div class="collapse navbar-collapse order-lg-2" id="navbarNav">
            <ul class="navbar-nav navbar-nav-scroll" style="max-height: 35rem;">                
                <!-- Menu items-->
                <li class="nav-item active"><a class="nav-link" href="/">Home</a></li>
                <li class="nav-item dropdown">
                    <!--<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cerco Casa</a>-->
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cerco Casa</a>
                    <ul class="dropdown-menu">
                        <li><nuxt-link class="dropdown-item" to="/estates/affitto">Immobili in Affitto</nuxt-link></li>
                        <li><nuxt-link class="dropdown-item" to="/estates/vendita">Immobili in Vendita</nuxt-link></li>
                        <li><nuxt-link class="dropdown-item" to="/estates/all">Tutti gli Immobili</nuxt-link></li>
                        <!--
                        <li><a class="dropdown-item" href="real-estate-catalog-rent.html">Property for Rent</a></li>
                        <li><a class="dropdown-item" href="real-estate-catalog-sale.html">Property for Sale</a></li>
                        <li><a class="dropdown-item" href="real-estate-single.html">Single Property</a></li>
                        -->
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Vendo Casa</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="https://finder.createx.studio/real-estate-add-property.html">Segnalaci immobile</a></li>
                        <li><nuxt-link class="dropdown-item" to="/contact-form">Richiedi un appuntamento</nuxt-link></li>
                        <li><a class="dropdown-item" href="real-estate-vendor-properties.html">Vendor Page: Properties</a></li>
                        <li><a class="dropdown-item" href="real-estate-vendor-reviews.html">Vendor Page: Reviews</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="real-estate-vendor-reviews.html">Vendor Page: Reviews</a></li>
                    </ul>
                </li>
                <li class="nav-item d-lg-none">
                    <!--<a class="nav-link" href="#advanced-search-modal" data-bs-toggle="modal"><i class="fi-search me-2"></i>Ricerca Avanzata</a>-->
                    <!--<a class="nav-link" href="#" data-trigger="card-mobile"><i class="fi-search me-2"></i>Ricerca Avanzata</a>-->
                    <!--<a class="nav-link" href="#" @click.prevent="handleClick"><i class="fi-search me-2"></i>Ricerca Avanzata</a>-->
                    <a class="nav-link" data-trigger="card_mobile" href="#" @click.prevent="show_offcanvas('card_mobile')"><i class="fi-search me-2"></i>Ricerca Avanzata</a>
                    <!--<button data-trigger="card_mobile" class="d-lg-none btn btn-warning" type="button">  Show card </button>-->
                    
                    
                </li>
                <!-- ATTENTION HERE -->
                <li v-if="obj && window.innerWidth < 992" class="nav-item">
                    <a class="nav-link" href="/estates/alt-listing">Cerca</a>
                </li>
                <li v-if="obj" class="nav-item"><a class="nav-link" href="/estates/alt-listing">Le mie ricerche({{obj}})</a></li>
                <li v-if="obj" class="nav-item"><a class="nav-link" href="/estates/alt-listing">I miei favoriti({{obj}})</a></li>
                <!-- END OF ATTENTION -->
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Agenzia</a>
                    <ul class="dropdown-menu">
                        <li><nuxt-link class="dropdown-item" to="/about">Chi Siamo</nuxt-link></li>
                        <li><a class="dropdown-item" href="real-estate-property-promotion.html">I nostri servizi</a></li>
                        <!--
                        <li><a class="dropdown-item" href="real-estate-account-info.html">Personal Info</a></li>
                        <li><a class="dropdown-item" href="real-estate-account-security.html">Password &amp; Security</a></li>
                        <li><a class="dropdown-item" href="real-estate-account-properties.html">My Properties</a></li>
                        <li><a class="dropdown-item" href="real-estate-account-wishlist.html">Wishlist</a></li>
                        <li><a class="dropdown-item" href="real-estate-account-reviews.html">Reviews</a></li>
                        <li><a class="dropdown-item" href="real-estate-account-notifications.html">Notifications</a></li>
                        -->
                    </ul>
                </li>               
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pages</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="real-estate-about.html">About</a></li>
                        <li class="dropdown">
                            <a class="dropdown-item" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="real-estate-blog.html">Blog Grid</a></li>
                                <li><a class="dropdown-item" href="real-estate-blog-single.html">Single Post</a></li>
                            </ul>
                        </li>
                        <li><a class="dropdown-item" href="real-estate-contacts.html">Contacts</a></li>
                        <li><a class="dropdown-item" href="real-estate-help-center.html">Help Center</a></li>
                        <li><a class="dropdown-item" href="real-estate-404.html">404 Not Found</a></li>
                    </ul>
                </li>
                <li class="nav-item d-lg-none"><a class="nav-link" href="#signin-modal" data-bs-toggle="modal"><i class="fi-user me-2"></i>Sign in</a></li>
            </ul>            
        </div>
    </div>
    <span class="screen-darken"></span>
    <sideBar v-if="isMobile" />
</header>    
</template>

<script>

import sideBar from '~/components/estates/sideBar.vue'

import {mapGetters} from 'vuex'

export default {
    name: 'toolbar',
    components: {
        sideBar
    },
    data () {
        return {
            obj: null
        }
    },
    computed: {
        ...mapGetters({
            /*
            getFilteredEstates: 'mainDataStore/getFilteredEstates',
            getMainData: 'mainDataStore/getEstates',
            */
            getSearchOptions: 'appStore/getSearchOptions',      
            getActiveSearch: 'appStore/getActiveSearch',
            myGetter: 'mainDataStore/_getter',
            appGetter: 'appStore/_getter'
        }),
        getStorageObj() {
            if(!this.isEmpty(this.getLocalStorageArray('global_search'))) {
                return this.obj = this.lengthObj(this.getLocalStorageArray('global_search').flat())
            }
        },
        isMobile: function() {
            return this.appGetter('isMobile')
        }
    },
    mounted: function() {
        console.log('control: mounted header')
        //this.detectViewport()
        this.$store.watch(
            (state, getters) => this.getFilteredData,
            (newValue, oldValue) => {
                //console.log(newValue)
                this.numberItemsFound()
            }
        )
        this.$eventBus.$on('search-result', (payload) => {
            console.log('>> debug: header, receive event from side bar')
            let _payload = this.flatArray(payload)
            if(!this.isEmpty(_payload)) {
                console.log('>> debug: header mounted received data -> ', this.lengthObj(_payload))
                this.$store.commit('appStore/setSearchResult', false)
            } else {
                this.$store.commit('appStore/setSearchResult', true)
                console.log('>> debug: header mounted -> search result is 0')
            }
            
        })
        this.$eventBus.$on('off-canvas-close', () => {
            this.close_offcanvas()
        })
        /* @@ off canvas js @@ */
        
        document.addEventListener("DOMContentLoaded", function(){
            document.querySelectorAll('[data-trigger]').forEach(function(everyelement){
                let offcanvas_id = everyelement.getAttribute('data-trigger')
                everyelement.addEventListener('click', function (e) {
                    e.preventDefault()
                    this.show_offcanvas(offcanvas_id)
                })
            })
            document.querySelectorAll('.btn-close').forEach(function(everybutton){
                everybutton.addEventListener('click', function (e) {
                    e.preventDefault()
                    this.close_offcanvas()
                })
            })
            document.querySelector('.screen-darken').addEventListener('click', function(event){
                this.close_offcanvas()
            })
        })
        /*
        this.$eventBus.$on('test-1', (payload) => {
            console.log('control: header, receive event 1 from search bar')
            /*if(!payload) {
                this.setSearchOptions(this.getSearchOptions, false)
            }
        })
        */
    },
    methods: {
        handleClick: function() {
            //alert('hello')
            //const payload = this.createPayload('isMobile', true);
            //this.$store.commit('appStore/commitAppState', payload)
        },
        logout: function() {
            // Annulla l'autenticazione dell'utente
            this.$auth.logout()

            // Reindirizza l'utente alla pagina di login
            this.$router.push('/login')
        },
        
        /*
        numberItemsFound: function() {
            this.result_search = this.lengthObj(this.getFilteredData)
            return this.result_search
        },
        */
        
        /* @@ off-canvas methods @@ */

        darken_screen: function(yesno){
            if( yesno == true ){
                document.querySelector('.screen-darken').classList.add('active');
            }
            else if(yesno == false){
                document.querySelector('.screen-darken').classList.remove('active');
            }
        },
        close_offcanvas: function(){
            this.darken_screen(false)
            document.querySelector('.mobile-offcanvas.show').classList.remove('show')
            document.body.classList.remove('offcanvas-active')
        },
        show_offcanvas: function(offcanvas_id){
            this.darken_screen(true)
            document.getElementById(offcanvas_id).classList.add('show')
            document.body.classList.add('offcanvas-active')
        }
    }

}

</script>

<style>
body.offcanvas-active{
	overflow:hidden;
}

.offcanvas-header{ display:none; }

.screen-darken{
	height: 100%;
	width:0%;
	z-index: 30;
	position: fixed;
	top: 0;
	right: 0;
	opacity:0;
	visibility:hidden;
	background-color: rgba(34, 34, 34, 0.6);
	transition:opacity .2s linear, visibility 0.2s, width 2s ease-in;
}

.screen-darken.active{
	z-index:10; 
	transition:opacity .3s ease, width 0s;
    opacity:1;
    width:100%;
    visibility:visible;
}

/* ============ mobile view ============ */
@media all and (max-width: 991px) {
	
	.offcanvas-header{ display:block; }

	.mobile-offcanvas{
		visibility: hidden;
		transform:translateX(-100%);
	    border-radius:0; 
		display:block;
	    position: fixed;
	    top: 0; left:0;
	    height: 100%;
	    z-index: 1200;
	    width:80%;
	    overflow-y: scroll;
	    overflow-x: hidden;
	    transition: visibility .3s ease-in-out, transform .3s ease-in-out;
	}

	.mobile-offcanvas.show{
		visibility: visible;
    	transform: translateX(0);
	}
	.mobile-offcanvas .container, .mobile-offcanvas .container-fluid{
		display: block;
	}

}	
/* ============ mobile view .end// ============ */
</style>