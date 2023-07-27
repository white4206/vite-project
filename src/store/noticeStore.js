import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const useNoticeStore = defineStore("notice", () => {
  const noticeList = ref([]);
  const getNoticeList = () => {
    axios
      .get("http://localhost:3000/notice")
      .then((res) => {
        noticeList.value = res.data;
      })
      .catch((err) => console.log(err));
  };
  const noticeFilter = computed(() => {
    return noticeList.value.filter((item) => item.special === true);
  });
  return {
    noticeList,
    getNoticeList,
    noticeFilter,
  };
});
export default useNoticeStore;
