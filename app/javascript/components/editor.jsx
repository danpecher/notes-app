import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './editor.css'

class Editor extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button className={styles.button}>Save</button>
          <button className={styles.button}>Delete</button>
        </div>
        <div
          className={styles.editable}
          contentEditable
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </div>
    )
  }
}

Editor.propTypes = {
  content: PropTypes.string
}

export default Editor
