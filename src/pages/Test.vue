<template>
  <div>
    {{check}}
  </div>
</template>

<script>
  import XRegExp from 'xregexp'
  XRegExp.install('astral')
  export default {
    name: 'Test',
    data(){
      return {
        msg:'hi'
      }
    },
    computed:{
      check(){
        let han='漢字'
        let hiragana='ひらがな'
        let regHan='\\p{Han}'
        console.log(XRegExp(regHan).test(han))
      }
    }
  }

</script>
