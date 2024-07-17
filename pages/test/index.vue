<template>
  <div>
    <results :items="paginatedItems" />
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
import Results from "~/pages/test/_pages";

export default {
  components: {
    Results,
  },
  data() {
    return {
      items: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
        { id: 5, name: "Item 5" },
        { id: 6, name: "Item 6" },
        { id: 7, name: "Item 7" },
        { id: 8, name: "Item 8" },
        { id: 9, name: "Item 9" },
        { id: 10, name: "Item 10" },
        { id: 11, name: "Item 11" },
        { id: 12, name: "Item 12" },
        { id: 13, name: "Item 13" },
        { id: 14, name: "Item 14" },
        { id: 15, name: "Item 15" },
        { id: 16, name: "Item 16" },
        { id: 17, name: "Item 17" },
        { id: 18, name: "Item 18" },
        { id: 19, name: "Item 19" },
        { id: 20, name: "Item 20" },
        { id: 21, name: "Item 21" },
        { id: 22, name: "Item 22" },
        { id: 23, name: "Item 23" }
      ]
    }
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
