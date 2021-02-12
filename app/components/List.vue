<template>
  <div class="row mb-2">
    <template v-for="(item, index) in searchList">
      <book-card :item="item" :index="index"></book-card>
    </template>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('common', ['searchList']),
  },
};
</script>
