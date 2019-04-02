<template>
  <div id="pdf-example">

  </div>
</template>

<script>
import PDFObject from 'pdfobject'
export default {
  name: 'PdfFile',
  data() {
    return {
      baseUrl: 'http://localhost:8080/file/download?filename=',
      filename: '谭上鸥-需求分析与概要设计.pdf'
    }
  },
  created() {
    console.log(this.baseUrl + this.filename)
    PDFObject.embed(this.baseUrl + this.filename)
  }
}
</script>

<style scoped>

</style>
