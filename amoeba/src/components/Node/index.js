import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNodeWithParent, getNodeById, editNode, deleteNodeById, deleteRootedNode } from '../Tree/actions';
import Input from '../Input';
import Button from '../Button';
import { showModal } from '../Modal/actions';
import './node.css';


class Node extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    childNodes: PropTypes.arrayOf(PropTypes.object.isRequired),
    addNodeWithParent: PropTypes.func.isRequired,
  }

  state = {
    editing: false,
    adding: false,
    name: '',
    newName: this.props.node.name,
  }

  componentDidMount() {
    if (!this.props.node.children) {
      this.props.getNodeById(this.props.node.id);
    }
  }

  handleClick = () => {
    this.setState({ adding: true })
  }

  handleAddNewNameChange = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  }

  handleUpdateNodeName = (e) => {
    const { value } = e.target;
    this.setState({ newName: value });
  }

  handleCheckClick = () => {
    const { name } = this.state;
    const { node } = this.props;
    
    this.setState({ adding: false });
    this.props.addNodeWithParent(name, node.id);
  }

  handleUpdateNameClick = () => {
    const { newName } = this.state;
    const { node } = this.props;
    
    this.setState({ editing: false });
    this.props.editNode(newName, node.id);
  }

  handleDeleteNodeClick = () => {
    const { node, isRoot } = this.props;

    if (isRoot) {
      this.props.deleteRootedNode(node.id);
    } else {
      this.props.deleteNodeById(node.id);
    }
  }

  showDeleteModal = () => {
    this.props.showModal('DELETE_NODE', {
      node: this.props.node,
      onDelete: this.handleDeleteNodeClick,
      isRoot: this.props.isRoot,
      isAmoeba: this.props.isAmoeba,
    })
  }

  renderAddNewNodeInput = () => {
    const { adding, name } = this.state;
    
    if (!adding) {
      return (
        <div className="Node--adding__button">
          <Button
            onClick={this.handleClick}
            icon={<i className="fas fa-plus-circle"></i>}
            cta="secondary"
            title="Add"
          />
        </div>
      );
    }
    return (
      <div className="Node--adding">
        <label>
          Add Node:
          <Input onChange={this.handleAddNewNameChange} value={name} />
        </label>
        <div>
          <Button
            icon={<i className="fas fa-check"></i>}
            onClick={this.handleCheckClick}
            cta="secondary"
            title="Save name"
          />
          <Button
            icon={<i className="fas fa-times"></i>}
            onClick={() => this.setState({ adding: false, name: '' })}
            cta="secondary"
            title="Cancel"
          />
        </div>
      </div>
    );
  }

  renderEditableNodeName = () => {
    const { node } = this.props;
    const { editing, newName } = this.state;

    if (editing) {
      return (
        <div className="Node--editing">
          <label>
            Edit Name:
            <Input onChange={this.handleUpdateNodeName} value={newName} />
          </label>
          <div>
            <Button
              onClick={this.handleUpdateNameClick}
              icon={<i className="fas fa-check"></i>}
              title="Save Name"
              cta="secondary"
            />
            <Button
              onClick={() => this.setState({ editing: false })}
              icon={<i className="fas fa-times"></i>}
              title="Cancel"
              cta="secondary"
            />
          </div>
        </div>
      )
    }
    return (
      <div
        className="Node__name"
        onClick={() => this.setState({ editing: true })}
        title={node.name}
      >
        <p>{node.name}</p>
      </div>
    );
  }

  renderNodeHeading = () => {
    const { node } = this.props;
    return (
      <div className="Node__heading">
        <Link to={`/${node.id}`} target="_blank">
          <div>
            <Button
              icon={<i className="fas fa-external-link-alt"></i>}
              cta="secondary"
              title="Open in new tab"
            />
          </div>
        </Link>
        <div>
          <Button
            onClick={this.showDeleteModal}
            icon={<i className="fas fa-trash-alt"></i>}
            cta="secondary"
            title="Delete Node"
          />
        </div>
      </div>
    );
  }

  render() {
    const { childNodes } = this.props;
    
    return (
      <div>
        <div className="Node">
          {this.renderNodeHeading()}
          {this.renderEditableNodeName()}
          {this.renderAddNewNodeInput()}
        </div>

        <div className="Node__children">
          {childNodes !== undefined && childNodes.map(cn => <NodeContainer node={cn} key={cn.id} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    childNodes: ownProps.node.children && ownProps.node.children.map(child => state.tree[child.id])
  }
}

const NodeContainer = connect(mapStateToProps, { addNodeWithParent, getNodeById, editNode, deleteNodeById, showModal, deleteRootedNode })(Node);

Node = connect(mapStateToProps, { addNodeWithParent, getNodeById, deleteNodeById, showModal, deleteRootedNode })(Node);
export default Node;