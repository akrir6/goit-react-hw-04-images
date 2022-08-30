
import PropTypes from 'prop-types';
import { Component } from "react";
import { Overlay, Modal } from "./Modal.styled";

export class ModalWindow extends Component {
    static propTypes = {
        onClickOverlay: PropTypes.func.isRequired,
        modalImageSrc: PropTypes.string.isRequired,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.closeModalOnEscKey);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModalOnEscKey);
    }

    closeModalOnEscKey = (e)=> {
        if (e.code === 'Escape') {
            this.props.onClickOverlay();
        }
    }

    handleClickBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onClickOverlay();
        }
    };


    render() {
        return (
            <Overlay onClick={this.handleClickBackdrop}>
               <Modal src={this.props.modalImageSrc} alt="" />
            </Overlay>
        )
    }
}
