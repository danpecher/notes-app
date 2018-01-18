import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './editor.css'

class Editor extends Component {
    render() {
        return <div className={styles.container}>
            <div 
            className={styles.editable}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.content}}
            ></div>
        </div>
    }
}

Editor.propTypes = {
    content: PropTypes.string.isRequired
}

export default Editor