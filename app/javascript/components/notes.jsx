import React, { Component } from 'react'
import styles from './notes.css'
import Note from './note.jsx'
import PropTypes from 'prop-types'

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
        const div = document.createElement('div')
        div.innerHTML = note.content
        const textContent = div.innerText
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
          Add note
        </button>
        <input
          type="search"
          className={styles.search}
          placeholder={'Search ...'}
          onChange={e => {
            this.setState({
              query: e.target.value
            })
          }}
        />
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
