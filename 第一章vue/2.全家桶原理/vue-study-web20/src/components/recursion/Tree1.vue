<template>
    <div>
        <tree-node v-for="item in data" :model="item" :key="item.title"></tree-node>
    </div>
</template>

<script>
    import TreeNode from "./TreeNode1.vue"

    export default {
        components: {
            TreeNode
        },
        props: {
            data: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>