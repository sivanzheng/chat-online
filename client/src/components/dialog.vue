<template>
  <div>
    <mu-dialog :open="$store.state.dialog.show" title="Hi~" @close="close">
    {{msg}}
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog>
  </div>
</template>

<script>
export default {
  props: ['msg','status'],
  methods: {
    close () {
      this.$store.dispatch('hideDialog')
      if (this.status) {
        this.$router.push({ path: '/login' });
      }
    }
  }
}
</script>

<style lang="stylus">
  
</style>