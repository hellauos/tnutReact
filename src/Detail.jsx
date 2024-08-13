import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFoodDetails } from "./foodDetails";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";

const Detail = () => {
    const { fdcId } = useParams();
    const { data, isLoading } = useQuery(["details", fdcId], fetchFoodDetails);
    const [nutrients, setNutrients] = useState([]);
    const [addedFdcIds, setAddedFdcIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNutrient, setSelectedNutrient] = useState(null);

    useEffect(() => {
        const storedNutrients =
            JSON.parse(localStorage.getItem("nutrients")) || [];
        const storedFdcIds = JSON.parse(localStorage.getItem("fdcIds")) || [];
        setNutrients(storedNutrients);
        setAddedFdcIds(storedFdcIds);
    }, []);

    const addNutrient = (nutrient, comment) => {
        const updatedNutrients = [...nutrients, { ...nutrient, comment }];
        setNutrients(updatedNutrients);
        localStorage.setItem("nutrients", JSON.stringify(updatedNutrients));

        const updatedFdcIds = [...addedFdcIds, fdcId];
        setAddedFdcIds(updatedFdcIds);
        localStorage.setItem("fdcIds", JSON.stringify(updatedFdcIds));
    };

    const openModal = (nutrient) => {
        setSelectedNutrient(nutrient);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const food = data;

    return (
        <div>
            <h1>Details for FDC ID: {fdcId}</h1>
            <Link to="/add">
                <button>Back</button>
            </Link>
            <Link to="/inventory">
                <button>Inventory</button>
            </Link>
            <div className="details">
                <ul className="food-list">
                    {food.foodNutrients.map((item) => (
                        <li key={item.nutrient.id} className="food-list-item">
                            {item.nutrient.name} ({item.nutrient.number}) -{" "}
                            {item.amount} {item.nutrient.unitName}
                            <button onClick={() => openModal(item)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>

            <ModalComponent
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                selectedNutrient={selectedNutrient}
                addNutrient={addNutrient}
            />
        </div>
    );
};

export default Detail;
