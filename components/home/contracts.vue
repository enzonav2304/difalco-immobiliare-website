<template>
    <section class="container mb-5 mt-n3 mt-lg-0">
        <div class="tns-carousel-inner row gx-4 mx-0 py-3" :data-carousel-options="my_data">
            <div class="col">
                <div class="card card-hover border-0 h-100 pb-2 pb-sm-3 px-sm-3 text-center">
                    <img class="d-block mx-auto my-3" :src="testImage" width="256" alt="Illustration">
                    <div class="card-body">
                        <h2 class="h4 card-title">Acquista un immobile</h2>
                        <p class="card-text fs-sm">
                            Cerca nel nostro database l'immobile che più si adatta alle tue esigenze.
                        </p>
                    </div>
                    <div class="card-footer pt-0 border-0">
                        <!--<a class="btn btn-outline-primary stretched-link" href="real-estate-catalog-sale.html">Find a home</a>-->
                        <nuxt-link class="btn btn-outline-primary stretched-link" to="/estates/vendita">Acquista</nuxt-link>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card card-hover border-0 h-100 pb-2 pb-sm-3 px-sm-3 text-center">
                    <img class="d-block mx-auto my-3" src="../../assets/img/real-estate/illustrations/sell.svg" width="256" alt="Illustration">
                    <div class="card-body">
                        <h2 class="h4 card-title">Vendi la tua casa</h2>
                        <p class="card-text fs-sm">
                            Pubblica un annuncio di vendita o richiedi una visita dei nostri agenti
                        </p>
                    </div>
                    <div class="card-footer pt-0 border-0">
                        <!--<a class="btn btn-outline-primary stretched-link" href="#">Pubblica</a>-->
                        <nuxt-link to="/getContacts"  class="btn btn-outline-primary stretched-link">Pubblica</nuxt-link>

                    </div>
                </div>
            </div>
            <!--
            <div class="col">class="btn btn-outline-primary stretched-link"
                <div class="card card-hover border-0 h-100 pb-2 pb-sm-3 px-sm-3 text-center">
                    <img class="d-block mx-auto my-3" src="../../assets/img/real-estate/illustrations/rent.svg" width="256" alt="Illustration">
                    <div class="card-body">
                        <h2 class="h4 card-title">Cerco affitto</h2>
                        <p class="card-text fs-sm">Sed sed aliquet sed id purus malesuada congue viverra. Habitant quis lacus, volutpat natoque ipsum iaculis cursus.</p>
                    </div>
                    <div class="card-footer pt-0 border-0">
                        <nuxt-link class="btn btn-outline-primary stretched-link" to="/estates/affitto">Vai a Affitto</nuxt-link>
                        <!--<a class="btn btn-outline-primary stretched-link" href="real-estate-catalog-rent.html">Find a rental</a>-->
                        <!--
                    </div>
                    -->
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
export default {
    data() {
        return {
            testImage: require('@/assets/img/real-estate/illustrations/buy.svg'),
            my_data: {
                'items': 3, 
                'controls': false, 
                'responsive': {
                    '0':{
                        'items':1
                    },
                    '500':{
                        'items':2
                    },
                    '768':{
                        'items':3
                    }
                }
            }
        }
    }
}
</script>