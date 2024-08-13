import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to="/add">
                <button>Add</button>
            </Link>
            <Link to="/inventory">
                <button>Inventory</button>
            </Link>
        </div>
    );
};

export default Home;
