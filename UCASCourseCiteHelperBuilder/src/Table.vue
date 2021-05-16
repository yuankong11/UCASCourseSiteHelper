<template>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px; font-size: 16px"
    row-key="name"
    border
    stripe
    default-expand-all
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="name" label="课程">
      <template slot-scope="scope">
        <a :href="scope.row.href"> {{ scope.row.name }}</a>
      </template>
    </el-table-column>
    <el-table-column prop="resource" label="资源" width="180">
      <template slot-scope="scope">
        <a v-if="scope.row.resource != null" :href="scope.row.resource">资源</a>
      </template>
    </el-table-column>
    <el-table-column prop="homework" label="作业" width="180">
      <template slot-scope="scope">
        <a v-if="scope.row.homework != null" :href="scope.row.homework">作业</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      tableData: [],
    };
  },
  mounted: function () {
    this.buildTable();
  },
  methods: {
    testTable() {
      this.tableData = [
        {
          name: "t1",
          children: [
            {
              name: "n1",
              href: "#",
              resource: "r1",
              homework: "h1",
            },
          ],
        },
      ];
    },
    buildTable() {
      let sites = document.querySelectorAll(".fav-sites-term");
      this.tableData = [];
      for (let i = 0; i < sites.length - 1; i++) {
        let site = sites[i];
        this.tableData.push({
          name: site.querySelector(".favorites-term-header").innerHTML,
          children: [],
        });
        let entries = site.querySelectorAll(".fav-sites-entry  ");
        for (let j = 0; j < entries.length; j++) {
          let entry = entries[j];
          let a = entry.querySelectorAll("a");
          let course = a[1];
          let ref = course.getAttribute("href");
          let title = course.getAttribute("title");
          this.tableData[i].children.push({
            name: title,
            href: ref,
            resource: "",
            homework: "",
          });
          let collapseID = a[2].getAttribute("id");
          let URL = "/direct/site/" + collapseID + "/pages.json";
          axios.get(URL).then((ret) => {
            let data = ret.data;
            let item = this.tableData[i].children[j];
            item.resource =
              "https://course.ucas.ac.cn/portal/site/" +
              collapseID +
              "/page/" +
              data[3].id;
            item.homework =
              "https://course.ucas.ac.cn/portal/site/" +
              collapseID +
              "/page/" +
              data[5].id;
          });
        }
      }
    },
  },
};
</script>
