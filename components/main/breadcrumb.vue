<template>
<!-- Breadcrumb-->
    <nav class="mb-3 pt-md-2" aria-label="Breadcrumb">
        <ol class="breadcrumb">
            <!--<li v-for="item in nav_obj" :key="item.name" :class="item.active ? 'breadcrumb-item active' : 'breadcrumb-item'">-->
            <li v-for="item in navObj" :key="item.name" class="breadcrumb-item active">
                <a :href="item.link">{{item.title}}</a>
            </li>            
        </ol>
    </nav>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            title: ''
        }
    }, 
    props: {
        getItem: {
            type: Array
        }
    },
    computed: {
        ...mapGetters({      
            navObj: 'appStore/getNavObj'
        }),
        
    },
    mounted: function() {
        this.great_developer()
        this.$store.watch(
            (state, getters) => this.navObj,            
            (newValue, oldValue) => {
                //console.log(newValue)                
            }
        )
    },
    methods: {
        great_developer: function() { 
            let payload = {}            
            if(this.$route.params.id) {
                let type = this.getItem[0].id_tipologia
                payload.search = this.$route.params.id                
                switch(type) {                    
                    case '0':
                    case '1':
                        payload.title = 'Appartamenti'
                        payload.link = '/estates/appartamenti'
                    break
                    case '4': 
                    case '7':
                    case '10': 
                    case '11':
                        payload.title = 'Case e Ville'
                        payload.link = '/estates/ville'
                    break
                    case '2':
                    case '5':
                        payload.title = 'Box e Garage'
                        payload.link = '/estates/box'
                    break
                    case '3':
                    case '6':
                        payload.title = 'Immobili Commerciali'
                        payload.link = '/estates/commerciali'
                    break
                    case '8':
                    case '9':
                        payload.title = 'Terreni'
                        payload.link = '/estates/terreni'
                    break
                }                
                this.$store.commit('appStore/changeNavObj', payload) 
                console.log('end of method')             
            }            
        }
    }
    
}

</script>