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
      this.setState({
        notes: res.data,
        activeNote: res.data.length && !this.state.activeNote ? 0 : this.state.activeNote
      })
    })
  }

  addNote() {
    axios
      .post('/notes.json', {
        note: {title: null, content: null}
      })
      .then(() => this.getNotes())
  }

  componentDidMount() {
    this.getNotes()
  }

  render() {
    let editor
    if (this.state.notes[this.state.activeNote]) {
      const activeNote = this.state.notes[this.state.activeNote]
      editor = (
        <Editor
          noteId={activeNote.id}
          content={activeNote.content}
          title={activeNote.title}
          onDelete={() => this.getNotes()}
          onSave={() => this.getNotes()}
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
