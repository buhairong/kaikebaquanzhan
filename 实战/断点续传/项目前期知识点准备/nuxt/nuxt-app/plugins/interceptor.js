export default function({ $axios, store }) {
    // onRequest 是 @nuxtjs/axios 模块提供的帮助方法
    $axios.onRequest(config => {
        // 附加令牌y
        if (store.state.user.token) {
            config.headers.Authorization = "Bearer " + store.state.user.token;
        }
        return config;
    });
}