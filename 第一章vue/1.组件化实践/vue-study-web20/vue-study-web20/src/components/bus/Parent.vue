<template>
    <div>
        <h1>Parent</h1>
        <child1></child1>
        <child2></child2>
    </div>
</template>

<script>
    import Child1 from './Child1.vue';
    import Child2 from './Child2.vue';

    export default {
        components: {
            Child1,
            Child2
        },
    }
</script>

<style lang="scss" scoped>

</style>