export const actions = {
    // nuxt-universal-cookie 用法如下
    // app是server实例，也就是koa实例
    nuxtServerInit({ commit }, { app }) {
        const token = app.$cookies.get("token");
        // token存在说明是已登录用户
        if (token) {
            console.log("nuxtServerInit: token:"+token);
            commit("user/init", token);
        }
    }
}