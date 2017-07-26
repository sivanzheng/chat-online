<template>
    <div id="app">
        <router-view></router-view>
        <!--tab选项卡-->
        <div class="navbottom">
            <mu-paper>
                <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
                    <mu-bottom-nav-item value="chat" title="聊天室" icon="question_answer" to="/chat"/>
                    <mu-bottom-nav-item value="robot" title="小蘑菇" icon="face" to="/robot"/>
                    <mu-bottom-nav-item value="home" title="我的" icon="settings" to="/home"/>
                </mu-bottom-nav>
            </mu-paper>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        bottomNav: ''
    }
  },
  methods: {
    handleChange (val) {
        this.bottomNav = val
    }  
  },
  mounted(){
    let n = this.$route.path
    switch(n)
    {
    case '/chat':
        this.bottomNav = 'chat'
        console.log(this.bottomNav)
        break
    case '/robot':
        this.bottomNav = 'robot'
        console.log(this.bottomNav)
        break
    case '/home':
        this.bottomNav = 'home'
        console.log(this.bottomNav)
        break
    default:
        this.bottomNav = 'chat'
        console.log(this.bottomNav)
    }
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
