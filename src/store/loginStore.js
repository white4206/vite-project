import { defineStore } from "pinia";
import { ref } from "vue";

const useLoginStore = defineStore("isLogin", () => {
  const isLogged = ref(false);
  return {
    isLogged,
  };
});
export default useLoginStore;
