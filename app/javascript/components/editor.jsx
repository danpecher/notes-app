import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './editor.css'
import axios from 'axios'
import Quill from 'quill'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noteTitle: props.title || ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.noteId === this.props.noteId) {
      return
    }
    this.setState({
      noteTitle: nextProps.title || ''
    })
    this.quill.setContents(nextProps.content)
  }
  componentDidMount() {
    this.quill = new Quill(this.refs.editor, {
      theme: 'snow'
    })
    this.quill.setContents(this.props.content)

    this.quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        this.props.onChange(this.quill.getContents())
      }
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
          content: this.quill.getContents(),
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
          <div className={styles.title}>
            <input
              value={this.state.noteTitle}
              onChange={this.updateTitle.bind(this)}
              type="search"
              placeholder={'Note title ...'}
            />
          </div>
          <button className={styles.button} onClick={() => this.saveNote()}>
            <i className="fa fa-save" /> Save
          </button>
          <button className={styles.button} onClick={() => this.deleteNote()}>
            <i className="fa fa-trash" /> Delete
          </button>
        </div>
        <div ref={'editor'} />
      </div>
    )
  }
}

Editor.propTypes = {
  content: PropTypes.object,
  title: PropTypes.string,
  noteId: PropTypes.number,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  onChange: PropTypes.func
}

export default Editor
