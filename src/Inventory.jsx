import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Inventory = () => {
    const [nutrients, setNutrients] = useState([]);
    const [fdcIds, setFdcIds] = useState([]);

    useEffect(() => {
        const storedNutrients = localStorage.getItem("nutrients");
        const storedFdcIds = localStorage.getItem("fdcIds");
        if (storedNutrients) {
            setNutrients(JSON.parse(storedNutrients));
        }
        if (storedFdcIds) {
            setFdcIds(JSON.parse(storedFdcIds));
        }
    }, []);

    const resetInventory = () => {
        setNutrients([]);
        setFdcIds([]);
        localStorage.removeItem("nutrients");
        localStorage.removeItem("fdcIds");
    };

    const deleteNutrient = (index) => {
        const updatedNutrients = nutrients.filter((_, i) => i !== index);
        const updatedFdcIds = fdcIds.filter((_, i) => i !== index);

        setNutrients(updatedNutrients);
        setFdcIds(updatedFdcIds);

        localStorage.setItem("nutrients", JSON.stringify(updatedNutrients));
        localStorage.setItem("fdcIds", JSON.stringify(updatedFdcIds));
    };

    return (
        <div>
            <h1>Inventory</h1>
            <button onClick={resetInventory}>Reset Inventory</button>
            <Link to="/">
                <button>Back</button>
            </Link>

            <ul>
                {nutrients.length === 0 ? (
                    <li>No nutrients added yet.</li>
                ) : (
                    nutrients.map((nutrient, index) => (
                        <li key={index} className="inventory-list">
                            <div className="inventory-list-item">
                                <strong>FDC ID:</strong> {fdcIds[index]}
                            </div>
                            <div className="inventory-list-item">
                                <strong>Nutrient:</strong>{" "}
                                {nutrient.nutrient.name} (
                                {nutrient.nutrient.number}) - {nutrient.amount}{" "}
                                {nutrient.nutrient.unitName}
                            </div>
                            <div className="inventory-list-item">
                                <strong>Comment:</strong> {nutrient.comment}
                            </div>
                            <button onClick={() => deleteNutrient(index)}>
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Inventory;
