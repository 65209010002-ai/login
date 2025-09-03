<template>

    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field v-model="firstname" label="First name"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field v-model="lastname" label="Last name" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-text-field v-model="email" label="E-mail"></v-text-field>
            </v-col>
        </v-row>
        <v-btn class="mt-2" type="submit" block @click="Login">login</v-btn>
    </v-container>

</template>
<script>
export default {
    data: () => ({
        valid: false,
        firstname: '',
        lastname: '',
        email: ''
    }),
    methods: {
        Login() {
            console.log('Login')
            console.log('firstname=', this.firstname)
            console.log('lastname=', this.lastname)
            console.log('email=', this.email)
        }
    },
}
</script>