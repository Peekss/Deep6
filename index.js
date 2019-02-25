import React, { Component } from 'react';
import Button from '../../Button';
import './deletenodemodal.css';

class DeleteNodeModal extends Component {
  handleDeleteClick = () => {
    if (this.props.onDelete) {
      this.props.onDelete();
      this.props.onClose();
    }
  }

  handleCloseModal = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  render() {
    const { node, isAmoeba } = this.props;
    
    return (
      <div className="DeleteNodeModal">
        <div className="DeleteNodeModal__close">
          <Button
            onClick={this.handleCloseModal}
            icon={<i className="fas fa-times"></i>}
            cta="secondary"
          />
        </div>
        <div className="DeleteNodeModal__body">
          <h2>Delete Node: &quot;{node.name}&quot;</h2>
          {
            isAmoeba ? 
            <p>You cannot delete &quot;{node.name}&quot; because it is the root node.</p> :
            <div>
              <p>Are you sure you want to delete &quot;{node.name}&quot;?</p>
              <p className="DeleteNodeModal--warning">Warning: Deleting it will also delete all of its children and you will be redirected back to &quot;amoeba&quot;.</p>
              <div className="DeleteNodeModal__ctas">
                <Button
                  onClick={this.handleDeleteClick}
                  value="Yes, Delete"
                  cta="danger"
                />
                <Button
                  onClick={this.handleCloseModal}
                  value="Cancel"
                  cta="secondary"
                />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default DeleteNodeModal;