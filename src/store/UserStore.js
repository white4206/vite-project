import { defineStore } from "pinia";
import { ref } from "vue";

const useTeacherStore = defineStore("isTeacher", () => {
  const isTeacher = ref(false);
  return {
    isTeacher,
  };
});
export default useTeacherStore;
