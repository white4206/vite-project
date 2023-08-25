import service from "../utils/service.js";
const createdTeams = () => {
  return service.request({
    url: "/group/searchadd",
    method: "get",
  });
};
const createTeam = (data) => {
  return service.request({
    url: "/group/creategroup",
    method: "post",
    data: data,
  });
};
const teamMember = (params) => {
  return service.request({
    url: `/group/stumember/${params}`,
    method: "get",
  });
};
const teamTeacher = (params) => {
  return service.request({
    url: `/group/teachermember/${params}`,
    method: "get",
  });
};
const inviteMember = (params, data) => {
  return service.request({
    url: `/group/invitemembers/${params}`,
    method: "post",
    headers: data,
  });
};

const inviteTeacher = (params, data) => {
  return service.request({
    url: `/group/inviteguider/${params}?username=${data}`,
    method: "post",
  });
};
const deleteTeam = (params) => {
  return service.request({
    url: `/group/deletegroup/${params}`,
    method: "get",
  });
};
const deleteMember = (gid, uid) => {
  return service.request({
    url: `/group/deletemember?groupid=${gid}&userid=${uid}`,
    method: "get",
  });
};
const deleteTeacher = (gid, uid) => {
  return service.request({
    url: `/group/deleteguider?groupid=${gid}&userid=${uid}`,
    method: "get",
  });
};
const changeManager = (gid, uid) => {
  return service.request({
    url: `/group/setgroupmanager?groupid=${gid}&userid=${uid}`,
    method: "get",
  });
};
const joinedTeams = () => {
  return service.request({
    url: `/group/searchjoin`,
    method: "get",
  });
};
const joinedTeamDetail = (gruopid) => {
  return service.request({
    url: `/user/groupcard/${gruopid}`,
    method: "get",
  });
};
export {
  createdTeams,
  createTeam,
  teamMember,
  teamTeacher,
  inviteMember,
  inviteTeacher,
  deleteTeam,
  deleteMember,
  deleteTeacher,
  changeManager,
  joinedTeams,
  joinedTeamDetail,
};
