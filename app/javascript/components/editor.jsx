import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './editor.css'
import axios from 'axios'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noteTitle: props.title || ''
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      noteTitle: props.title || ''
    })
  }
  updateTitle(e) {
    this.setState({
      noteTitle: e.target.value
    })
  }
  saveNote() {
    axios
      .patch(`/notes/${this.props.noteId}.json`, {
        note: {
          content: this.refs.content.innerHTML,
          title: this.state.noteTitle
        }
      })
      .then(this.props.onSave)
  }
  deleteNote() {
    axios.delete(`/notes/${this.props.noteId}.json`).then(this.props.onDelete)
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <div className={styles.search}>
            <input
              value={this.state.noteTitle}
              onChange={this.updateTitle.bind(this)}
              type="search"
              placeholder={'Note title ...'}
            />
          </div>
          <button className={styles.button} onClick={() => this.saveNote()}>
            Save
          </button>
          <button className={styles.button} onClick={() => this.deleteNote()}>
            Delete
          </button>
        </div>
        <div
          className={styles.editable}
          contentEditable
          ref="content"
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </div>
    )
  }
}

Editor.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
  noteId: PropTypes.number,
  onDelete: PropTypes.func,
  onSave: PropTypes.func
}

export default Editor
