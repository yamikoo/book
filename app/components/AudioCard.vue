<template>
  <div class="col-md-6">
    <div class="card flex-md-row mb-4 shadow-sm h-md-250">
      <div class="card-body d-flex flex-column align-items-start">
        <strong class="d-inline-block mb-2 text-success">[{{ item.artistName }}]</strong>
        <h3 class="mb-0">
          <a class="text-dark" :href="item.trackViewUrl">{{ item.trackName }}</a>
        </h3>
        <div class="mb-1 text-muted">{{ item.releaseDate.substr(0, 10) }}</div>
        <p class="card-text mb-auto">{{ item.trackPrice }}円</p>
        <div>
          <audio :src="item.previewUrl" controls></audio>
        </div>
      </div>
      <img class="card-img-right flex-auto d-none d-lg-block" :src="item.artworkUrl100" style="width: 200px; height: 200px" />
    </div>
  </div>
</template>

<style scoped>
.btn {
  display: inline-block;
}
.btn-danger {
  margin-left: 30px;
}

.text-dark {
  font-size: 20px;
}
.card-text {
  font-size: 14px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    item: Object,
  },
  methods: {
    ...mapActions('common', ['setBookList', 'setSelectBook', 'setViewDetail']),
  },
  computed: {
    ...mapGetters('common', ['bookList', 'viewDetail']),
  },
};
</script>
