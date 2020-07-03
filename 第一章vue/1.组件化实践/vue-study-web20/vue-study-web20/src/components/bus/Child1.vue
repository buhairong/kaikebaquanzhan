<template>
    <div>
        <h2>Child1</h2>
        {{msg}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: ''
            }
        },
        created () {
            this.$bus.on('msg', (msg) => {
                this.msg = msg
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>