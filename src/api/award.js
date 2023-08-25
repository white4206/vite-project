import service from "../utils/service.js";

const teamAwards = (groupid) => {
  return service.request({
    url: `/user/awardsbygroupname/${groupid}`,
    method: "get",
  });
};

export { teamAwards };
