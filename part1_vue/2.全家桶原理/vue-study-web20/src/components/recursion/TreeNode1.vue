<template>
    <div>
        <div @click="toggle" :style="{'paddingLeft': (level-1)+'em'}">
            <label>{{model.title}}</label>
            <span v-if="isFold">[{{isOpen ? '-' : '+'}}]</span>
        </div>
        <div v-if="isFold" v-show="isOpen">
            <tree-node v-for="item in model.children" 
            :model="item" :key="item.title" :level="level+1"></tree-node>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tree-node',
        props: {
            model: {
                type: Object,
                required: true
            },
            level: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                isOpen: false
            }
        },
        computed: {
            isFold() {
                return this.model.children && this.model.children.length
            }
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>