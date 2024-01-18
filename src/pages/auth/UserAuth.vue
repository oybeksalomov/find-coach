<template>
<div>
    <base-dialog :show="!!error" title="Xatolik sodir bo'ldi" @close="handleError"><p>{{error}}</p></base-dialog>
    <base-dialog :show="isLoading" title="Avtorizatsiya..." fixed ><base-spinner></base-spinner></base-dialog>
    <base-card>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">Email</label>
                <input v-model.trim="email" type="email" id="email" >
            </div>
            <div class="form-control">
                <label for="password">Parol</label>
                <input v-model.trim="password" type="password" id="password">
            </div>
            <p class="errors" v-if="!formIsValid">Please enter a valid email and non-empty message.</p>
            <base-button>{{ submitButtonCaption }}</base-button>
            <base-button type="button" mode="flat" @click=switchAuthMode>{{ switchModeButtonCaption }}</base-button>
        </form>
    </base-card>
</div>
</template>

<script>
export default {
  components: { },
    data() {
        return {
 
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        }
    },
    computed: {
        submitButtonCaption() {
            if(this.mode === 'login') {
                return 'Login'
            } else {
                return 'Registratsiya'
            }
        },
        switchModeButtonCaption() {
            if(this.mode === 'login') {
                return 'Registratsiyadan o\'tish'
            } else {
                return 'Login qilish'
            }
        }
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            if (
                this.email === '' ||
                !this.email.includes('@') ||
                this.message === ''
            ) {
                this.formIsValid = false;
                return;
            }
            
            this.isLoading = true

            const actionPayload = {
                email: this.email,
                password: this.password
            }

            try {
                if(this.mode === 'login') {
                    await this.$store.dispatch('login', actionPayload)
                } else {
                    await this.$store.dispatch('signup', actionPayload)
                }
                this.$router.replace('/coaches')
            } catch(error) {
                this.error = new Error(error.message || 'Failed to authenticate, try later')
            }

            this.isLoading = false
        },
        switchAuthMode() {
            if(this.mode === 'login') {
                this.mode = 'signup'
            } else {
                this.mode = 'login'
            }
        },
        handleError() {
            this.error = null;
        }
    } 
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>