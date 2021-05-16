<template>
  <div class="vue_app" align="center">
    <el-col :span="16" :offset="4">
      <el-card>
        <div slot="header">
          <span style="font-size: 20px">UCAS课程网站助手</span>
          <!-- <el-button
            style="float: right; padding: 3px 0; font-size: 18px"
            type="text"
            >返回课程网站</el-button
          > -->
        </div>
        <div>
          <Table></Table>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import Table from "@/Table.vue";

export default {
  name: "app",
  components: {
    Table,
  },
};
</script>
