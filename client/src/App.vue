<template>
    <div id="app">
        <router-view></router-view>
        <!--tab选项卡-->
        <div class="navbottom">
            <mu-paper>
                <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
                    <mu-bottom-nav-item value="recents" title="聊天室" icon="question_answer" to="/chat"/>
                    <mu-bottom-nav-item value="favorites" title="小蘑菇" icon="face" to="/robot"/>
                    <mu-bottom-nav-item value="nearby" title="我的" icon="settings" to="/home"/>
                </mu-bottom-nav>
            </mu-paper>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        bottomNav: 'recents'
    }
  },
  methods: {
    handleChange (val) {
        this.bottomNav = val
    }  
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
    width:100%
    min-height:100%
    .navbottom
        position:fixed
        bottom:0
        width:100%
        height:55px
</style>
