<template>
    <div class="container mt-0 mx-auto">
        <div class="title mt-6 mb-11 px-7">
            Forgot Password
        </div>
        <div>
            <div>
                <p>
                    Enter and confirm your new password in the text fields below. Make sure to have at least 3 characters. 
                </p>
                <br/>
                <label for="pwd">New Password: </label>
                <input type="password" name="pwd" id="pwd">
                <br/>
                <br/>
                <label for="pwd-conf">Confirm New Password: </label>
                <input type="password" name="pwd-conf" id="pwd-conf">
                <br/>
                <v-btn
                width="250"
                height="45"
                color="primary"
                class="my-3 text-button"
                data-cy="login-button"
                @click="submit"
                >
                Submit New Password
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import {changePassword} from '../../hooks/useCredential.js'
    export default{
        methods:{
            async submit(){
                return 0;
            }
        }
    }
</script>
