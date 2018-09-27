<template>
  <div class="hello">    
    <picture-input 
      ref="pictureInput"
      width="200" 
      height="200"
      crop ="false"
      margin="16" 
      removable ="true"
      accept="image/jpeg,image/png" 
      size="10" 
      button-class="btn btn-primary button"
      :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }"
      @change="onChange">
    </picture-input>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'Upload',
  data () {
    return {
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
        console.log(image)
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  }
}
</script>