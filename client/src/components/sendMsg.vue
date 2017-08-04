<template>
  <div class="clear">
    <div class="item">
      <img :src="img" alt="">
      <span>
        {{msg}}
      </span>
    </div>
  </div>
</template>

<script>
  export default{
  props: ['name', 'img', 'msg']
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.item
  position: relative
  clear: both
  display: inline-block
  padding: 16px 40px 16px 20px
  margin: 10px 10px 20px 10px
  border-radius: 10px
  background-color: #9eea6a
  animation: show-chat-odd 0.25s 1 ease-in
  -moz-animation: show-chat-odd 0.25s 1 ease-in
  -webkit-animation: show-chat-odd 0.25s 1 ease-in
  float: right
  margin-right: 80px
  color: #232323
  span
      word-break:break-all
  img
      position: absolute
      top: 0
      width: 50px
      height: 50px
      border-radius: 50px
      right: -70px;
  &:after
      position: absolute
      top: 15px
      content: ''
      width: 0
      height: 0
      border-top: 15px solid #9eea6a
      border-right: 15px solid transparent
      right: -15px
@keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }
    100% {
        margin-right: 0;
    }
}
@-moz-keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }
    100% {
        margin-right: 0;
    }
}
@-webkit-keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }
    100% {
        margin-right: 0;
    }
} 
</style>