import React, { Component } from 'react';
import { connect } from 'react-redux';
import Node from '../Node';
import {
  getNodeById
} from './actions';

class Tree extends Component {
  componentDidMount() {
    const { getNodeById, location: { pathname } } = this.props;
    const nodeId = pathname.split('/').pop() || 1;
    
    if (getNodeById) {
      getNodeById(nodeId);
    }
  }

  render() {
    if (!this.props.tree) return <span>Loading tree...</span>
    
    const { tree } = this.props;
    const root = tree[Object.keys(tree)[0]];

    if (root === undefined) {
      return (
        <div>
          <p>The root of this subtree has been deleted. You will be redirected back to the amoeba.</p>
          {window.location.assign("/")}
        </div>
      );
    }
    
    const isRoot = root.parentId === null || root.id.toString() === this.props.location.pathname.split('/').pop();
    const isAmoeba = root.parentId === null && root.name.toLowerCase() === 'amoeba';
    return (
      <div>
        <Node
          node={root}
          isRoot={isRoot}
          isAmoeba={isAmoeba}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tree: state.tree
  }
}
export default connect(mapStateToProps, { getNodeById })(Tree);