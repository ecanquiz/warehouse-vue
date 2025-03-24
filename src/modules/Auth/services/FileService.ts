import Http from "@/core/utils/Http";

export default {
  uploadFile(payload) {
    return Http.post(payload.endpoint, payload.file);
  },
};
