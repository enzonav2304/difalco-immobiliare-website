import Vue from 'vue'
export const eventBus = new Vue()

export default (context, inject) => {
    inject('eventBus', eventBus)
}