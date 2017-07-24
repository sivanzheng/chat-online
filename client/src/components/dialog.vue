<template>
  <div>
    <mu-dialog :open="$store.state.dialog.show" :title="title" @close="close">
    {{dialogMsg}}
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogMsg: [String,Number],
    status: {
      type: Number,
      default: ''
    },
    title: {
      type: String,
      default: 'Hi~'
    }
  },
  methods: {
    close () {
      this.$emit('fromChild','1')
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