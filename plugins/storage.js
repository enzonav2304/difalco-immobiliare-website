import Vue from 'vue'

Vue.mixin({
    methods: {
        /*
            @@ session storage 
            example usage - storing simple strings in localStorage array:
            localStorage.pushArrayItem('myArray','item one');
            localStorage.pushArrayItem('myArray','item two');
            example usage - storing objects in sessionStorage array:
            var item1 = {}; item1.name = 'fred'; item1.age = 48;
            sessionStorage.pushArrayItem('myArray',item1);
            var item2 = {}; item2.name = 'dave'; item2.age = 22;
            sessionStorage.pushArrayItem('myArray',item2);       
            @@
        */
        getArray: function(arrayName) {
            console.log('get storage array')
            let thisArray = []
            let fetchArrayObject = sessionStorage.getItem(arrayName)
            if (typeof fetchArrayObject !== 'undefined') {
                if (fetchArrayObject !== null) { 
                    thisArray = JSON.parse(fetchArrayObject)
                }
            }
            return thisArray
        },
        pushArrayItem: function(arrayName, arrayItem) {
            console.log('push item in the storage array')
            let existingArray = this.getArray(arrayName)
            existingArray.push(arrayItem)
            sessionStorage.setItem(arrayName, JSON.stringify(existingArray))
        },
        popArrayItem: function(arrayName) {
            let arrayItem = {}
            let existingArray = getArray(arrayName)
            if (existingArray.length > 0) {
                arrayItem = existingArray.pop()
                sessionStorage.setItem(arrayName,JSON.stringify(existingArray))
            }
            return arrayItem
        },
        shiftArrayItem: function(arrayName) {
            let arrayItem = {}
            let existingArray = getArray(arrayName)
            if (existingArray.length > 0) {
                arrayItem = existingArray.shift()
                sessionStorage.setItem(arrayName,JSON.stringify(existingArray))
            }
            return arrayItem
        },
        unshiftArrayItem: function(arrayName, arrayItem) {
            let existingArray = getArray(arrayName)
            existingArray.unshift(arrayItem)
            sessionStorage.setItem(arrayName,JSON.stringify(existingArray))
        },
        deleteArray: function(arrayName) {
            sessionStorage.removeItem(arrayName)
        },
        clearStorage: function () {
            sessionStorage.clear()
        },
        /* local storage */
        clearLocalStorage: function () {
            localStorage.clear()
        },
        deleteLocalStorageArray: function(arrayName) {
            if(this.getLocalStorageArray(arrayName)) {
                return localStorage.removeItem(arrayName)
            }
            
        },
        getLocalStorageArray: function(arrayName) {
            //console.log('get local storage array')
            let thisArray = []
            let fetchArrayObject = localStorage.getItem(arrayName)
            if (typeof fetchArrayObject !== 'undefined') {
                if (fetchArrayObject !== null) { 
                    thisArray = JSON.parse(fetchArrayObject)
                }
            }
            return thisArray
        },
        pushLocalStorageArrayItem: function(arrayName, arrayItem) {
            console.log('push item in the storage array')
            let existingArray = this.getLocalStorageArray(arrayName)
            existingArray.push(arrayItem)
            localStorage.setItem(arrayName, JSON.stringify(existingArray))
        }        
    }
})

export default (context, inject) => {
    inject('getStorageArray', (arrayName) => {
        //console.log('get local storage array')
        let thisArray = []
        let fetchArrayObject = localStorage.getItem(arrayName)
        if (typeof fetchArrayObject !== 'undefined') {
            if (fetchArrayObject !== null) { 
                thisArray = JSON.parse(fetchArrayObject)
            }
        }
        return thisArray
    })
}




