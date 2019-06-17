<template>
  <div class="account-list">
    <div class="account-add">
      <el-form :inline="true" :model="searchForm" ref="searchForm">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="onSearch('searchForm')">查询</el-button>
        </el-form-item>
        <el-form-item class="add-btn">
          <el-button type="primary" @click="create">添加信息</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      stripe
      size="mini"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.date).format('YYYY-MM-DD hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="income"
        label="收入">
        <template slot-scope="scope">
          <span style="color: #4caf50">{{scope.row.income}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expend"
        label="支出">
        <template slot-scope="scope">
          <span style="color: #ff9800">{{scope.row.expend}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cash"
        label="现金">
        <template slot-scope="scope">
          <span style="color: #2196f3">{{scope.row.cash}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="right"
        width="100">
        <template slot-scope="scope">
          <el-button
            @click="remove(scope.row._id)"
            type="text">
            移除
          </el-button>
          <el-button
            @click="update(scope.row._id)"
            type="text">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.pageNo"
        :page-sizes="paginations.pageSizes"
        :page-size="paginations.pageSize"
        :layout="paginations.layout"
        :total="paginations.total">
      </el-pagination>
    </div>
    <CreateModal
      v-if="dialog.visible"
      :dialog="dialog"
      :formData="formData"
      @update="getProfile"
    />
  </div>
</template>

<script>
import CreateModal from '../components/CreateModal';
export default {
  name: 'account-list',
  components: {
    CreateModal,
  },
  data() {
    return {
      tableData: [],
      dialog: {
        visible: false,
        isEdit: false,
      },
      formData: {
        type: '',
        desc: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: '',
      },
      paginations: {
        total: 100,
        pageNo: 1,
        pageSize: 10,
        pageSizes: [10, 15, 20, 25],
        layout: "total, sizes, prev, pager, next, jumper",
      },
      searchForm: {
        dateRange: null,
      },
      searchParams: {
        startDate: null,
        endDate: null,
      }
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile(params) {
      this.$axios.get('/api/profiles/query', {
        params: {
          pageNo: this.paginations.pageNo,
          pageSize: this.paginations.pageSize,
          ...this.searchParams,
        },
      }).then(({ success, error, result, total}) => {
        if (success) {
          this.formData = {},
          this.tableData = result;
          this.paginations.total = total;
        } else {
          this.$message.error(error);
        }
      })
    },
    onSearch(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { dateRange } = this.searchForm;
          this.searchParams.startDate = this.$moment(dateRange[0]).valueOf(),
          this.searchParams.endDate = this.$moment(dateRange[1]).valueOf(),
          this.getProfile();
        }
      })
    },
    reset() {
      this.searchForm = {};
      this.searchParams = {};
      this.paginations.pageNo = 1,
      this.paginations.pageSize = 10,
      this.getProfile();
    },
    create() {
      this.dialog.isEdit = false;
      this.dialog.visible = true;
    },
    update(id) {
      const getItem = this.tableData.filter(i => i._id === id)[0];
      this.formData = getItem;
      this.dialog.isEdit = true;
      this.dialog.visible = true;
    },
    remove(id) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`/api/profiles/delete/${id}`)
          .then((res) => {
            this.$message.success('删除成功');
            this.getProfile();
          })
      }).catch(() => {
        this.$message.info('取消删除');          
      });
    },
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize;
      this.getProfile();
    },
    handleCurrentChange(pageNo) {
      this.paginations.pageNo = pageNo;
      this.getProfile();
    }
  },
}
</script>

<style lang="scss" scoped>
  .account-list {
    .account-add {
      margin: 10px 0 20px 0;
      .add-btn {
        float: right;
      }
    }
    .table-pagination {
      margin-top: 30px;
      text-align: right;
    }
  }
</style>