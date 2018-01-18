import React, {Component} from 'react'
import Editor from './editor.jsx'
import Notes from './notes.jsx'
import styles from './app.css'

const DUMMY_NOTES = [
    {title: 'Note 1', content: 'lorem ipsum 1'},
    {title: 'Note 2', content: 'lorem ipsum 2'},
    {title: 'Note 3', content: 'lorem ipsum 3'},
]

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeNote: 0
        }
    }
    
    render() {
        return <div className={styles.container}>
            <Notes notes={DUMMY_NOTES} onNoteChange={(activeNote) => {
                this.setState({
                    activeNote
                })
            }} />
            <Editor content={DUMMY_NOTES[this.state.activeNote].content} />
        </div>
    }
}

export default App