import React, {Component} from 'react'
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
        axios.get('/notes.json')
            .then(res => {
                this.setState({
                    notes: res.data,
                    activeNote: res.data.length ? 0 : null
                })
            })
    }
    
    addNote() {
        axios.post('/notes.json', {
            note: {
                title: '(No name)'
            }
        }).then(() => this.getNotes())
    }

    componentDidMount() {
        this.getNotes()
    }
    
    render() {
        let editor
        if (this.state.notes[this.state.activeNote]) {
            editor = <Editor content={this.state.notes[this.state.activeNote].content} />
        }
        return <div className={styles.container}>
            <Notes notes={this.state.notes} 
                onNoteChange={(activeNote) => {
                    this.setState({
                        activeNote
                    })
                }} 
                onAddNote={this.addNote.bind(this)}
            />
            {editor}
        </div>
    }
}

export default App