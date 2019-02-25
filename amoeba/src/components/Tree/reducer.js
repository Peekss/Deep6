import { GET_ROOT, ADD_NODE, DELETE_ROOTED_NODE, GET_NODE, EDIT_NODE, DELETE_NODE } from '../../actionTypes';

function tree(state = null, action) {
  // console.log(action.data, action.type)
  switch(action.type) {
    case GET_ROOT: {
      const newState = {
        [action.data.id]: {
          ...action.data
        }
      };
      action.data.children.forEach(c => {
          newState[c.id] = { ...c };
      });
      return newState;
    }
    case GET_NODE: {
      const { children, id } = action.data;
      const nextState = {
        [id]: { ...action.data }
      }
      children.forEach(child => {
        nextState[child.id] = { ...child };
      });
      return Object.assign({}, state, nextState);
    }
    case EDIT_NODE: {
      const { node } = action.data;
      return Object.assign({}, state, { [node.id]: { ...state[node.id], name: node.name }});
    }
    case ADD_NODE: {
      const { node } = action.data;
      const nextState = {
        [node.id]: { ...node, children: [] },
        [node.parentId]: { ...state[node.parentId], children: state[node.parentId].children.concat(node) }
      };
      return Object.assign({}, state, nextState);
    }
    case DELETE_NODE: {
      const { id } = action.data;
      const node = state[id];
      const parentId = node.parentId;

      const nextState = {
        [parentId]: {
          ...state[parentId],
          children: state[parentId].children.filter(c => c.id !== node.id)
        }
      };
      return Object.assign({}, state, nextState);
    }
    case DELETE_ROOTED_NODE: {
      return {};
    }
    default:
      return state;
  }
}

export default tree;
