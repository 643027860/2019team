<template>
  <div style="background-color: white;height: 100%">
    <div class="videos">
      <div class="videos_left">
        <ul>
          <a href="#home/videos" @click.stop="()=>choice(true)" :class="{'videos_active1':isYear,'videos_native1':!isYear}">年份</a>
          <a href="#home/videos" @click.stop="()=>choice(false)" :class="{'videos_active1':!isYear,'videos_native1':isYear}">组别</a>
        </ul>
        <ul v-if="isYear" class="yg">
          <a v-for="(item,index) in years" :key="index" href="#home/videos" @click.stop="()=>go(index)" :id="'title'+index" class="videos_native" v-show="videos">{{item}}</a>
        </ul>
        <ul v-else class="yg">
          <a v-for="(item,index) in groups" :key="index" href="#home/videos" @click.stop="()=>go(index)" :id="'title'+index" class="videos_native" v-show="groups">{{item.groupName}}</a>
        </ul>
      </div>
      <div class="videos_right" v-if="isYear">
        <div class="videos_content" v-for="(items,index) in videos" :key="index" :id="index"  v-show="videos">
          <p class="videos_stitle">{{years[index]}}</p>
          <div class="videos_mcontent">
            <div class="videos_mscontent">
              <div v-for="(item,index) in items.content" :key="index" class="card videos_scontent" @click="()=>getDetail(item.id)" v-if="items.content.length>0">
                <div class="videos_img">
                  <div class="videos_img">
                    <el-image
                      class="img"
                      :src="'http://47.112.132.177:8081/video/showimg/{id}?id=' + item.id"
                    >
                      <div slot="placeholder" class="image-slot page3" style="margin-top: 90px" v-loading="true"/>
                      <div slot="placeholder" class="image-slot page4" style="margin-top: 50px" v-loading="true"/>
                    </el-image>
                  </div>
                </div>
                <div class="videos_information">
                  <li style="margin-top: 5px;" v-if="item.videoName.length>13"><span class="videos_font">名称 ：{{item.videoName.slice(0,13)}}..</span></li>
                  <li style="margin-top: 5px;" v-else><span class="videos_font">名称 ：{{item.videoName}}</span></li>
                  <li style="margin-top: 5px"><span class="videos_font">录制日期 ：{{item.createTime.slice(0,10)}}</span></li>
                  <li style="margin-top: 5px"><span class="videos_font">视频介绍 ：</span></li>
                  <div style="text-indent: 2em;margin-top: 5px;line-height: 20px;font-size: 11px" class="yonp1">{{getContent(item.videoIntro.slice(0,100))}}..</div>
                  <div style="text-indent: 2em;margin-top: 5px;line-height: 20px;font-size: 11px" class="yonp2">{{getContent(item.videoIntro.slice(0,50))}}..</div>
                </div>
              </div>
            </div>
            <div v-if="items.content.length==0">
              <h1 style="text-align: center;margin: 20px auto 80px">暂无视频</h1>
            </div>
            <el-pagination
              background
              :current-page = "items.pageNum"
              layout="prev, pager, next"
              :page-size="1"
              :hide-on-single-page="true"
              @current-change="(currentPage)=>getPages(index,currentPage)"
              :total="items.totalPages"
              class="my-pagination page3"
            >
            </el-pagination>
            <el-pagination
              background
              :current-page = "items.pageNum"
              layout="prev, pager, next"
              :page-size="1"
              :small="true"
              :hide-on-single-page="true"
              @current-change="(currentPage)=>getPages(index,currentPage)"
              :total="items.totalPages"
              class="my-pagination page4"
            >
            </el-pagination>
          </div>
          <hr style="margin-top: 20px">
        </div>
      </div>
      <div class="videos_right" v-else>
        <div class="videos_content" v-for="(items,index) in videoss" :key="index" :id="index"  v-if="groups">
          <p class="videos_stitle">{{groups[index].groupName}}</p>
          <div class="videos_mcontent">
            <div class="videos_mscontent">
              <div v-for="(item,index) in items.content" :key="index" class="card videos_scontent" @click="()=>getDetail(item.id)" v-if="items.content.length>0">
                <div class="videos_img">
                  <el-image
                    class="img"
                    :src="'http://47.112.132.177:8081/video/showimg/{id}?id=' + item.id"
                  >
                    <div slot="placeholder" class="image-slot page3" style="margin-top: 90px" v-loading="true"/>
                    <div slot="placeholder" class="image-slot page4" style="margin-top: 50px" v-loading="true"/>
                  </el-image>
                </div>
                <div class="videos_information">
                  <li style="margin-top: 5px;" v-if="item.videoName.length>13"><span class="videos_font">名称 ：{{item.videoName.slice(0,13)}}..</span></li>
                  <li style="margin-top: 5px;" v-else><span class="videos_font">名称 ：{{item.videoName}}</span></li>
                  <li style="margin-top: 5px"><span class="videos_font">录制日期 ：{{item.createTime.slice(0,10)}}</span></li>
                  <li style="margin-top: 5px"><span class="videos_font">视频介绍 ：</span></li>
                  <div style="text-indent: 2em;margin-top: 5px;line-height: 20px;font-size: 11px" class="yonp1">{{getContent(item.videoIntro)}}...</div>
                  <div style="text-indent: 2em;margin-top: 5px;line-height: 20px;font-size: 9px" class="yonp2">{{getContent(item.videoIntro).slice(0,50)}}..</div>
                </div>
              </div>
              <div v-if="items.content.length==0">
                <h1 style="text-align: center;margin: 20px auto 80px">暂无视频</h1>
              </div>
            </div>
            <el-pagination
            background
            :current-page = "items.pageNum"
            layout="prev, pager, next"
            :page-size="1"
            :hide-on-single-page="true"
            @current-change="(currentPage)=>getPages(index,currentPage)"
            :total="items.totalPages"
            class="my-pagination page3"
          >
          </el-pagination>
          <el-pagination
            background
            :current-page = "items.pageNum"
            layout="prev, pager, next"
            :page-size="1"
            :small="true"
            :hide-on-single-page="true"
            @current-change="(currentPage)=>getPages(index,currentPage)"
            :total="items.totalPages"
            class="my-pagination page4"
          >
          </el-pagination>
          </div>
          <hr style="margin-top: 20px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {reqVideoYears,reqVideos,reqGroups,reqGroupsVideos} from '../../../api/types'
  import store from 'store'
  export default {
    data(){
      return{
        videos:[],
        years:[],
        isActive:true,
        oldDoc:'title0',
        newDoc:'title0',
        groups:[],
        videoss:[],
        isYear:true//是否按年份查视频
      }
    },
    computed:{

    },
    async mounted() {
      var new_scroll_top = 0
      var old_scroll_top = 0

      //初始化数据
      var year = await reqVideoYears()
      this.years = year.obj
      for(var i = 0;i<this.years.length;i++){
        var result = await reqVideos(1,4,this.years[i]*1)
        this.videos.push(result.obj)
      }
      var group = await reqGroups()
      this.groups = group.obj
      for(var i = 0;i<this.groups.length;i++){
        var result = await reqGroupsVideos(this.groups[i].id,1,4)
        this.videoss.push(result.obj)
      }
      //默认为第一个小标题加样式
      $('#' + this.oldDoc).addClass('videos_active')
      //滚动监听
      $(window).scroll(() => {
        //记录各个title的滚动高度
        var titles = document.getElementsByClassName("videos_stitle");
        for (var i = 0; i < titles.length; i++) {
          (function (i) {
            if(titles[i].offsetTop-document.documentElement.scrollTop<=400){
              new_scroll_top = i
              if(new_scroll_top !=old_scroll_top ){
                $('#title' + new_scroll_top).addClass('videos_active')
                $('#title' + old_scroll_top).removeClass('videos_active')
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
          $("html,body").animate({scrollTop: $("#" + a).offset().top - 100}, 300);
        else
          $("html,body").animate({scrollTop: $("#" + a).offset().top - 70}, 300);
      },
      async choice(YON){
        this.isYear = YON
      },
      getDetail(id){
        store.set('haiChuangVideoNo',id)
        this.$router.push(
          {
            path:"videoDetails",
            name:"videoDetails"
          }
        )
      },
      //获取视频列表
      async getPages(index,currentPage){
        if(this.isYear){
          var result = await reqVideos(currentPage,4,this.years[index]*1)
          this.videos.splice(index,1,result.obj)
        }
        else{
          var result = await reqGroupsVideos(this.groups[index].id,currentPage,4)
          this.videoss.splice(index,1,result.obj)
        }
      },
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .videos_active1{
    width: 50% !important;
    float: left;
    background-color: #409EFF;
  }
  .videos_native1{
    width: 50%!important;
    float: left;
    color: #666;
  }
  .yg:before,.yg:after{
    display: table;
    content: '';
    clear: both;
  }
  .videos_native{
    color: #666;
  }
  .videos_active{
    color: #0052d9;
    border-right: 4px solid #0052d9;
  }
  .videos_scontent:hover{
    background-color: rgb(242,242,242);
    cursor: pointer;
  }
  .videos_information{
    overflow: hidden;
  }
  @media screen and (min-width: 1400px){
    .page4{
      display: none;
    }
    .yonp2{
      display: none;
    }
    .videos_stitle{
      font-size: 2.2em;
      margin-bottom: 30px;
    }
    .videos_font{
      font-size: 18px;
      color: black
    }
    .videos{
      width: 1200px;
      margin: 50px auto 0;
    }
    div.videos_img{
      height: 200px;
      overflow: hidden;
    }
    div.videos_img .img{
      width: 100%;
      height: 300px;
      overflow: hidden;
      transition: all 1s;
    }
    div.videos_img .img:hover{
      transform: scale(1.2);
    }
    ul{
      padding-left: 0px;
    }
    .videos_left a{
      display: block;
      text-align: center;
      text-decoration: none;
      font-size: 24px;
      line-height: 60px;
      height: 60px;
      width: 100%;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .videos_left a:hover{
      color: #0052d9;
    }
    .videos_left{
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
    .videos_right{
      width: 900px;
      float: right;
    }
    .videos_content{
      width: 900px;
      margin-left: 0px;
      margin-top: 40px;
    }
    .videos_scontent{
      width: 380px;
      height: 400px;
      margin-left:60px;
      margin-bottom:30px;
      float: left;
      overflow: hidden;
    }
    .videos_mcontent{
      margin-left: 0px;
    }
    .videos_mcontent:before,.videos_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .videos_mscontent:before,.videos_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .my-pagination{
      float: right;
      margin: 0;
      margin-right:20px;
    }
  }
  @media screen and (min-width: 1000px)and (max-width: 1399px){
    .page4{
      display: none;
    }
    .yonp2{
      display: none;
    }
    .videos{
      width: 80vw;
      margin: 50px auto 0;
    }
    .videos_font{
      font-size: 16px;
      color: black
    }
    .videos_left a{
      display: block;
      text-align: center;
      text-decoration: none;
      font-size: 1.5em;
      line-height: 60px;
      height: 60px;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .videos_left ul{
      padding: 0;
      width: 13vw;
    }
    .videos_left a:hover{
      color: #0052d9;
    }
    .videos_left{
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

    .videos_right{
      width: 62vw;
      float: right;
    }
    .videos_content{
      width: 100%;
      margin-top: 40px;
    }
    .videos_stitle{
      font-size: 2.2em;
      margin-bottom: 30px;
    }
    .videos_scontent{
      width: 26vw;
      height: 420px;
      margin-bottom: 30px;
      margin-left:4vw;
      float: left;
      overflow: hidden;
    }
    .videos_mcontent:before,.videos_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .videos_mscontent:before,.videos_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.videos_img{
      height: 200px;
      overflow: hidden;
    }
    div.videos_img .img{
      width: 100%;
      height: 300px;
      overflow: hidden;
      cursor: pointer;
      transition: all 1s;
    }
    div.videos_img .img:hover{
      transform: scale(1.2);
    }
    .my-pagination{
      float: right;
      margin-right:20px;
    }
  }
  @media screen and (min-width: 700px)and (max-width: 999px){
    .page4{
      display: none;
    }
    .yonp2{
      display: none;
    }
    .videos{
      width: 80vw;
      margin: 50px auto 0;
    }
    .videos_font{
      font-size: 16px;
      color: black
    }
    .videos_left a{
      display: block;
      text-align: center;
      text-decoration: none;
      font-size: 1.5em;
      line-height: 60px;
      height: 60px;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .videos_left ul{
      padding: 0;
      width: 18vw;
    }
    .videos_left a:hover{
      color: #0052d9;
    }
    .videos_left{
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

    .videos_right{
      width: 50vw;
      float: right;
    }
    .videos_content{
      width: 100%;
      margin-top: 40px;
    }
    .videos_stitle{
      font-size: 2.2em;
      margin-bottom: 30px;
    }
    .videos_scontent{
      width: 40vw;
      height: 410px;
      margin-bottom: 20px;
      float: left;
      overflow: hidden;
    }
    .videos_mcontent:before,.videos_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .videos_mscontent:before,.videos_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.videos_img{
      height: 200px;
      overflow: hidden;
    }
    div.videos_img .img{
      width: 100%;
      cursor: pointer;
      height: 300px;
      overflow: hidden;
      transition: all 1s;
    }
    div.videos_img .img:hover{
      transform: scale(1.2);
    }
    .my-pagination{
      float: right;
      margin-right:20px;
    }
  }
  @media screen and (min-width: 500px)and (max-width: 699px){
    .page3{
      display: none;
    }
    .yonp2{
      display: none;
    }
    .videos{
      width: 90vw;
      margin-top:50px;
      margin: auto;
    }
    .videos_font{
      font-size: 16px;
      color: black
    }
    .videos_left a{
      display: block;
      text-align: center;
      text-decoration: none;
      font-size: 1.2em;
      line-height: 60px;
      height: 60px;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .videos_left ul{
      padding: 0;
      width: 20vw;
    }
    .videos_left a:hover{
      color: #0052d9;
    }
    .videos_left{
      float: left;
      margin-top: 40px;
      width: 20vw;
      margin-left: 5vw;
      position: fixed;
      transition: all .2s;
      transition-property: all;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }

    .videos_right{
      width: 50vw;
      float: right;
    }
    .videos_content{
      width: 100%;
      margin-top: 40px;
    }
    .videos_stitle{
      font-size: 1.5em;
      margin-bottom: 30px;
    }
    .videos_scontent{
      width: 45vw;
      height: 425px;
      margin-bottom: 20px;
      float: left;
      overflow: hidden;
    }
    .videos_mcontent:before,.videos_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .videos_mscontent:before,.videos_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.videos_img{
      height: 200px;
      overflow: hidden;
    }
    div.videos_img .img{
      width: 100%;
      cursor: pointer;
      height: 300px;
      overflow: hidden;
      transition: all 1s;
    }
    div.videos_img .img:hover{
      transform: scale(1.2);
    }
    .my-pagination{
      float: right;
      margin-right:20px;
      margin-bottom: 15px;
    }
  }
  @media screen and (min-width: 320px)and (max-width: 490px){
    .videos_active1{
      padding: 0!important;
    }
    .videos_native1{
      padding: 0!important;
    }
    .page3{
      display: none;
    }
    .yonp1{
      display: none;
    }
    .yg{
      display: none;
    }
    .videos{
      width: 100vw;
      margin: 30px auto 0;
    }
    .videos_left a{
      display: inline-block;
      text-align: center;
      text-decoration: none;
      font-size: 1.1em;
      padding: 0 5px;
      line-height: 30px;
      height: 30px;
      min-width: 20vw;
      width: auto;
      border-bottom: 1px solid rgb(242,242,242);
      border-top: 1px solid rgb(242,242,242);
    }
    .videos_left ul{
      padding: 0;
    }
    .videos_left a:hover{
      color: #0052d9;
    }
    .videos_left{
      width: 100vw;
      background-color: white;
      z-index: 9999;
      height: 30px;
      transition: all .2s;
      transition-property: all;
      transition-duration: 0.2s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }

    .videos_right{
      width: 100vw;
      margin-top: 10px;
    }
    .videos_content{
      width: 100%;
      margin: 20px 0;
    }
    .videos_stitle{
      font-size: 1.6em;
      margin-bottom: 26px;
      margin-left: 3vw;
    }
    .videos_scontent{
      width: 45vw;
      height: 280px;
      margin-bottom: 10px;
      margin-left:3vw;
      float: left;
      overflow: hidden;
    }
    .videos_mcontent:before,.videos_mcontent:after{
      content: '';
      display: table;
      clear: both;
    }
    .videos_mscontent:before,.videos_mscontent:after{
      content: '';
      display: table;
      clear: both;
    }
    div.videos_img{
      height: 100px;
      overflow: hidden;
    }
    div.videos_img .img{
      width: 100%;
      height: 150px;
      overflow: hidden;
      transition: all 1s;
    }
    div.videos_img .img:hover{
      transform: scale(1.2);
    }
    .videos_font{
      height: 18px;
      line-height: 18px;
      overflow: hidden;
      font-size: 12px;
      color: black
    }
    .videos_active{
      color: #0052d9;
      background-color: cornsilk;
      border-bottom: 2px solid blue;
    }
    .videos:before,.videos:after{
      content: '';
      display: table;
      clear: both;
    }
    videos_information li{
      height: 20px;
      overflow: hidden;
    }
    .my-pagination{
      float: right;
      margin-right:20px;
    }
  }
</style>


