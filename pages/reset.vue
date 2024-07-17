<template>
  <div class="container">
    <div>
      <h1>Reset Storage Page</h1>
    </div>
    <div>
    
    </div>
  </div>
</template>

<script>
export default {
    name: 'Reset',
    data() {
        return {}
    },
    created: function() {
        this.clearStorage()
        this.clearLocalStorage()
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
    },
    methods: {
        
    }
}
</script>

<style>
</style>