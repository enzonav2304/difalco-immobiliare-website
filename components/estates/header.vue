<template>
<div class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
    <div class="d-flex align-items-center flex-shrink-0">
        <label class="fs-sm me-2 pe-1 text-nowrap" for="sortby"><i class="fi-arrows-sort text-muted mt-n1 me-2"></i>Ordina:</label>
        <select class="form-select form-select-sm" id="sortby" v-model="filter_results_selected">
            <option disabled value="">Ordina per</option>
            <option selected>meno cari</option>
            <option>più cari</option>
            <option>più recenti</option>
            <option>meno recenti</option>
            <option>più grandi</option>
            <option>più piccoli</option>
            <option>più stanze</option>
            <option>meno stanze</option> 
        </select>
        <!--
        <select v-model="selectedValue">
            <option value="less_exp">Name</option>
            <option value="more_exp">Age</option>
            <option value="less_recent">Score</option>
            <option value="more_recent">Score</option>
            <option value="greater">Score</option>
            <option value="smaller">Score</option>
            <option value="less_rooms">Score</option>
            <option value="more_rooms">Score</option>
        </select>
        -->
    </div>
    <hr class="d-none d-sm-block w-100 mx-4">
    <div class="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
        <i class="fi-check-circle me-2"></i><span class="fs-sm mt-n1">{{numberItemsFound}} immobili trovati</span>
    </div>
</div>

</template>

<script>

import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            filter_results_selected: ''
        }
    },
    props: {
        itemsFound: {
            type: Number
        }
    },
    computed: {
        ...mapGetters({
            getEstates : 'mainDataStore/getFilteredEstates'
        }),
        numberItemsFound: function() {
            console.log('nr items', this.lengthObj(this.estates))
            return this.lengthObj(this.getEstates)
        }
    },
    watch: {
        filter_results_selected: function(value) {
            console.log('>> watching sort items ' + value)
            const sorted = [...this.getEstates] // creare una copia dell'array originale
            switch(value) {
                case "meno cari":
                    sorted.sort((a, b) => a.prezzo - b.prezzo)
                break
                case "più cari":
                    sorted.sort((a, b) => b.prezzo - a.prezzo)
                break
                case "più recenti":
                    sorted.sort((a, b) => new Date(b.data_pubblicazione) - new Date(a.data_pubblicazione))
                break
                case "meno recenti":
                    sorted.sort((a, b) => new Date(a.data_pubblicazione) - new Date(b.data_pubblicazione))
                break
                case "più grandi":
                    sorted.sort((a, b) => b.mq - a.mq)
                break
                case "più piccoli":
                    sorted.sort((a, b) => a.mq - b.mq)
                break
                case "più stanze":
                    sorted.sort((a, b) => b.stanze - a.stanze)
                break
                case "meno stanze":
                    sorted.sort((a, b) => a.stanze - b.stanze)
                break
            }
            console.log('> control: header setFilteredItems')
            return this.$store.commit('mainDataStore/setFilteredItems', sorted)             
        }
    }
}
</script>