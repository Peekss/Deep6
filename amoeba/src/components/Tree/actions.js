import { GET_ROOT, ADD_NODE, GET_CHILD_NODES, GET_NODE, EDIT_NODE, DELETE_NODE, DELETE_ROOTED_NODE } from '../../actionTypes';
import TreeService from '../../services/treeService';

export function getRoot() {
  return dispatch =>
    TreeService.getRoot()
    .then(data => {
      dispatch({
        type: GET_ROOT,
        data,
      });
    })
    .catch(err => console.log(err));
};

export function addNodeWithParent(name, parentId) {
  return dispatch =>
    TreeService.addNodeWithParent(name, parentId)
      .then(data => {
        dispatch({
          type: ADD_NODE,
          data,
        })
      })
      .catch(err => console.log(err));
}

export function getChildNodes(id) {
  return dispatch =>
    TreeService.getChildNodes(id)
      .then(data => {
        dispatch({
          type: GET_CHILD_NODES,
          data,
        })
      })
      .catch(err => console.log(err));
}

export function getNodeById(id) {
  return dispatch =>
    TreeService.getNodeById(id)
      .then(data => {
        dispatch({
          type: GET_NODE,
          data
        })
      })
}

export function editNode(name, id) {
  return dispatch =>
    TreeService.editNode(name, id)
      .then(data => {
        dispatch({
          type: EDIT_NODE,
          data,
        })
      })
}

export function deleteNodeById(id) {
  return dispatch =>
    TreeService.deleteNodeById(id)
      .then(() => {
        dispatch({
          type: DELETE_NODE,
          data: { id },
        })
      })
}

export function deleteRootedNode(id) {
  return dispatch =>
    TreeService.deleteNodeById(id)
      .then(() => {
        dispatch({
          type: DELETE_ROOTED_NODE,
          data: { id },
        })
      })
}