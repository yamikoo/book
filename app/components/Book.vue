<template>
  <div class="col mt-5 book-part">
    <div class="flex-row mx-4" @click="select()">
      <img class="book-img flex-auto d-none d-lg-block mx-auto mb-2" :src="item.image" />
    </div>
  </div>
</template>

<style scoped>
.book-part{
  border-style: solid;
  border-width: 0px 0px 30px 0px;
  border-image: url(../static/image/wood-texture_00001.jpg) 30;
  box-shadow: inset 0px -15px rgb(41, 10, 0);
}
.book-img{
  box-shadow: 10px 0px 7px rgba(0,0,0,0.5);
	width: 150px;
	height: 225px;
	cursor: pointer;
}
</style>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import RegistButton from './RegistButton.vue';

export default {
  components: { RegistButton },
  props: {
    item: Object,
    index: Number,
    kind: String,
  },
  methods: {
    select: function () {
      this.setSelectBook(this.item);
      this.setViewDetail(true);
    },
    deleteBook: async function (bookID) {
      const endpoint = 'http://localhost:3333/api/books';
      const result = await axios
        .delete(`${endpoint}`, { data: { book_id: bookID } })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      this.setBookList(
        this.bookList.filter((item) => {
          return item.book_id != bookID;
        })
      );
    },
    ...mapActions('common', ['setBookList', 'setSelectBook', 'setViewDetail']),
  },
  computed: {
    ...mapGetters('common', ['bookList', 'viewDetail']),
  },
};
</script>
