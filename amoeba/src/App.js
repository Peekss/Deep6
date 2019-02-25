import React, { Component, Fragment } from 'react';
import './App.css';
import Tree from './components/Tree';
import ModalRoot from './components/Modal/ModalRoot';

// const EditableInput = editable(Input);

class App extends Component {
  render() {
    return (
      <Fragment>
        <Tree {...this.props} />
        <ModalRoot />
      </Fragment>
    );
  }
}

export default App;
