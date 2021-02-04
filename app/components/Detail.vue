<template>
  <div>{{ selectBook.title }}</div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('common', ['selectBook']),
  },
};
</script>
