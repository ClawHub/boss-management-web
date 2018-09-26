<template>
  <div  class="components-container">
     <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">{{ $t('table.search') }}</el-button>
    </div>
     <swiper :options="swiperOption">
      <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
      <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
        <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
      <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
        <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
      <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
        <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
      <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
        <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
      <swiper-slide><img src="https://raw.githubusercontent.com/wiki/clawhub/pic-bed/test/LOGO_gaitubao_com_568x568.png"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'View',
  directives: {
    waves
  },
  data () {
    return {
      listQuery: {
        title: undefined
      },
      swiperOption: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>
