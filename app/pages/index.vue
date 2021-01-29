<template>
  <div class="container">
    <div>
      <Header />
      <component :is="viewComponent"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import Books from '@/components/Books.vue';
import List from '@/components/List.vue';

export default {
  data: function () {
    return {
      viewComponent: Books,
    };
  },
  methods: {
    ...mapActions('common', ['setBookRegisted', 'setSearched']),
  },
  computed: {
    ...mapGetters('common', ['searched', 'bookRegisted']),
  },
  watch: {
    searched: function () {
      this.viewComponent = this.searched ? List : this.viewComponent;
      this.setSearched(false);
    },
    bookRegisted: function () {
      this.viewComponent = this.bookRegisted ? Books : this.viewComponent;
      this.setBookRegisted(false);
    },
  },
};
</script>
