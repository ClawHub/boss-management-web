<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="filterText" style="width: 200px;" class="filter-item"/>
    </div>
     <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>资源树</span>
          </div>
          <div class="component-item">
            <el-tree 
              class="filter-tree"
              :data="data" 
              :props="defaultProps"   
              default-expand-all
              :filter-node-method="filterNode" 
              @node-click="handleNodeClick"
              ref="tree"> 
            </el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>资源详情</span>
          </div>
          <div class="component-item">
             <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="资源名称">
                <el-input v-model="form.resourceName"></el-input>
              </el-form-item>
              <el-form-item label="资源URL">
                <el-input v-model="form.url"></el-input>
              </el-form-item>
               <el-form-item label="资源类型">
                <el-radio-group v-model="form.resourceType">
                  <el-radio label="button"></el-radio>
                  <el-radio label="menu"></el-radio>
                </el-radio-group>
              </el-form-item>
               <el-form-item label="权限字符串">
                <el-input v-model="form.permission"></el-input>
              </el-form-item>
              <el-form-item label="父资源名称">
                <el-input :disabled="true" v-model="form.parentName"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
let id = 1000;
import waves from '@/directive/waves' // 水波纹指令
import { fetchTree, addResource } from '@/api/resource'
export default {
  name: 'Resource',
  directives: {
    waves
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data () {
    return {
      filterText: '',
      form: {
        resourceName: '',
        url: '',
        resourceType: '',
        permission: '',
        parentId: '',
        parentName: '',
        parentIds: '',
        remark: ''
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      }
    };
  },
  created () {
    this.getResourceTree()
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.resourceName.indexOf(value) !== -1;
    },
    getResourceTree () {
      fetchTree().then(response => {
        console.log(response.data)
        this.data = response.data
      })
    },
    handleNodeClick (data) {
      console.log(data);
      this.form.parentId = data.resourceId
      this.form.parentIds = data.parentIds + ',' + data.resourceId
      this.form.parentName = data.resourceName
    },
    clearForm () {
      this.form.parentId = ''
      this.form.resourceName = ''
      this.form.url = ''
      this.form.resourceType = ''
      this.form.permission = ''
      this.form.parentId = ''
      this.form.parentName = ''
      this.form.parentIds = ''
      this.form.remark = ''
    },
    onSubmit () {
      addResource(this.form).then(response => {
        console.log(response.data)
        this.getResourceTree()
        this.clearForm()
      })
    }
  }
};
</script>
