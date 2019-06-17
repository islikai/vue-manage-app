<template>
  <div class="create-modal">
    <el-dialog
      :title="dialog.isEdit ? '编辑信息' : '添加信息'"
      width="550px"
      left
      :visible.sync="dialog.visible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        style="width: 450px"
        label-width="120px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="收支类型" prop="type">
          <el-select
            v-model="formData.type"
            style="width: 330px"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in type_list"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述" prop="desc">
          <el-input
            v-model="formData.desc"
            placeholder="请输入"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input v-model="formData.income" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="expend">
          <el-input v-model="formData.expend" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="现金" prop="cash">
          <el-input v-model="formData.cash" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formData.remark"
            placeholder="请输入"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'create-modal',
  props: {
    dialog: Object,
    formData: Object,
  },
  data() {
    return {
      type_list: ['提现', '啊啊啊啊', 'AAAAA', 'NNNNNNN'],
      rules: {
        type: [
          { required: true, message: '请选择收支类型', trigger: 'change' },
        ],
        desc: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        income: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        expend: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        cash: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '/api/profiles/create';
          let infoText = '添加成功';
          if (this.dialog.isEdit) {
            url = `/api/profiles/update/${this.formData._id}`;
            infoText = "修改成功";
          }
          this.$axios.post(url, this.formData)
            .then((res) => {
              this.$message.success(infoText);
              this.$refs[formName].resetFields();
              this.dialog.visible = false;
              this.$emit('update');
            })
        } else {
          return false;
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  
</style>
