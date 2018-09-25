<template>
  <div class="components-container">
     <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        xxxx
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
       xxxx
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        xxxx
      </el-col>
    </el-row>
     <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
       <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :z-index="20"/>
       <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="markdown2Html">To HTML</el-button>
       <div v-html="html"/>
    </el-row>
  </div>   
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
const content = `
**this is test**

* vue
* element
* webpack

## Simplemde
`

export default {
  name: 'Blog',
  components: { MarkdownEditor },
  data() {
    return {
      content: content,
      html: ''
    }
  },
  methods: {
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.content)
      })
    }
  }
}
</script>

