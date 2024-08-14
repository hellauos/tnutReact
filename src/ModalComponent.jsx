import { Component } from "react";
import Modal from "react-modal";
import "./App.css";

class ModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
        };
    }

    handleAddNutrient = () => {
        const { selectedNutrient, addNutrient, onRequestClose } = this.props;
        const { comment } = this.state;

        if (selectedNutrient) {
            addNutrient(selectedNutrient, comment);
            console.log("Nutrient added:", selectedNutrient);
        }
        this.setState({ comment: "" });
        onRequestClose();
    };

    handleCommentChange = (e) => {
        this.setState({ comment: e.target.value });
    };

    render() {
        const { isOpen, onRequestClose } = this.props;
        const { comment } = this.state;

        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Add Nutrient Comment"
            >
                <h2>Add Comment for Nutrient</h2>
                <textarea
                    value={comment}
                    onChange={this.handleCommentChange}
                    placeholder="Add your comment here"
                />
                <div className="button-container">
                    <button onClick={this.handleAddNutrient}>Add</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </div>
            </Modal>
        );
    }
}

export default ModalComponent;
