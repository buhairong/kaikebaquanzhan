<template>
    <div>
        <h2>Child2</h2>
        <button @click="sendMsg">发消息给Child1</button>
    </div>
</template>

<script>
    export default {
        methods: {
            sendMsg() {
                this.$bus.emit('msg', '来自Child2自定义Bus的消息')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>