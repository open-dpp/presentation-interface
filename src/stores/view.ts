import {defineStore} from 'pinia'
import {ref} from "vue";
import {ViewDto} from "@open-dpp/api-client";

export const useViewStore = defineStore('view', () => {
    const view = ref<ViewDto>();

    return {view}
});