<template>
<body class="container">
    <div class="wrapper">
        <div class="wrapper main-component">
            <div class="login-logo">
                <h1 class="title" style="color: white">LOGIN PAGE</h1>
            </div>
            
            <div class="main-part">
                <div>
                    <div class="filled-group">
                        <label>Email</label>
                        <input type="text" placeholder="Email" v-model="email" required>
                    </div>
                
                    <div class="filled-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" v-model="password" required>  
                    </div>
                </div>        
                
                

                <footer class="wrapper login-footer">
                    <button class="button login-button" type="submit" title="login">
                        <span><span><b>LOGIN</b></span></span>
                    </button>

                    <p style="margin: 30px">Forgot Your Password?</p>

                    <div class="">
                        <p>Don't have an account? <a href="#">Sign up.</a></p>
                    </div>
                </footer>
                
            </div>

        </div>
    </div>
</body>
</template>

<script>
export default {
    layout: 'loginLayout', //Using login layout
    data() {
        return {
            email: '',
            password: ''
        }
    }
  
};
</script>

<style scoped>
button {
    border-radius: 0px;
}

input {
    width: 350px;
    height: 35px;
    max-width: auto;
    max-height: auto;
}

.container {
    color: white;
}

.login-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.filled-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: flex-start;
    padding: 5px 0px 0px;
}

.login-logo {
    margin: 10px 10px 10px;
    padding: 30px;
}

.main-part {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin: 10px;
}

.login-footer {
    margin: 30px;
    width: 100%;
}

.main-component {
    margin: 80px;
}

.login-button {
    width: 100%;
    color: #fff;
    background: #f57d31;
}

</style>
