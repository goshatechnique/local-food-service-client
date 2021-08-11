<template>
  <div class="container">
    <form class="form">
      <div class="form-message">
        <div v-show="warnMessage" class="form-message-text">
          {{ warnMessage }}
        </div>
      </div>
      <div class="form-input-container">
        <input
          v-bind:class="[
            warnMessage && email === '' ? 'input-warning' : '',
            isEmailValid === false && email !== '' ? 'input-warning' : '',
            'form-input-container-background form-input-container-background-input',
          ]"
          type="email"
          v-model="email"
          placeholder="email"
          @blur="validateEmail"
        />
      </div>
      <div class="form-input-container">
        <input
          v-bind:class="[
            warnMessage && password === '' ? 'input-warning' : '',
            'form-input-container-background form-input-container-background-input',
          ]"
          type="password"
          v-model="password"
          placeholder="password"
        />
      </div>
      <div v-if="formType === 'registration'" class="form-input-container">
        <input
          v-bind:class="[
            warnMessage && country === '' ? 'input-warning' : '',
            'form-input-container-background form-input-container-background-input',
          ]"
          type="text"
          v-model="country"
          placeholder="country"
        />
      </div>
      <div v-if="formType === 'registration'" class="form-input-container">
        <input
          v-bind:class="[
            warnMessage && city === '' ? 'input-warning' : '',
            'form-input-container-background form-input-container-background-input',
          ]"
          type="text"
          v-model="city"
          placeholder="city"
        />
      </div>
      <div v-if="formType === 'registration'" class="form-input-container">
        <input
          v-bind:class="[
            warnMessage && phoneNumber === '' ? 'input-warning' : '',
            'form-input-container-background form-input-container-background-input',
          ]"
          type="text"
          v-model="phoneNumber"
          placeholder="phone number"
          @blur="validatePhoneNumber"
        />
      </div>
      <div v-if="formType === 'registration'" class="form-input-container">
        <select
          v-bind:class="[
            warnMessage && accountType === '' ? 'input-warning' : '',
            'form-input-container-background form-input-container-background-select',
          ]"
          v-model="accountType"
        >
          <option disabled value="">Select account type</option>
          <option>Customer</option>
          <option>Seller</option>
        </select>
      </div>

      <div class="form-input-container form-inpit-container-button">
        <button
          class="
            form-input-container-background
            form-input-container-background-button
          "
          @click.prevent="submitHandler"
        >
          {{ this.formType.toUpperCase() }}
        </button>
      </div>
      <div class="form-switch-container">
        <div class="form-switch" @click="switchFormType">
          {{ this.formType === 'registration' ? signInMessage : signUpMessage }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'LoginForm',
  data() {
    return {
      formType: 'authorization',
      email: '',
      password: '',
      country: '',
      city: '',
      phoneNumber: '',
      accountType: '',
      isEmailValid: false,
      signInMessage: 'Already have an account? Sign in',
      signUpMessage: 'Log in to start. Have no account? Sign up',
      warnMessage: '',
    };
  },
  methods: {
    ...mapActions(['fetchCurrentUser', 'registration', 'authorization']),
    validateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.isEmailValid = true;
        return true;
      } else {
        this.isEmailValid = false;
        return false;
      }
    },
    validatePhoneNumber() {
      if (this.phoneNumber === '') return;
      return this.phoneNumber.match(/\d/g) && this.phoneNumber.length === 9;
    },
    switchFormType() {
      this.formType =
        this.formType === 'registration' ? 'authorization' : 'registration';
    },
    submitHandler() {
      if (this.formType === 'registration') {
        if (
          this.email &&
          this.password &&
          this.country &&
          this.city &&
          this.phoneNumber &&
          this.accountType
        ) {
          if (!this.isEmailValid) {
            this.warnMessage = 'Email not valid';
            return;
          }
          if (this.accountType === 'Seller' || this.phoneNumber !== '') {
            if (!this.validatePhoneNumber()) {
              this.warnMessage = 'Phone not valid';
              return;
            }
          }
          this.warnMessage = '';
          this.registration({
            email: this.email,
            password: this.password,
            country: this.country,
            city: this.city,
            phoneNumber: this.phoneNumber,
            accountType: this.accountType,
          });
        } else {
          this.warnMessage = 'Fill all fields';
        }
      }
      if (this.formType === 'authorization') {
        if (this.email && this.password) {
          if (!this.isEmailValid) {
            this.warnMessage = 'Email not valid';
            return;
          }
          this.warnMessage = '';
          this.authorization({ email: this.email, password: this.password });
        } else {
          this.warnMessage = 'Fill all fields';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$textColor: #314252;
$whiteColor: #ffffff;
$linkColor: #28349b;
$grayColorLight: #eeeeee;
$grayColor: #e1e1e1;
$grayColorDark: #757575;
$greenColor: #47d1af;
$greenColorLight: #bae6d5;
$greenColorLight2: #c7ebdf;
$orangeColor: #dba614;
$redColor: #c42e1a;

.container {
  width: 500px;
  padding: 30px 0 30px 0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  background-color: $grayColorLight;
}

.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-message {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &-text {
    color: $orangeColor;
    user-select: none;
    font-size: 1.3em;
  }
}

.form-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0 20px 0;
}

.form-inpit-container-button {
  padding: 20px 0 0 0;
}

.form-input-container-background {
  height: 55px;
  width: 80%;
  box-sizing: border-box;
  border: none;
  outline: none;
  transition: 0.5s;
  &-input {
    background-color: $grayColorLight;
    padding-left: 10px;
    background-color: $grayColor;
    border-bottom: 1px solid $grayColor;
    &:focus {
      border-bottom: 1px solid $greenColor;
    }
  }
  &-select {
    padding-left: 5px;
    border-bottom: 1px solid $grayColor;
    &:focus {
      border-bottom: 1px solid $greenColor;
    }
  }
  &-button {
    background-color: $greenColor;
    border: 1px solid $greenColor;
    padding-left: 10px;
    cursor: pointer;
    color: $whiteColor;
    &:hover {
      border: 1px solid $greenColor;
      color: $greenColor;
      background-color: $whiteColor;
    }
  }
}

.input-warning {
  transition: 0.5s;
  border-bottom: 1px solid $orangeColor;
}

.form-switch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0 5px 0;
}

.form-switch {
  font-size: 0.6em;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: $linkColor;
  }
}

@media all and (max-width: 1024px) {
  .container {
    width: 450px;
  }
}

@media all and (max-width: 768px) {
  .container {
    width: 400px;
  }
}

@media all and (max-width: 500px) {
  .container {
    width: 360px;
  }
}
</style>
