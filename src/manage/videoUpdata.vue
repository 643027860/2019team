<template>
  <div class="upload-element" v-loading="loading">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
      <el-form-item label="视频名称" prop="videoName">
        <el-input v-model="ruleForm.videoName" class="manage_input"></el-input>
      </el-form-item>
      <el-form-item label="组别" prop="videoGroup">
        <el-select v-model="ruleForm.videoGroup" placeholder="选择组别">
          <el-option v-for="(item,index) in groups" :key="index" :label="item.groupName" :value="item.id" v-if="groups"/>
        </el-select>
      </el-form-item>
      <el-form-item label="录制时间" prop="date">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width:180px"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="视频详情" prop="videoDetail">
      </el-form-item>
      <div style="width: 90%;margin-left: 100px;margin-top: -30px;margin-bottom: 20px">
        <div id="editor" style="height:300px;" ref="editor">
        </div>
      </div>
      <el-form-item label="上传视频" ref="uploadElement" prop="video">
        <el-input v-model="ruleForm.video" v-if="false"></el-input>
        <el-upload
          class="avatar-uploader"
          style="float: left"
          ref="upload"
          :show-file-list="false"
          action="#"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :auto-upload="false"
          accept="video/*"
          :data="ruleForm">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <video
          controls
          aspectRatio="16:9"
          fluid
          width="200px"
          height="180px"
          ref="video"
          :style="{'display':isShow}"
        >
        </video>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="go">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'
  import {reqVideoDetails,reqGroups} from '../api/types'
  import E from 'wangeditor'
  import store from 'store'
  export default {
    data() {
      return {
        loading:false,
        videoId:'',
        videoDetail: '',
        isShow:'none',
        groups:'',
        ruleForm: {
          video:'',
          videoName: '',
          uploadFile: '',
          videoGroup:'',
          date:''
        },
      }
    },
    async mounted(){
      this.editor = new E('editor')
      this.editor.onchange = function () {
        this.videoDetail = this.$txt.html()
      }
      this.editor.create()
      this.videoId = store.get('updatavideoid')
      if(this.videoId){
        var result = await reqGroups()
        this.groups = result.obj
        this.videoGroup = this.groups[0]
        this.reqVideo()
      }
    },
    methods: {
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.ruleForm.uploadFile=''
        this.isShow = 'none'
        this.$refs.video.src = ''
        this.editor.$txt.html('')
      },

      handleChange (file, fileList) {
        this.$refs.video.src= URL.createObjectURL(file.raw)
        this.$refs.video.load()
        this.isShow = 'block'
        this.ruleForm.uploadFile = file.raw;
      },

      beforeUpload (file) {
      },

      formatDate(date){
        var year = date.getFullYear()
        if(date.getMonth()*1>=9){
          var month = date.getMonth()*1 +1
        }
        else
          var month = 0 + '' + (date.getMonth()*1 +1)
        if(date.getDate()*1>9)
          var day = date.getDate()
        else
          var day = 0 + '' + date.getDate()
        return year + '-' + month + '-' + day
      },

      go () {
        const {uploadFile,videoName,videoGroup,date} = this.ruleForm
        if(this.videoId&&videoName.trim()&&videoGroup&&this.editor.$txt.text().trim()&&uploadFile&&date){
          this.loading = true
          if(typeof videoGroup == 'string')
            var group = this.groups.filter(item=>item.groupName==videoGroup)[0].id
          else
            var group = videoGroup
          if(typeof date == 'object')
            var createTime = this.formatDate(date)
          else
            var createTime = date
          let param = new FormData(); //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
          param.append('id',this.videoId)
          param.append('createTime ',createTime)
          param.append('uploadFile',uploadFile)
          param.append('videoDetail',this.editor.$txt.html())
          param.append('videoGroup',group)
          param.append('videoName',videoName.trim())
          let config = {
            headers:{
              'Content-Type':'multipart/form-data',
            }
          };
          axios.post('http://47.112.132.177:8084/video/update',param,config)
            .then(response=>{
              this.loading = false
              var result = response.data
              if(result.status == 200)    /*上传成功清空输入框*/
              {
                this.resetForm('ruleForm')
                this.editor.$txt.html('')
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:'1000'
                });
              }else{
                this.$message({
                  message: '该视频序号不存在，修改失败',
                  type: 'error',
                  duration:'1000'
                });
              }
            }).catch(err => console.log(err))
        }else{
          this.$message({
            message: '请输入需要修改的视频Id',
            type: 'warning',
            duration:'1000'
          });
        }
      },

      async reqVideo(){
        this.loading = true
        var result = await reqVideoDetails(this.videoId)
        if(result.status == 200){
          this.loading = false
          var obj = result.obj
          this.editor.$txt.html(obj.videoDetail)
          this.ruleForm.date = obj.createTime
          this.ruleForm.videoGroup = this.groups.filter(item=>item.id== obj.videoGroup)[0].id
          this.ruleForm.videoName = obj.videoName
          this.ruleForm.video = obj.videoUrl
          this.ruleForm.uploadFile = obj.videoUrl
          this.$refs.video.src = 'http://47.112.132.177:8081/video/showVideo/' + this.videoId
          this.$refs.video.load()
          this.isShow = 'block'
        } else if(result.status == 500){
          this.loading = false
          this.$message({
            message: '没有对应ID的视频',
            type: 'warning',
            duration:'1000'
          });
        }else{
          this.$message({
            message: '网络出现错误',
            type: 'error',
            duration:'2000'
          });
        }
      }
    },
  }
</script>
<style>
  video:focus{
    outline: 0;
  }
  .manage_textarea{
    width: 600px;
  }
  input[type="file"] {
    display: none;
  }
  .upload-element{
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .manage_input{
    width: 300px;
  }
  .manage_textarea{
    width: 800px;
  }
</style>
