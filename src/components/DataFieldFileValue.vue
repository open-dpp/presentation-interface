<template>
  <div v-if="uploadedFileUrl" class="flex flex-row gap-4">
    <img
        v-if="uploadedFileUrl && uploadedFileContentType?.startsWith('image/')"
        :alt="props.fieldView.dataField.name"
        :src="uploadedFileUrl"
        class="max-w-24 max-h-24"
    />
    <DocumentIcon v-else class="w-24 h-24 text-gray-600" />
    <div class="text-gray-600 text-sm my-auto">
      {{ fieldView.value }}
    </div>
    <a
        :download="fieldView.value"
        :href="uploadedFileUrl"
        class="bg-[#6BAD87] rounded-sm p-2 hover:cursor-pointer my-auto"
    >
      Herunterladen
    </a>
  </div>
  <div v-else class="flex flex-row gap-4">
    Datei konnte nicht geladen werden.
  </div>
</template>

<script setup lang="ts">
import { FieldView } from "../lib/field-view";
import { useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import {MEDIA_SERVICE_URL} from "../const";
import axiosIns from "../lib/axios";
import {useProductPassportStore} from "../stores/product-passport";
import {DocumentIcon} from "@heroicons/vue/24/outline";

const router = useRouter();
const passportStore = useProductPassportStore();

const props = defineProps<{ fieldView: FieldView }>();

const uploadedFileUrl = ref<string | undefined>(undefined);
const uploadedFileContentType = ref<string | undefined>(undefined);

const loadFile = async () => {
  try {
    const responseInfo = await axiosIns.get(
        `${MEDIA_SERVICE_URL}/media/dpp/${passportStore.productPassport?.id}/${props.fieldView.dataField.id}/info`,
    );

    const responseDownload = await axiosIns.get(
        `${MEDIA_SERVICE_URL}/media/dpp/${passportStore.productPassport?.id}/${props.fieldView.dataField.id}/download`,
        {
          responseType: "blob",
        },
    );

    const blob = responseDownload.data as Blob;
    const contentType = (responseInfo.data as { mimeType?: string }).mimeType;

    // Revoke an old object URL to avoid memory leaks before assigning a new one
    if (uploadedFileUrl.value) {
      try {
        URL.revokeObjectURL(uploadedFileUrl.value);
      } catch (revokeErr) {
        console.error(
            "Fehler beim Freigeben der vorherigen Objekt-URL:",
            revokeErr,
        );
      }
    }

    uploadedFileUrl.value = URL.createObjectURL(blob);
    uploadedFileContentType.value = contentType;
  } catch (error) {
    console.error("Fehler beim Laden der Datei:", error);
    // Reset state on failure
    if (uploadedFileUrl.value) {
      try {
        URL.revokeObjectURL(uploadedFileUrl.value);
      } catch (revokeErr) {
        console.error(
            "Fehler beim Freigeben der Objekt-URL nach Fehler:",
            revokeErr,
        );
      }
    }
    uploadedFileUrl.value = undefined;
    uploadedFileContentType.value = undefined;

    // Notify user via the existing notification store if available
    try {
      /* notificationStore.addErrorNotification(
          "Die Datei konnte nicht geladen werden. Bitte versuchen Sie es erneut.",
      ); */
    } catch {
      // Fallback to console if the notification store is not available for any reason
      console.error(
          "Benachrichtigung über Ladefehler konnte nicht angezeigt werden.",
      );
    }
    // We intentionally do not rethrow to keep caller logic simple unless needed.
  }
};

onMounted(async () => {
  await loadFile();
});
</script>
