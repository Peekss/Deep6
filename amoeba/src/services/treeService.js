// Service
import request from "../utils/request";

const getRoot = () => {
  return request({
    url: "/",
    method: "GET",
  });
};

const addNodeWithParent = (name, parentId) => {
  return request({
    url: `/amoeba/${parentId}`,
    method: "POST",
    data: { name },
  });
};

const getChildNodes = (id) => {
  return request({
    url: `/amoeba/${id}`,
    method: "GET",
  });
};

const getNodeById = (id) => {
  return request({
    url: `/amoeba/${id}`,
    method: "GET",
  });
};

const editNode = (name, id) => {
  return request({
    url: `/amoeba/${id}`,
    method: "PUT",
    data: { name },
  });
};

const deleteNodeById = (id) => {
  return request({
    url: `/amoeba/${id}`,
    method: "DELETE",
  });
};

export const TreeService = {
  getRoot,
  addNodeWithParent,
  getChildNodes,
  getNodeById,
  editNode,
  deleteNodeById,
};
export default TreeService;
