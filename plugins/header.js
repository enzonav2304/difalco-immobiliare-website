import { toUpper } from 'ramda';
import Vue from 'vue'

Vue.mixin({
    methods: {
        /* helper */
        cap: function(x) {
            const y = x.charAt(0).toUpperCase() + x.slice(1)
            return y
        },
        next_disable: function(name, title){
            let x = {
                'name': name,
                'title': title,
                'link': null,
                'type': 'text',
                'disable': true
            }
            return x
        },
        next_active: function(name, title){
            let x = {
                'name': name,
                'title': this.cap(title),
                'link': '/' + title,
                'type': 'link',
                'disable': false
            }
            return x
        } 
    }
})