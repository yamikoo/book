<template>
  <div class="row mb-2">
    <template v-for="(item, index) in bookList">
      <audio-card :item="item" :index="index" :kind="'audio'"></audio-card>
    </template>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import AudioCard from './AudioCard.vue';

export default {
  components: { AudioCard },
  mounted: async function () {},
  computed: {
    ...mapGetters('common', ['bookList']),
  },
};
</script>
