<template>
    <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        <slot/>
    </div>
</template>
<script>
export default {
    props: {
        type: String,
    }
}
</script>