import { defineStore } from "pinia";
import axiosIns from "../lib/axios";
import { MEDIA_SERVICE_URL } from "../const";

export type MediaInfo = {
    mimeType?: string;
};

export const useMediaStore = defineStore("media", () => {
    const getDppMediaInfo = async (
        uuid: string | undefined,
        dataFieldId: string,
    ): Promise<MediaInfo> => {
        if (!uuid) {
            throw new Error("No UUID provided");
        }
        const response = await axiosIns.get(
            `${MEDIA_SERVICE_URL}/media/dpp/${uuid}/${dataFieldId}/info`,
        );
        return response.data as MediaInfo;
    };

    const downloadDppMedia = async (
        uuid: string | undefined,
        dataFieldId: string,
    ): Promise<Blob> => {
        if (!uuid) {
            throw new Error("No UUID provided");
        }
        const response = await axiosIns.get(
            `${MEDIA_SERVICE_URL}/media/dpp/${uuid}/${dataFieldId}/download`,
            { responseType: "blob" },
        );
        return response.data as Blob;
    };

    const fetchDppMedia = async (
        uuid: string | undefined,
        dataFieldId: string,
    ): Promise<{ blob: Blob; contentType?: string }> => {
        const [info, blob] = await Promise.all([
            getDppMediaInfo(uuid, dataFieldId),
            downloadDppMedia(uuid, dataFieldId),
        ]);
        return { blob, contentType: info?.mimeType };
    };

    return {
        getDppMediaInfo,
        downloadDppMedia,
        fetchDppMedia,
    };
});
