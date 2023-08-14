import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("isTeacher", () => {
  const isTeacher = ref(false);
  const userInformation = ref();
  return {
    isTeacher,
    userInformation,
  };
});
export default useUserStore;
