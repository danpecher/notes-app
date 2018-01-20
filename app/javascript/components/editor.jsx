import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './editor.css'
import axios from 'axios'

class Editor extends Component {
  state = {
    content: this.props.content
  }
  saveNote() {
    axios.patch(`/notes/${this.props.noteId}.json`, {
      note: {
        content: this.refs.content.innerHTML
      }
    }).then(this.props.onSave)
  }
  deleteNote() {
    axios.delete(`/notes/${this.props.noteId}.json`).then(this.props.onDelete)
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
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
  noteId: PropTypes.number,
  onDelete: PropTypes.func,
  onSave: PropTypes.func
}

export default Editor
