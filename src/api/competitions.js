import service from "../utils/service.js";

const getCompetitions = (pagenum) => {
  return service.request({
    url: `/match/matchpage/${pagenum}`,
    method: "get",
  });
};
const competitionsDetail = (matchid) => {
  return service.request({
    url: `/match/matchbyid/${matchid}`,
    method: "get",
  });
};
const positionStep = (params) => {
  return service.request({
    url: `/step/positionstep`,
    method: "get",
    params: params,
  });
};
export { getCompetitions, competitionsDetail, positionStep };
