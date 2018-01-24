import React, { Component } from 'react'
import axios from 'axios'
import Editor from './editor.jsx'
import Notes from './notes.jsx'
import styles from './app.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      activeNote: null
    }
  }

  getNotes() {
    axios.get('/notes.json').then(res => {
      const newState = { notes: res.data }
      if (!this.state.activeNote && res.data) {
        newState.activeNote = res.data[0].id
      }
      this.setState(newState)
    })
  }

  addNote() {
    axios
      .post('/notes.json', {
        note: { title: null, content: null }
      })
      .then(() => this.getNotes())
  }

  componentDidMount() {
    this.getNotes()
  }
  
  updateNoteContent(newContent) {
    const notes = this.state.notes
    notes.find(note => note.id === this.state.activeNote).content = newContent
    this.setState({ notes })
  }

  render() {
    let editor
    const activeNote = this.state.notes.find(
      note => note.id === this.state.activeNote
    )
    if (activeNote) {
      editor = (
        <Editor
          noteId={activeNote.id}
          content={activeNote.content}
          title={activeNote.title}
          onDelete={() => this.getNotes()}
          onSave={() => this.getNotes()}
          onChange={newContent => this.updateNoteContent(newContent)}
        />
      )
    }
    return (
      <div className={styles.container}>
        <Notes
          notes={this.state.notes}
          onNoteChange={activeNote => {
            this.setState({
              activeNote
            })
          }}
          onAddNote={this.addNote.bind(this)}
        />
        {editor}
      </div>
    )
  }
}

export default App
