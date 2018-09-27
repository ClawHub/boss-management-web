<template>
  <div  class="components-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.classify')" v-model="listQuery.classify" style="width: 200px;" class="filter-item" @keyup.enter.native="getPic"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">{{ $t('table.search') }}</el-button>
    </div>
    <div class="one">
      <h5>Gallery one</h5>
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { fetchPic } from '@/api/picBed'
export default {
  name: 'View',
  directives: {
    waves
  },
  data () {
    return {
      slide1: [
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3920/15008465772_383e697089_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 1200,
          h: 900
        },
        {
          src: 'https://farm4.staticflickr.com/3920/15008465772_383e697089_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        }
      ],
      listQuery: {
        classify: 'default'
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
      fetchPic(this.listQuery.classify).then(response => {
        console.log(response.data)
        this.swiperSlides = response.data
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
