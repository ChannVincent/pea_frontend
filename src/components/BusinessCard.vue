<template>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="px-5 pt-5">
            <p class="text-lg text-gray-600">{{ businessDetail.name }}</p>
            <p class="text-xs text-gray-400">{{ businessDetail.symbol }}</p>
        </div>
        <!-- tags -->
        <div class="px-4 pb-5 border-b">
            <div class="flex flex-col mt-3 overflow-hidden">
                <BusinessTag class="m-1">{{ businessDetail.business_info.sector }}</BusinessTag>
                <BusinessTag class="m-1">{{ businessDetail.business_info.industry }}</BusinessTag>
            </div>
        </div>
        <!-- infos -->
        <div class="flex px-5 py-1">
            <table class="min-w-full">
            <tbody class="divide-y">
                <tr>
                    <td class="whitespace-nowrap text-sm text-gray-500 py-2">marge nette</td>
                    <td class="text-right text-sm whitespace-nowrap text-gray-500 py-2">10%</td>
                </tr>
                <tr>
                    <td class="whitespace-nowrap text-sm text-gray-500 py-2">trésorerie</td>
                    <td class="text-right text-sm whitespace-nowrap text-gray-500 py-2">100M</td>
                </tr>
                <tr>
                    <td class="whitespace-nowrap text-sm text-gray-500 py-2">bénéfice</td>
                    <td class="text-right text-sm whitespace-nowrap text-gray-500 py-2">150M</td>
                </tr>
                <tr>
                    <td class="whitespace-nowrap text-sm text-gray-500 py-2">dette</td>
                    <td class="text-right text-sm whitespace-nowrap text-gray-500 py-2">50M</td>
                </tr>
            </tbody>
            </table>
        </div>
        <!-- actions -->
        <div class="flex flex-row border-t divide-x rounded-b-lg">
            <button 
                v-if="!businessDetail.is_updated"
                class="flex flex-row justify-center space-x-2 text-sm text-gray-500 p-2 flex-grow"
                :class="{
                    'hover:bg-gray-100': this.status === null
                }"
                :disabled="this.status === 'syncing'"
                @click="syncBusiness()"
            >
                <LoadingSpinner v-if="status" size="xs" />
                <div>
                    mettre à jour
                </div>
            </button>
            <router-link class="text-center text-sm text-white p-2 flex-grow bg-primary hover:bg-secondary" :to="'/business/'+ businessDetail.pk + '/'">
                Voir détails
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import BusinessTag from '@/components/BusinessTag.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
export default {
    components: {
        BusinessTag,
        LoadingSpinner
    },
    props: {
        business: Object,
        button1: String,
        button1Callback: Function,
    },
    data() {
        return {
            status: null,
            businessDetail: this.business, // mutable
        }
    },
    methods: {
        syncBusiness() {
            if (this.status === 'syncing') {
                return
            }
            this.status = 'syncing'
            axios
                .get(`https://04qeb8it0j.execute-api.eu-west-3.amazonaws.com/integration/sync_business/${this.business.pk}`)
                .then(data => {
                    this.status = null
                    this.businessDetail = data.data.business
                })
        }
    }
}
</script>
