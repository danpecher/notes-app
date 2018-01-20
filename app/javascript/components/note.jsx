import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './note.css'

class Note extends Component {
  render() {
    return (
      <div
        className={`${styles.container} ${
          this.props.isActive ? styles.active : ''
        }`}
        onClick={this.props.onClick}
      >
        <div className={styles.title}>{this.props.title}</div>
      </div>
    )
  }
}

Note.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

export default Note
