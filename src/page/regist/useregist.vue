<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="registForm" :model="registForm" label-width="0">
  	<el-form-item prop="nickName">
      <el-input @keyup.enter.native="handleRegist" v-model="registForm.nickName" auto-complete="off" placeholder="请输入昵称"></el-input>
   </el-form-item>    
    <el-form-item prop="username">
      <el-input @keyup.enter.native="handleRegist" v-model="registForm.username" auto-complete="off" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input @keyup.enter.native="handleRegist" v-model="registForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter.native="handleRegist" :type="passwordType" v-model="registForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input @keyup.enter.native="handleRegist" :maxlength="code.len" v-model="registForm.code" auto-complete="off" placeholder="请输入验证码"></el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <span class="login-code-img" @click="refreshCode" v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src" class="login-code-img" @click="refreshCode" v-else/>
            <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i>
          </div>
        </el-col>
      </el-row>

    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="handleRegist" class="login-submit">注册</el-button>
    </el-form-item>
    <p>{{token}}</p>
  </el-form>
  
</template>

<script>
import { isvalidatemobile,validateEmail,validatenull} from "@/util/validate";
import { randomLenNum } from "@/util/util";
import { mapGetters } from "vuex";
import { Message } from 'element-ui'
export default {
  name: "userlogin",
  data() {
  	const validateNickName = (rule, value, callback) => {
      if (validatenull(value)) {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    const validateEmails = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    const isvalidatemobiles = (rule, value, callback) => {
      if (!isvalidatemobile(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (this.code.value != value) {
        this.registForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      registForm: {        
        nickName: "qqq",
        email: "123@126.com",  
        username: "13765022033",
        password: "123456",
        code: "",
        redomStr: ""
      },
      code: {
        src: "",
        value: "",
        len: 4,
        type: "text"
      },
      loginRules: {
        nickName: [
          { required: true, trigger: "blur", validator: validateNickName }
        ],
        username: [
          { required: true, trigger: "blur", validator: isvalidatemobiles }
        ],
        email: [
          { required: true, trigger: "blur", validator: validateEmails }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6,max: 16, message: "密码长度6-16位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateCode }
        ]
      },
      passwordType: "password"
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {},
  computed: {
    ...mapGetters(["tagWel","token"])
  },
  props: [],
  methods: {
    refreshCode() {
      this.registForm.redomStr = randomLenNum(this.code.len, true);
      this.code.type == "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}/${this.registForm.redomStr}`);
    },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleRegist() {
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("RegistByUsernames", this.registForm).then(res => {
          	console.log(res)
          	if(res.data.result){
          		Message.success('注册成功！')
            	this.$router.push({ path: '/login' });
          	}else{
          		Message.success(res.data.message)
          	}
          });
        }
      });
    },

  }
};
</script>

<style>

</style>
