<template>
  <div>
    <ul>
      <li v-for="item in paginatedItems" :key="item.id">{{ item.name }}</li>
    </ul>
    <nav>
      <ul>
        <li v-for="page in pageCount" :key="page">
          <!--<nuxt-link :to="`/results?page=${page}`">{{ page }}</nuxt-link>-->
          <nuxt-link :to="`/test/${page}`">{{ page }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / 10);
    },
    paginatedItems() {
      const page = this.$route.query.page || 1;
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      return this.items.slice(startIndex, endIndex);
    },
  },
};
</script>
