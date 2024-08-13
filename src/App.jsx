import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Home from "./Home";
import Add from "./Add";
import "./App.css";
import Detail from "./Detail";
import Inventory from "./Inventory";
import NutrientContext from "./NutrientContext";
import Modal from "react-modal";

Modal.setAppElement("#root");
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    },
});

const App = () => {
    const inv = useState(null);
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <NutrientContext.Provider value={inv}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/inventory" element={<Inventory />} />

                        <Route path="/add" element={<Add />} />
                        <Route
                            path="add/details/:fdcId"
                            element={<Detail />}
                        ></Route>
                    </Routes>
                </NutrientContext.Provider>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default App;
