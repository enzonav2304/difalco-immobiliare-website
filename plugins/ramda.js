import Vue from 'vue'
var R = require('ramda') /** import ALL ramda functions **/

Vue.mixin({
    methods: {
        foo: function () { 
            console.log('foo')
        },
        arrayValue: function (prop, data) {
            //console.log('debugging ramda')
            return R.pluck(prop, data) 
        },
        compareObjs: function(a,b) {
            const eqValues = compose(R.isEmpty, R.symmetricDifference)
            console.log(eqValues(a,b))
        },
        filterArrayByIdsArray: function (array1, array2) {
            console.log(array1)
            console.log(array2)
            const t = R.filter(
                R.compose(
                    R.flip(R.contains)(array2), R.prop('id')
                ), array1
            )
            return t
            /* @@@ alternatively @@@
            let x = items.filter(x=>ids.includes(x.id))
            console.log(x)
            */
        },
        filterCities: function(x) { //this.zone.data
            //if(!x) alert('x not found!')
            console.log('and this?')
            return R.into(['Agrigento'], 
            R.compose(
                R.reject(R.propEq('citta', 'Agrigento')),
                R.map(R.prop('citta'))
            ))(x)
        },
        filterZones: function(data, y) { //this.zone.data
            const _filter = x => x.citta == y
            const t = R.pipe(
                R.filter(_filter)
            )(data)
            return t        
        },
        filterCollectionByArray: function(obj, val, prop) {
            console.log('check obj')
            console.log(obj)
            console.log('check array')
            console.log(this.arrayType(val))
            const joinByType = R.innerJoin(R.flip(R.propEq(prop)))
            const result = joinByType(obj, this.arrayType(val))
            return result        
        },
        filterItem: function(method, data, s, y) { //s=nome campo, y=valore
            console.log('main: ramda filtering item')
            console.log('main: ramda debug: search key', s)
            console.log('main: debug search value', y)
            if(method === 'equal') {
                const filterId = x => x[s] == y
                const t = R.pipe(
                    R.filter(filterId)
                )(data)
                return t
                //console.log('> filter', t)
            } else if(arguments[0] === 'greater') {
                /*
                const filterId = x => x[s] >= y
                */
                const filterId = x => {
                    let numField = parseInt(x[s])
                    return numField >= y 
                }
                const t = R.pipe(
                    R.filter(filterId)
                )(data)
                return t
            }  else if(arguments[0] === 'minor') {
                /*
                const filterId = x => x[s] <= y
                */
                const filterId = x => {
                    let numField = parseInt(x[s])
                    return numField <= y 
                }
                const t = R.pipe(
                    R.filter(filterId)
                )(data)
                return t
            } else if(method === 'p_between') {
                let k = parseInt(y)
                let min = k - 20000
                let max = k + 20000               
                /*
                const filterId = x => x[s] >= min && x[s] <= max
                */
                const filterId = x => {
                    let numField = parseInt(x[s])
                    console.log('test_: ' + max + ':' + min)
                    return numField >= min && numField <= max
                }
                const t = R.pipe(
                    R.filter(filterId)
                )(data)
                return t
            } else if(method === 'mq_between') {
                let k = parseInt(y)
                let min = k - 30
                let max = k + 30
                /*
                const filterId = x => x[s] >= min && x[s] <= max
                */
                const filterId = x => {
                    let numField = parseInt(x[s])
                    return numField >= min && numField <= max
                }
                const t = R.pipe(
                    R.filter(filterId),
                    //R.values()
                )(data)
                return t
            }
        },
        filterObjects: function(data, y) {
            console.log('this function is ambiguos')
            const _filter = x => x.id == y
            const t = R.pipe(
                R.filter(_filter)
            )(data)
            return t
        },
        getActiveObject: function(x, y) { //find and collect objects if prop active is true
            console.log(R.into([], 
            R.compose(
                //R.reject(R.propEq(y, null)),
                R.map(R.prop('id'))
            ))(x))
        },
        groupIds: function(obj, key) {
            return R.pipe(
                R.groupBy(R.prop(key)), // group by the key
                R.map(R.map(R.dissoc(key))) // remove the key from all objects in all groups   
            )(obj)
        },        
        /* find and collect objects if prop is null */
        rejectNullObject: function(x, y, s) { //x = object, y = null prop s = map prop
            return (R.into([], 
            R.compose(
                R.reject(R.propEq(y, null)),
                R.map(R.prop(s))
            ))(x))
        },
        setImgSliderModel: function(x, y) { //find and collect objects if prop active is true
            return R.into([], 
            R.compose(
                R.reject(R.propEq('imgs', null)),
                R.map(R.prop(y))
            ))(x)
        },
        joinArrays: function(a,b) {
            console.log('test_: join arrays')            
            const t = R.compose(
                R.flatten,
                R.concat
            )(a,b)
            //console.log(t)
            return t
        },
        returnSearchObj: function(a, b) {
            console.log('test_: function return search Obj')
            let s = this.getMatchedIds(this.joinArrays(a, b), 'id')
            return this.removeDuplicates(s, 'id')
        },

        /* @@ helpers @@ */        
        isEmpty: function(x) {
            //console.log('ramda works!')
            return R.isEmpty(x)
        },
        isNull: function(x) {
            return R.isNil(x)
        },
        lengthObj: function(arr) {
            const t = R.length(arr)
            return t
        },
        flatArray: function(a) {
            console.log('service function flat array')
            return R.flatten(a)
        },
        map: function(x, y) {
            return R.map(x, y)
        },
        intersection: function(a,b) {
            return R.intersection(a,b)
        }
    }
})

export default (context, inject) => {
    inject('filterCollectionByArray', function(obj, val) {
        console.log('injected function')
        //console.log('check obj')
        //console.log(obj)
        //console.log('check array')
        //console.log(this.arrayType('ville'))
        const joinByType = R.innerJoin(R.flip(R.propEq('id_tipologia')))
        const result = joinByType(obj, this.arrayType(val))
        return result        
    }),
    inject('_filterItem', (method, data, s, y) => {
        console.log('ramda')
        if(method === 'equal') {
            //console.log(data)
            const filterId = x => x[s] == y
            const t = R.pipe(
                R.filter(filterId)
            )(data)
            return t            
        } else if(method === 'greater') {
            const filterId = x => x[s] >= y
            const t = R.pipe(
                R.filter(filterId)
            )(data)
            return t            
        }
    }),
    inject('isNull', (x) => {
        return R.isNil(x)
    }),
    inject('isEmpty', (x) => {
        return R.isEmpty(x)
    })
}