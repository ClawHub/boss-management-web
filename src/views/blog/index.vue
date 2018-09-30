<template>
  <div class="components-container">
   
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;width: 88%;" type="success" @click="submitForm">发布</el-button>
        <el-button v-loading="loadingRefresh" style="margin-left: 10px;width: 10%;" type="primary" @click="refreshBlog">刷新blog</el-button>
      </sticky>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-form-item style="margin-bottom: 40px;" prop="title">
            <MDinput v-model="postForm.title" :maxlength="100" name="name" required>标题</MDinput>
          </el-form-item>
          <el-form-item  label-width="10%" label="副标题:">
            <el-input :rows="1" v-model="postForm.subtitle"  placeholder="请输入内容"/>
            <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                <el-autocomplete
                    class="inline-input"
                    v-model="postForm.author"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect">
                  </el-autocomplete>
                </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                <el-date-picker v-model="postForm.displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
              </el-form-item>
            </el-col>
          </el-row>
           <el-form-item label="tags">
              <el-tag
                :key="tag"
                v-for="tag in postForm.tags"
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
        </el-col>
        <el-col :span="12">
          <el-card>
            <img style="margin-bottom: 20px;" :src="postForm.headerImg" width="100%"/>
            <el-input
              placeholder="请输入内容"
              v-model="postForm.headerImg"
              clearable>
            </el-input>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <markdown-editor id="contentEditor" ref="contentEditor" v-model="postForm.content" :height="300" :z-index="20"/>
      </el-row>
    </el-form>
  </div>   
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { parseTime } from '@/utils'
import { refreshBlog, submit } from '@/api/blog'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  author: '',//作者
  displayTime: undefined, // 前台展示时间
  tags: ['default'],
  headerImg: '', // 文章图片
  subtitle: '', // 文章摘要
  content: '' // 文章内容
}

export default {
  name: 'Blog',
  components: { MarkdownEditor, MDinput, Sticky },
  data () {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      inputVisible: false,
      inputValue: '',
      restaurants: [],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      loadingRefresh: false,
      rules: {
        title: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.postForm.tags.splice(this.postForm.tags.indexOf(tag), 1);
    },
    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.postForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect (item) {
      console.log(item);
    },
    refreshBlog () {
      refreshBlog().then(response => {
        console.log(response.data)
        this.$notify({
          title: '成功',
          message: response.data,
          type: 'success',
          duration: 2000
        })
        this.loadingRefresh = false
      })

    },
    submitForm () {
      this.postForm.displayTime = parseTime(this.postForm.displayTime)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          submit(this.postForm).then(response => {
            console.log(response.data)
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            this.postForm.status = 'published'
            this.loading = false
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loadAll () {
      return [
        { "value": "ClawHub" },
        { "value": "Li Zhiming" }
      ];
    },
  },
  mounted () {
    this.restaurants = this.loadAll();
  },
  computed: {
    contentShortLength () {
      return this.postForm.subtitle.length
    }
  },
}
</script>


