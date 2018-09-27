<template>
  <div class="components-container">
    <dropzone id="myVueDropzone" url="http://192.144.192.190:9002/boss/picBed/upload" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS"/>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone'
export default {
  name: 'Upload',
  components: { Dropzone },
  methods: {
    dropzoneS (file) {
      console.log(file)
      this.$message({ message: 'Upload success!', type: 'success' })
    },
    dropzoneR (file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    }
  }
}
</script>
