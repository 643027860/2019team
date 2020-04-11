<template>
    <div class="elegantlists">
      <div class="title">
        <span style="width: 15%"><span style="padding-left: 10px">风采日期</span></span>
        <span style="width: 20%"><span style="padding-left: 10px">风采赛事</span></span>
        <span style="width: 25%"><span style="padding-left: 10px">风采介绍</span></span>
        <span style="width: 15%"><span style="padding-left: 10px">风采图片</span></span>
        <span style="width: 10%"><span style="padding-left: 10px">操作</span></span>
        <span style="width: 15%"><span style="padding-left: 10px">年份:</span>
          <span style="width: 60%;margin-left: 20px">
            <el-select v-model="year" placeholder="请选择年份">
            <el-option
              v-for="(item,index) in years"
              :key="index"
              :label="item.year"
              :value="item.year*1"
              v-if="years"
            >
            </el-option>
            </el-select>
          </span>
        </span>
      </div>
      <div class="body" style="font-size: 16px">
        <div v-if="lists.length==0" style="height: 58px;line-height: 58px;border-top: 1px solid rgb(244,247,249);" class="list"><span style="margin-left: 47%;font-size: 16px">暂无数据</span></div>
        <div v-else style="height: 500px;">
          <div class="list" v-for="(list,index) in lists" :key="index">
            <li style="width: 15%"><span style="padding-left: 10px">{{list.articleCt.slice(0,10)}}</span></li>
            <li style="width: 20%" v-if="list.articleName.length>12"><span style="padding-left: 10px">{{list.articleName.slice(0,12)}}..</span></li>
            <li style="width: 20%" v-else><span style="padding-left: 10px">{{list.articleName}}</span></li>
            <li style="width: 25%"><span style="padding-left: 10px;color: blue;width: 85%;overflow: hidden">{{getContent(list.article_intro).slice(0,22)}}...</span></li>
            <li style="width: 15%">
            <span style="padding-left: 10px">
              <div style="max-height: 54px;width: 80px;display: inline-block;line-height: 59px;margin-top: 5px;overflow: hidden">
                  <el-image
                    class="img"
                    :src="'http://47.112.132.177:8081/elegant/showimg/{id}?id=' + list.id"
                  >
                    <div slot="placeholder" class="image-slot"/>
                  </el-image>
                </div>
            </span>
            </li>
            <li style="width: 10%"><span ><el-button round icon="el-icon-edit" style="height: 30px;padding: 7px 16px;" @click="()=>updata(list.id)">修改</el-button></span></li>
          </div  >
        </div>
      </div>
      <div class="page">
        <el-pagination
          background
          :current-page="all.pageNum"
          layout="prev, pager, next"
          :page-size="1"
          @current-change="(currentPage)=>getPages(currentPage)"
          :total="all.totalPages"
          :hide-on-single-page="true"
        >
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import {reqElegantYears,reqElegants} from '../api/types'
  import store from 'store'
  export default {
    data(){
      return {
        lists:[],
        years:[],
        year:'',
        pageSize:8,
        all:{
          pageNum:1,
          totalPages:2,
        }
      }
    },
    methods:{
      getContent(str){   //解码
        var intro = str.replace(/<br\/>/g, '\n').replace(/\&nbsp\;/g, ' ')
        return intro
      },
      //获取风采列表
      async getPages(currentPage){
        var result = await reqElegants(currentPage,this.pageSize,this.year)
        if(result.status == 200){
          this.all = result.obj
          this.lists = this.all.content
        }
      },
      /*修改*/
      updata(id){
        this.$router.push({
          path:'/elegantUpdata',
        })
        store.set('updataelegantid',id)
      }
    },
    async mounted () {
      var result = await reqElegantYears()
      if(result.status==200){
        this.years = result.obj
        if(this.years.length>0)
          this.year = this.years[0].year*1
      }else{
        return false
      }
    },
    watch:{
      year(newval,oldval){
        this.getPages(1)
      }
    }
  }
</script>

<style>
  *{
    margin: 0;
    border: 0;
    padding: 0;
  }
  .elegantlists{
    background-color: white;
  }
  .elegantlists .title{
    height: 48px;
    line-height: 48px;
  }
  .elegantlists .title span{
    font-size: 14px;
    display: inline-block;
    color: rgb(144,147,166);
    float: left;
  }
  .elegantlists .title:before,.elegantlists .title:after{
    display: table;
    content: '';
    clear: both;
  }

  .elegantlists .body{
    border-bottom: 1px solid rgb(244,247,249);
  }
  .elegantlists .body div{
    display: block;
  }
  .elegantlists .body div.list:hover{
    background-color: rgb(249,250,252);
  }
  .elegantlists .body div:before,.elegantlists .body div:after{
    display: table;
    content: '';
    clear: both;
  }
  .elegantlists .body li{
    float: left;
    display: inline-block;
    height: 59px;
    list-style: none;
    border-top: 1px solid rgb(244,247,249);
    line-height: 59px;
  }
  .elegantlists .body:before,.elegantlists .body:after{
    display: table;
    content: '';
    clear: both;
  }
  .elegantlists .page{
    display: inline-block;
    margin-left: 45%;
  }
</style>
