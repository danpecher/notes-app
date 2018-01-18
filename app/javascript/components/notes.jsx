import React, {Component} from 'react'
import styles from './notes.css'
import Note from './note.jsx'
import PropTypes from 'prop-types'

class Notes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeNote: 0
        }
    }

    render() {
        const notes = this.props.notes.map((note, i) => <Note key={i} {...note} isActive={this.state.activeNote === i} onClick={() => this.setState({activeNote: i}, () => this.props.onNoteChange(i))} />)

        return <div className={styles.container}>
            {notes}
        </div>
    }
}

Notes.propTypes = {
    notes: PropTypes.array,
    onNoteChange: PropTypes.func
}

export default Notes