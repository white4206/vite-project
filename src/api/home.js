import service from "../utils/service.js";

const getAllPush = () => {
  return service.request({
    url: `/user/allPush`,
    method: "get",
  });
};
const getNotifyUpdates = () => {
  return service.request({
    url: `/info/NotifyUpdates`,
    method: "get",
  });
};

export { getAllPush, getNotifyUpdates };
