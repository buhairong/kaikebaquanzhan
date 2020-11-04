// 参数1：上下文
// 参数2：注入函数
export default ({ $axios }, inject) => {
    // 将来 this.$login 就是这个注册函数
    inject("login", user => {
        return $axios.$post("/api/login", user);
    });
};