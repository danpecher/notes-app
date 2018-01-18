import React, {Component} from 'react'
import Editor from './editor.jsx'
import Notes from './notes.jsx'
import styles from './app.css'

class App extends Component {
    render() {
        return <div className={styles.container}>
            <Notes />
            <Editor />
        </div>
    }
}

export default App