import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './DeleteQuestModal.module.css';

export default class DeleteChalllengeModal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    onDeleteChallenge: PropTypes.func.isRequired,
  };

  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    const { onCloseModal, cancelEditing } = this.props;
    if (e.code !== 'Escape') {
      return;
    }
    onCloseModal();
    cancelEditing();
  };
  handleBackdropClick = e => {
    const { onCloseModal, cancelEditing } = this.props;
    const { current } = this.backdropRef;
    if (current && e.target !== current) {
      return;
    }
    onCloseModal();
    cancelEditing();
  };

  handleCloseDeletion = () => {
    const { onCloseModal, cancelEditing } = this.props;
    onCloseModal();
    cancelEditing();
  };

  render() {
    const { onDeleteChallenge } = this.props;

    return (
      <div
        className={styles.backdrop}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
        role="presentation"
      >
        <div className={styles.modal}>
          <p className={styles.modalText}>Delete this Challenge?</p>
          <div className={styles.btnCloseModal}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={this.handleCloseDeletion}
            >
              cancel
            </button>
            <button
              type="button"
              className={styles.btnDelete}
              onClick={onDeleteChallenge}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
