<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')"  style="width: 200px;" class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" >{{ $t('table.search') }}</el-button>
    </div>
     <el-row :gutter="20" style="margin-top:20px;">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>资源树</span>
          </div>
          <div class="component-item">
            <el-tree :loading="treeLoading" :data="data" :props="defaultProps" @node-click="handleNodeClick">
               <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
                    Append
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">
                    Delete
                  </el-button>
                </span>
              </span>
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
             <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { fetchTree } from '@/api/resource'
export default {
  name: 'Resource',
  directives: {
    waves
  },
  data () {
    return {
      treeLoading: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    getResourceTree () {
      this.treeLoading = true
      fetchTree().then(response => {
        console.log(response.data)
        this.data = response.data
        this.treeLoading = false
      })
    },
    handleNodeClick (data) {
      console.log(data);
    },
    onSubmit () {
      console.log('submit!');
    }
  }
};
</script>
