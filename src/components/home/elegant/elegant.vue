<template>
  <div style="background-color: white;height: 100%;">
    <div class="elegant">
      <div class="elegant_left">
        <ul >
          <a v-for="(item,index) in years.obj" :key="index" href="#home/elegant" @click.stop="()=>go(index)" :id="'title'+index" class="elegant_native" v-show="contents">{{item.year}}</a>
        </ul>
      </div>
      <div class="elegant_right">
        <div v-for="(items,index) in contents" :key="index" :id="index" class="elegant_content">
          <p class="elegant_stitle" >{{years.obj[index].year}}</p>
          <div class="elegant_mcontent">
            <div class="elegant_mscontent">
              <div v-for="(item,index) in items.content" :key="index" class="card elegant_scontent" @click="()=>details(item.id)">
                <div class="elegant_img">
                  <el-image
                    class="img"
                    :src="'http://47.112.132.177:8081/elegant/showimg/{id}?id=' + item.id"
                  >
                    <div slot="placeholder" class="image-slot pages1" style="margin-top: 90px" v-loading="true"/>
                    <div slot="placeholder" class="image-slot pages2" style="margin-top: 50px" v-loading="true"/>
                  </el-image>
                </div>
                <div class="elegant_information" style="overflow: hidden">
                  <li style="margin-top: 5px" v-if="item.articleName.length>=13" class="yonp3"><span class="elegant_font">赛事 ：{{item.articleName.slice(0,13)}}..</span></li>
                  <li style="margin-top: 5px" v-else class="yonp3"><span class="elegant_font">赛事 ：{{item.articleName}}</span></li>
                  <li style="margin-top: 5px" v-if="item.articleName.length>=8" class="yonp4"><span class="elegant_font">赛事 ：{{item.articleName.slice(0,8)}}..</span></li>
                  <li style="margin-top: 5px" v-else class="yonp4"><span class="elegant_font">赛事 ：{{item.articleName}}</span></li>
                  <li style="margin-top: 5px"><span class="elegant_font">奖项 ：{{item.articleAward}}</span></li>
                  <li style="margin-top: 5px"><span class="elegant_font">获奖日期 ：{{item.articleCt.slice(0,10)}}</span></li>
                  <li style="margin-top: 5px"><span class="elegant_font">比赛简介 ：</span></li>
                  <div style="text-indent: 2em;margin-top: 5px;line-height: 18px;font-size: 11px;color: black" class="yonp3">{{getContent(item.article_intro)}}...</div>
                  <div style="text-indent: 2em;margin-top: 5px;line-height: 18px;font-size: 11px;color: black" class="yonp4">{{getContent(item.article_intro.slice(0,50))}}...</div>
                </div>
              </div>
              <div v-if="items.content.length==0">
                <h1 style="text-align: center">暂无风采</h1>
              </div>
            </div>
            <el-pagination
              background
              :current-page="items.pageNum"
              layout="prev, pager, next"
              :page-size="1"
              :hide-on-single-page="true"
              @current-change="(currentPage)=>getPages(index,currentPage)"
              :total="items.totalPages"
              class="my-pagination pages1"
            >
            </el-pagination>
            <el-pagination
              background
              :current-page="items.pageNum"
              layout="prev, pager, next"
              :page-size="1"
              :small="true"
              :hide-on-single-page="true"
              @current-change="(currentPage)=>getPages(index,currentPage)"
              :total="items.totalPages"
              class="my-pagination pages2"
            >
            </el-pagination>
          </div>
          <hr style="margin-top: 15px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {reqElegants,reqElegantYears} from '../../../api/types'
  import store from 'store'
  export default {
    data(){
      return{
        contents:[],
        years:[],
        isActive:true,
        oldDoc:'title0',
        newDoc:'title0',
      }
    },
    async mounted() {
      var new_scroll_top = 0
      var old_scroll_top = 0
      this.years = await reqElegantYears()
      for(var i = 0;i<this.years.obj.length;i++){
        var result = await reqElegants(1,4,this.years.obj[i].year*1)
        this.contents.push(result.obj)
      }

        //默认为第一个小标题加样式
      $('#' + this.oldDoc).addClass('elegant_active')
      //滚动监听
      $(window).scroll(() => {
        //记录各个title的滚动高度
        var titles = document.getElementsByClassName("elegant_stitle");
        for (var i = 0; i < titles.length; i++) {
          (function (i) {
            if(titles[i].offsetTop-document.documentElement.scrollTop<=400){
              new_scroll_top = i
              if(new_scroll_top != old_scroll_top){
                $('#title' + new_scroll_top).addClass('elegant_active')
                $('#title' + old_scroll_top).removeClass('elegant_active')
                old_scroll_top = new_scroll_top
              }
            }
          })(i);
        }
      })
    },

    methods: {
      getContent(str){   //解码
        var intro = str.replace(/<br\/>/g, '\n').replace(/\&nbsp\;/g, ' ')
        return intro
      },
      go (a) {
        if (a === 0)
          $("html,body").animate({scrollTop: $("#" + a).offset().top}, 300);
        else
          $("html,body").animate({scrollTop: $("#" + a).offset().top}, 300);
      },
      details(id){
        store.set('haiChuangElegantNo',id)
        this.$router.push({
          path: 'details',
          name: 'details'
        })
      },
      //获取视频列表
      async getPages(index,currentPage){
        var result = await reqElegants(currentPage,4,this.years.obj[index].year*1)
        this.contents.splice(index,1,result.obj)
      },
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .elegant_scontent:hover{
    background-color: rgb(242,242,242);
    cursor: pointer;
  }
  .elegant_native{
    color: #666;
  }
  .elegant_active{
    color: #0052d9;
    border-right: 4px solid #0052d9;
  }
  .elegant_scontent{
    overflow: hidden;
  }
  @media screen and (min-width: 1400px){
    .yonp4{
      display: none;
    }
    .pages2{
      display: none;
    }
    .elegant{
      width: 1200px;
      margin: 50px auto 0;
    }
    ul{
      padding-left: 0px;
    }
    .elegant_left a{
      display: block;
      text-align: center;
      text-decoration: none;
      font-size: 24px;
      line-height: 60px;
      height: 60px;
      width: 200px;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .elegant_left a:hover{
      color: #0052d9;
    }
    .elegant_left{
      float: left;
      margin-top: 40px;
      width: 200px;
      position: fixed;
      transition: all .2s;
      transition-property: all;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
    .elegant_right{
      width: 900px;
      float: right;
    }
    .elegant_content{
      width: 900px;
      margin-left: 0px;
      margin-bottom: 40px;
    }
    .elegant_scontent{
      width: 380px;
      height: 400px;
      margin-left:60px;
      margin-bottom:30px;
      float: left;
      overflow: hidden;
    }
    .elegant_mcontent{
      margin-left: 0px;
    }
    .elegant_stitle{
      font-size: 2.2em;
      margin-bottom: 30px;
    }
    div.elegant_img{
      height: 200px;
      overflow: hidden;
    }
    div.elegant_img .img{
      width: 100%;
      margin: 0;
      padding: 0;
      height: 300px;
      transition: all 1s;
    }
    div.elegant_img .img:hover{
      transform: scale(1.2);
    }
    .elegant_mcontent:before,.elegant_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .elegant_mscontent:before,.elegant_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .elegant:before,.elegant:after{
      content: '';
      display: table;
      clear: both;
    }
    .my-pagination{
      float: right;
      margin-right:20px;
    }
  }
  @media screen and (min-width: 1000px)and (max-width: 1399px){
    .yonp4{
      display: none;
    }
    .pages2{
      display: none;
    }
    .elegant{
      width: 80vw;
      margin: 50px auto 0;
    }
    .elegant_left a{
      display: block;
      text-align: center;
      text-decoration: none;
      font-size: 1.5em;
      line-height: 60px;
      height: 60px;
      width: 13vw;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .elegant_left ul{
      padding: 0;
    }
    .elegant_left a:hover{
      color: #0052d9;
    }
    .elegant_left{
      float: left;
      margin-top: 40px;
      width: 18vw;
      position: fixed;
      transition: all .2s;
      transition-property: all;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
    .elegant_right{
      width: 62vw;
      float: right;
    }
    .elegant_content{
      width: 100%;
      margin-bottom: 40px;
    }
    .elegant_stitle{
      font-size: 2.2em;
      margin-bottom: 30px;
    }
    .elegant_scontent{
      width: 26vw;
      height: 420px;
      margin-bottom: 30px;
      margin-left:4vw;
      float: left;
      overflow: hidden;
    }
    .elegant_information{

    }
    .elegant_mcontent:before,.elegant_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .elegant_mscontent:before,.elegant_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.elegant_img{
      width: 100%;
      height: 200px;
      overflow: hidden;
    }
    div.elegant_img .img{
      width: 100%;
      padding: 0;
      margin: 0;
      height: 300px;
      transition: all 1s;
    }
    div.elegant_img .img:hover{
      transform: scale(1.2);
    }
    .elegant:before,.elegant:after{
      content: '';
      display: table;
      clear: both;
    }
    .my-pagination{
      float: right;
      margin-right:20px;
    }
  }
  @media screen and (min-width: 700px)and (max-width: 999px){
    .yonp4{
      display: none;
    }
    .pages2{
      display: none;
    }
    .elegant{
      width: 80vw;
      margin: 50px auto 0;
    }
    .elegant_left a{
      display: block;
      text-align: center;
      text-decoration: none;
      font-size: 1.5em;
      line-height: 60px;
      height: 60px;
      width: 18vw;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .elegant_left ul{
      padding: 0;
    }
    .elegant_left a:hover{
      color: #0052d9;
    }
    .elegant_left{
      float: left;
      margin-top: 40px;
      width: 20vw;
      position: fixed;
      transition: all .2s;
      transition-property: all;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }

    .elegant_right{
      width: 50vw;
      float: right;
    }
    .elegant_content{
      width: 100%;
      margin-bottom: 40px;
    }
    .elegant_stitle{
      font-size: 2.2em;
      margin-bottom: 30px;
    }
    .elegant_scontent{
      width: 40vw;
      height: 410px;
      margin-bottom: 20px;
      float: left;
      overflow: hidden;
    }
    .elegant_mcontent:before,.elegant_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .elegant_mscontent:before,.elegant_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.elegant_img{
      height: 200px;
      overflow: hidden;
    }
    div.elegant_img .img{
      width: 100%;
      height: 300px;
      overflow: hidden;
      transition: all 1s;
    }
    div.elegant_img .img:hover{
      transform: scale(1.2);
    }
    .elegant:before,.elegant:after{
      content: '';
      display: table;
      clear: both;
    }
    .my-pagination{
      float: right;
      margin-right:20px;
    }
  }
  @media screen and (min-width: 500px)and (max-width: 699px){
    .yonp4{
      display: none;
    }
    .pages1{
      display: none;
    }
    .elegant{
      width: 62vw;
      margin: 50px auto 0;
    }
    .elegant_left{
      display: none;
    }
    .elegant_right{
      width: 62vw;
      float: right;
    }
    .elegant_content{
      width: 100%;
      margin-bottom: 40px;
    }
    .elegant_stitle{
      font-size: 2.2em;
      margin-bottom: 30px;
    }
    .elegant_scontent{
      width: 50vw;
      margin-left:6vw;
      margin-bottom: 15px;
      float: left;
      height: 425px;
      overflow: hidden;

    }
    .elegant_mcontent:before,.elegant_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .elegant_mscontent:before,.elegant_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.elegant_img{
      height: 200px;
      overflow: hidden;
    }
    div.elegant_img .img{
      width: 100%;
      height: 300px;
      overflow: hidden;
      transition: all 1s;
    }
    div.elegant_img .img:hover{
      transform: scale(1.2);
    }
    .elegant:before,.elegant:after{
      content: '';
      display: table;
      clear: both;
    }
    .my-pagination{
      float: right;
    }
  }
  @media screen and (min-width: 320px)and (max-width: 499px){
    .yonp3{
      display: none;
    }
    .pages1{
      display: none;
    }
    .elegant{
      width: 100vw;
      margin: 0px auto 0;
    }
    .elegant_left{
      display: none;
    }
    .elegant_right{
      width: 100vw;
      margin-top: 30px;
    }
    .elegant_content{
      width: 100%;
      margin-bottom: 20px;
    }
    .elegant_stitle{
      font-size: 1.8em;
      margin-bottom: 15px;
    }
    .elegant_scontent{
      width: 45vw;
      height: 280px;
      margin-bottom: 10px;
      margin-left:3vw;
      float: left;
    }
    .elegant_mcontent:before,.elegant_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .elegant_mscontent:before,.elegant_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.elegant_img{
      height: 100px;
      overflow: hidden;
    }
    div.elegant_img .img{
      width: 100%;
      height: 150px;
      overflow: hidden;
      transition: all 1s;
    }
    div.elegant_img .img:hover{
      transform: scale(1.2);
    }
    .elegant_font{
      overflow: hidden;
      font-size: 12px;
      color: black
    }
    .elegant_active{
      color: #0052d9;
      background-color: #cccccc;
      border-bottom: 2px solid blue;
    }
    .elegant:before,.elegant:after{
      content: '';
      display: table;
      clear: both;
    }
    .my-pagination{
      float: right;
      margin-right:20px;
    }
  }
</style>


