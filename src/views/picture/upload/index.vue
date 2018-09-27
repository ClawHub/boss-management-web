<template>
  <div class="app-container">
     <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>上传图片</span>
          </div>
          <div class="component-item">
            <picture-input 
              ref="pictureInput"
              width="400" 
              height="400"
              margin="16" 
              buttonClass="el-button el-button--primary"
              removeButtonClass="el-button el-button--danger"
              accept="image/jpeg,image/png" 
              size="1" 
              :removable="true"
              :custom-strings="{
                upload: '<h1>Bummer!</h1>',
                drag: 'Drag a 😺 GIF or GTFO'
              }"
              @change="onChange">
            </picture-input>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>详情</span>
          </div>
          <div class="component-item">
             <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="alt">
                <el-input v-model="form.alt"></el-input>
              </el-form-item>
               <el-form-item label="classify">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即上传</el-button>
                <el-button @click="clearForm">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import { upload } from '@/api/picBed'
export default {
  name: 'Upload',
  data () {
    return {
      dynamicTags: ['default'],
      inputVisible: false,
      inputValue: '',
      form: {
        image: '',
        title: '',
        alt: 'this is bad pic!',
        classify: ''
      }
    }
  },
  components: {
    PictureInput
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    clearForm () {
      this.form.image = ''
      this.form.title = ''
      this.form.alt = 'this is bad pic!'
      this.form.classify = ''
    },
    onSubmit () {
       console.log('onSubmit')
       this.form.classify = this.dynamicTags.toString()
      upload(this.form).then(response => {
        console.log(response.data)
        this.clearForm()
      })
    },
    onChange () {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        console.log('Picture loaded.')
        this.form.image = this.$refs.pictureInput.image
        this.form.title = this.$refs.pictureInput.file.name
        console.log(this.$refs.pictureInput.file)
        console.log(this.$refs.pictureInput.image)
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  }
}
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
