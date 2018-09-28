<template>
<div>
  <div  class="components-container">
    <div class="filter-container">
      <el-row :gutter="10" style="margin-top:10px;">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
          <el-input :placeholder="$t('table.tags')" v-model="listQuery.tags" style="width: 50%;" class="filter-item" @keyup.enter.native="getPic"/>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">{{ $t('table.search') }}</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  <vue-preview :slides="slides" @close="handleClose"></vue-preview>
  <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
  <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
  <el-tooltip placement="top" content="tooltip">
    <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
  </el-tooltip>
</div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { fetchPic } from '@/api/picBed'
import BackToTop from '@/components/BackToTop'
export default {
  name: 'View',
  components: { BackToTop },
  directives: {
    waves
  },
  data () {
    return {
      slides: [],
      listQuery: {
        tags: 'default'
      },
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  created () {
    this.getPic()
  },
  methods: {
    handleClose () {
      console.log('close event')
    },
    getPic () {
      fetchPic(this.listQuery.tags).then(response => {
        console.log(response.data)
        this.slides = response.data
      })
    }
  },
}
</script>
<style >
.my-gallery {
  display: flex;
  flex-wrap: wrap;
}
</style>
