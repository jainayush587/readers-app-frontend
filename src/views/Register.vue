<template>
  <div class="form-wrap">
    <form class="register" @submit.prevent="submit">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">
          Login
        </router-link>
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="form.firstName" @blur="$v.form.firstName.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.firstName),
              'is-valid': shouldAppendValidClass($v.form.firstName)
            }" />
          <user class="icon" />
        </div>
        <div v-if="$v.form.firstName.$error">
          <p class="error" v-if="!$v.form.firstName.required" >this field is required</p>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="form.lastName" @blur="$v.form.lastName.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.lastName),
              'is-valid': shouldAppendValidClass($v.form.lastName)
            }" />
          <user class="icon" />
        </div>
        <div v-if="$v.form.lastName.$error">
          <p class="error" v-if="!$v.form.lastName.required" >this field is required</p>
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="form.username" @blur="$v.form.username.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.username),
              'is-valid': shouldAppendValidClass($v.form.username)
            }"/>
          <user class="icon" />
        </div>
        <div v-if="$v.form.username.$error">
          <p class="error" v-if="!$v.form.username.required" >this field is required</p>
          <p class="error" v-if="!$v.form.username.minLength">Field must have at least {{ $v.form.username.$params.minLength.min }} characters.</p>
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="form.email" @blur="$v.form.email.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.email),
              'is-valid': shouldAppendValidClass($v.form.email)
            }"/>
          <emailIcon class="icon" />
        </div>
        <div v-if="$v.form.email.$error">
          <p class="error" v-if="!$v.form.email.required" >this field is required</p>
          <p class="error" v-if="!$v.form.email.email" >Invalid email format</p>
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="form.password" @blur="$v.form.password.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.password),
              'is-valid': shouldAppendValidClass($v.form.password)
            }" />
          <password class="icon" />
        </div>
        <div v-if="$v.form.password.$error">
          <p class="error" v-if="!$v.form.password.required">This field is required</p>
          <p class="error" v-if="!$v.form.password.strongPassword">Strong passwords need to have a letter, a number, a special character, and be more than 8 characters long.</p>
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click="submit">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { email,required, minLength } from "vuelidate/lib/validators";

import emailIcon from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import user from '../assets/Icons/user-alt-light.svg';

export default {
    name: 'Register',
    components: {
        emailIcon,
        password,
        user,
    },
    data() {
      return {
        form:{
          firstName: "",
          username: "",
          password: "",
        },
        //firstName: "",
        lastName: "",
        //username: "",
        email: "",
        //password: "",
        error: false,
        status: null,
        errorMsg: '',
      };
    },
    mixins: [validationMixin],
    validations: {
      form:{
        firstName: { required },
        lastName: { required },
        username: { required, minLength: minLength(4) },
        email: { email, required },
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
        // password2: {
        //   required,
        //   sameAsPassword: sameAs("password1")
        // }
      }
    },
    methods: {
      ...mapActions(["Register"]),
      shouldAppendErrorClass( field ) {
        return field.$error; // field.$invalid && field.$dirty
      },
      shouldAppendValidClass( field ) {
        return !field.$invalid && field.$model && field.$dirty;
      },
      async submit() {
        try {
          this.$v.form.$touch();
          await this.Register(this.form);
          this.$router.push("/");
          this.error = false;
        } catch (error) {
          this.errorMsg = error;
          this.error = true;
        }
      },
    },
}
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>