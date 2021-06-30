<template>
  <div class="form-wrap">
    <form class="register" @submit.prevent="submit">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">
          Login
        </router-link>
      </p>
      <h2>Create Your ReadWrite Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="form.full_name" @blur="$v.form.full_name.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form.full_name),
              'is-valid': shouldAppendValidClass($v.form.full_name)
            }" />
          <user class="icon" />
        </div>
        <div v-if="$v.form.full_name.$error">
          <p class="error" v-if="!$v.form.full_name.required" >this field is required</p>
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="form1.lastName" @blur="$v.form1.lastName.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form1.lastName),
              'is-valid': shouldAppendValidClass($v.form1.lastName)
            }" />
          <user class="icon" />
        </div>
        <div v-if="$v.form1.lastName.$error">
          <p class="error" v-if="!$v.form1.lastName.required" >this field is required</p>
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
          <input type="text" placeholder="Email" v-model="form1.email" @blur="$v.form1.email.$touch()"
            :class="{
              'is-invalid': shouldAppendErrorClass($v.form1.email),
              'is-valid': shouldAppendValidClass($v.form1.email)
            }"/>
          <emailIcon class="icon" />
        </div>
        <div v-if="$v.form1.email.$error">
          <p class="error" v-if="!$v.form1.email.required" >this field is required</p>
          <p class="error" v-if="!$v.form1.email.email" >Invalid email format</p>
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
          username: "",
          full_name: "",
          password: "",
        },
        form1:{
          lastName: "",
          email: "",
        },
        //firstName: "",
        
        //username: "",
        
        //password: "",
        error: false,
        errorMsg: '',
      };
    },
    mixins: [validationMixin],
    validations: {
      form:{
        full_name: { required },
        
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
        
        // password2: {
        //   required,
        //   sameAsPassword: sameAs("password1")
        // }
      },
      form1:{
        lastName: { required },
        email: { email, required },
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
          this.$v.$touch();
          console.log(this.form);
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