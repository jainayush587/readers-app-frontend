<template>
  <div class="form-wrap">
    <form class="login" @submit.prevent="submit">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">
          Register
        </router-link>
      </p>
      <h2>Login to ReadWrite</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Username" v-model="form.username" @blur="$v.form.username.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.username),
              'is-valid': shouldAppendValidClass($v.form.username)
            }"/>
          <email class="icon" />
        </div>
        <div v-if="$v.form.username.$error">
          <p class="error" v-if="!$v.form.username.required" >this field is required</p>
          <p class="error" v-if="!$v.form.username.minLength">Field must have at least {{ $v.form.username.$params.minLength.min }} characters.</p>
        </div>
        
        <div class="input">
          <input type="password" placeholder="Password" v-model="form.password" @blur="$v.form.password.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.password),
              'is-valid': shouldAppendValidClass($v.form.password)
            }"
          />
          <password class="icon" />
        </div>
        <div v-if="$v.form.password.$error">
          <p class="error" v-if="!$v.form.password.required">This field is required</p>
          <p class="error" v-if="!$v.form.password.strongPassword">Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</p>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
        Forgot your password?
      </router-link>
      <button :disabled="$v.form.$invalid">Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
    name: 'Login',
    components: {
        email,
        password,
    },
    data(){
      return{
        form:{
          username: '',
          password: ''
        },
        error: null,
        errorMsg: 'username or password is incorrect',
      };
    },
    mixins: [validationMixin],
    validations: {
      form:{
        username: { required, minLength: minLength(4) },
        password: { 
          required,
          strongPassword(password) {
            return (
              /[a-z]/.test(password) && // checks for a-z
              /[0-9]/.test(password) && // checks for 0-9
              /\W|_/.test(password) && // checks for special char
              password.length >= 6
            );
          }
       },
      }
    },
    methods: {
      ...mapActions(["LogIn"]),
      shouldAppendErrorClass( field ) {
        return field.$error; // field.$invalid && field.$dirty
      },
      shouldAppendValidClass( field ) {
        return !field.$invalid && field.$model && field.$dirty;
      },
      async submit() {
        const User = new FormData();
        User.append("username", this.form.username);
        User.append("password", this.form.password);
        try {
          this.$v.form.$touch();
          await this.LogIn(User);
          this.$router.push("/home");
          this.error = false
        } catch (error) {
          this.error = true
        }
      },
      nextPage: function() {
        console.log('you have clicked me')
      }
    },
}
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }
  .login-register {
    margin-bottom: 32px;
    .router-link {
      color: #000;
    }
  }
  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }
    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }
    .inputs {
      width: 100%;
      max-width: 350px;
      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 40px;
          height: 50px;
          border-radius: 40px;
          &:focus {
            outline: none;
          }
        }
        .icon {
          width: 12px;
          position: absolute;
          left: 15px;
        }
      }
    }
    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;
      &:hover {
        border-color: #303030;
      }
    }
    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url('../assets/background.png');
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>