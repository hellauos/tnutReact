import { useEffect, useState } from "react";
import { fetchFoodData } from "./food";
import { Link } from "react-router-dom";

import "./App.css";

const Add = () => {
    const [dataTypes, setDataTypes] = useState([]);

    useEffect(() => {
        const getDataTypes = async () => {
            const data = await fetchFoodData();
            setDataTypes(data);
        };
        getDataTypes();
    }, []);
    if (dataTypes.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Choose Food Type</h1>
            <Link to="/">
                <button>Back</button>
            </Link>
            <ul className="food-list">
                {dataTypes.length > 0 ? (
                    dataTypes.map((item) => (
                        <li key={item.listFdcId} className="food-list-item">
                            <Link to={`details/${item.listFdcId}`}>
                                {item.listFdcId} - {item.listDataType} -{" "}
                                {item.listDesc}
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>Loading...</li>
                )}
            </ul>
        </div>
    );
};

export default Add;
