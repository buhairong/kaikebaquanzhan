export default  {
    render(h) {
        // 标记当前 router-view 深度
        this.$vnode.data.routerView = true  // 标记自己是个 router-view

        let depth = 0
        let parent = this.$parent

        while(parent) {
            const vnodeData = parent.$vnode && parent.$vnode.data
            if(vnodeData && vnodeData.routerView) {
                // 说明当前的 parent 是一个 router-view
                depth++
            }

            parent = parent.$parent
        }

        //const {routeMap, current} = this.$router
        //const component = routeMap[current] ? routeMap[current].component : null

        console.log('depth', depth)
        console.log('matched', this.$router.matched)
        let component =  null
        const route = this.$router.matched[depth]
        if(route) {
            component = route.component
        }

        return h(component)
    }
}