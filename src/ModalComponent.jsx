import Modal from "react-modal";
import { useState } from "react";
import "./App.css";

const ModalComponent = ({
    isOpen,
    onRequestClose,
    selectedNutrient,
    addNutrient,
}) => {
    const [comment, setComment] = useState("");

    const handleAddNutrient = () => {
        if (selectedNutrient) {
            addNutrient(selectedNutrient, comment);
            console.log("Nutrient added:", selectedNutrient);
        }
        setComment("");
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Nutrient Comment"
            // className="custom-model"
        >
            <h2>Add Comment for Nutrient</h2>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment here"
                required
            />
            <div className="button-container">
                <button onClick={handleAddNutrient}>Add</button>
                <button onClick={onRequestClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default ModalComponent;
