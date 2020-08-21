// middlewares = [fn1, fn2]
/* 
    fn1(function next(){
        return fn2(function next(){
            return fn3(function next(){
                ......
            })
        })
    })
*/
// 排序
module.exports.compose = middlewares => {
    return function () {
        return dispatch(0)        
        function dispatch(i) {
            let fn = middlewares[i]
            if(!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i+1)
                })
            )
        }
    }
}
