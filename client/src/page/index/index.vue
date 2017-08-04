<template>
<div class="gridlist-demo-container">
  <mu-grid-list class="gridlist" style="margin-bottom:55px">
    <mu-appbar title="兴趣广场">
    </mu-appbar>
    <mu-grid-tile v-for="tile,index in list" :key="'tile' + index" titlePosition="top" actionPosition="left" :rows="tile.featured ? 2 : 1" :cols="tile.featured ? 2 : 1">
      <img :src="tile.image" @click="goToChat(tile)"/>
      <span slot="title">{{tile.title}}</span>
      <span slot="subTitle">在线人数：<b>{{tile.num_of_people}}</b></span>
      <mu-icon-button icon="star_border" slot="action"/>
    </mu-grid-tile>
  </mu-grid-list>
</div>
</template>

<script>
export default {
  data () {
    return {
      numList:[],
      list: [{
        id:1,
        image: 'static/img/index/breakfast.jpg',
        title: 'Breakfast',
        num_of_people: 0,
        featured: true
      }, {
        id:2,
        image: 'static/img/index/burger.jpg',
        title: 'Burger',
        num_of_people: 0
      }, {
        id:3,
        image: 'static/img/index/camera.jpg',
        title: 'Camera',
        num_of_people: 0
      }, {
        id:4,
        image: 'static/img/index/hats.jpg',
        title: 'Hats',
        num_of_people: 0
      }, {
        id:5,
        image: 'static/img/index/honey.jpg',
        title: 'Honey',
        num_of_people: 0
      }, {
        id:6,
        image: 'static/img/index/morning.jpg',
        title: 'Morning',
        num_of_people: 0
      }, {
        id:7,
        image: 'static/img/index/vegetables.jpg',
        title: 'Vegetables',
        num_of_people: 0
      }]
    }
  },
  methods:{
    goToChat(tile){
      this.$router.push({ path: '/chat/'+tile.id})
    },
      getOnlineNum(){

      this.$http.post(this.HOST+'/onlineNum', {rooms: this.list.length})
          .then( (res) => {
              let data = res.data
              if (!!data) {
                this.numList = data.onlineNum
                for (let i = 0; i < this.list.length; i++) {
                  this.list[i].num_of_people = this.numList[i+1]
                }
              }
          })
          .catch(function (err) {
            console.log(err)
          })
    }
  },
  mounted(){
    this.getOnlineNum()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.gridlist-demo-container
  display: flex
  flex-wrap: wrap
  justify-content: space-around


.gridlist
  width: 500px
  overflow-y: auto
  height: 100%
  margin-bottom: 50px

html,body,.gridlist-demo-container
  height: 100%

.appbar-search-field
  color: #FFF
  margin-bottom: 0
  &.focus-state 
    color: #FFF
  mu-text-field-hint 
    color: fade(#FFF, 54%)
  mu-text-field-input 
    color: #FFF
  mu-text-field-focus-line 
    background-color: #FFF
    
</style>
