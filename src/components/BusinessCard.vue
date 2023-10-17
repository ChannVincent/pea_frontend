<template>
    <div class="bg-white rounded-lg shadow-lg">
        <div class="p-5 border-b">
            <p class="text-lg text-gray-600">{{ title }}</p>
            <p class="text-xs text-gray-400">{{ subtitle }}</p>
            <div class="flex flex-row mt-3 space-x-2">
                <BusinessTag>Tag</BusinessTag>
                <BusinessTag>Tag</BusinessTag>
            </div>
        </div>
        <div class="flex px-5 py-1">
            <table class="min-w-full">
            <tbody>
                <tr class="border-b">
                    <td class="whitespace-nowrap text-sm text-gray-500 py-2">column</td>
                    <td class="text-right text-sm whitespace-nowrap text-gray-500 py-2">260M</td>
                </tr>
                <tr>
                    <td class="whitespace-nowrap text-sm text-gray-500 py-2">column</td>
                    <td class="text-right text-sm whitespace-nowrap text-gray-500 py-2">260M</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="flex flex-row">
            <div class="border-x border-t text-center text-sm text-gray-500 p-2 flex-grow">
                BUTTON 1
            </div>
            <div class="border-x border-t text-center text-sm text-gray-500 p-2 flex-grow">
                BUTTON 2
            </div>
        </div>
    </div>
</template>
<script>

import BusinessTag from '@/components/BusinessTag.vue'
export default {
    components: {
        BusinessTag
    },
    props: {
        title: String,
        subtitle: String,
    }
}
</script>
