<template>
  <div class="container">
    <div>
      <amplify-authenticator>
        <div v-if="authState == 'signedin'">
          <Header />
          <div v-if="authState === 'signedin' && user">
            <div>Hello, {{ user.attributes.email }}</div>
          </div>
          <component :is="viewComponent"></component>
        </div>
      </amplify-authenticator>
    </div>
  </div>
</template>

<style scoped>
.hydrated .button {
  width: 100px;
}
</style>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import Books from '@/components/Books.vue';
import List from '@/components/List.vue';

export default {
  data: function () {
    return {
      viewComponent: Books,
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
    };
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  methods: {
    ...mapActions('common', ['setBookRegisted', 'setSearched']),
  },
  computed: {
    ...mapGetters('common', ['searched', 'bookRegisted']),
  },
  watch: {
    user: function () {
      console.log(this.user);
    },
    searched: function () {
      this.viewComponent = this.searched ? List : this.viewComponent;
      this.setSearched(false);
    },
    bookRegisted: function () {
      this.viewComponent = this.bookRegisted ? Books : this.viewComponent;
      this.setBookRegisted(false);
    },
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
};
</script>
