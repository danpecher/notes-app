import React, {Component} from 'react'
import Editor from './editor.jsx'
import Notes from './notes.jsx'

class App extends Component {
    render() {
        return <div>
            <Notes />
            <Editor />
        </div>
    }
}

export default App