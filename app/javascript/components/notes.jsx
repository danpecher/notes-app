import React, { Component } from 'react'
import styles from './notes.css'
import Note from './note.jsx'
import PropTypes from 'prop-types'
import Delta from 'quill-delta'

class Notes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeNote: null,
      query: ''
    }
  }

  componentWillReceiveProps(props) {
    if (!this.state.activeNote && props.notes) {
      this.setState({
        activeNote: props.notes[0].id
      })
    }
  }

  render() {
    let { notes } = this.props

    if (this.state.query) {
      notes = notes.filter(note => {
        const query = this.state.query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

        // convert quill delta to text
        const textContent = new Delta(note.content)
          .filter(op => typeof op.insert === 'string')
          .map(op => op.insert)
          .join('')

        return (
          new RegExp(query, 'i').test(note.title) ||
          new RegExp(query, 'i').test(textContent)
        )
      })
    }

    notes = notes.map(note => (
      <Note
        key={note.id}
        {...note}
        isActive={this.state.activeNote === note.id}
        onClick={() =>
          this.setState({ activeNote: note.id }, () =>
            this.props.onNoteChange(note.id)
          )
        }
      />
    ))

    return (
      <div className={styles.container}>
        <button className={styles.addButton} onClick={this.props.onAddNote}>
          <i className="fa fa-pencil"></i> Add note
        </button>
        <div className={styles.search}>
          <i className="fa fa-search"></i>
          <input
            type="search"
            placeholder={'Search ...'}
            onChange={e => {
              this.setState({
                query: e.target.value
              })
            }}
          />
        </div>
        {notes}
      </div>
    )
  }
}

Notes.propTypes = {
  notes: PropTypes.array,
  onNoteChange: PropTypes.func,
  onAddNote: PropTypes.func
}

export default Notes
