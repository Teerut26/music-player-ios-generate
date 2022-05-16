import { useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Player from "./components/Player";
import { Result } from "./interfaces/response";
import Footer from "./components/Footer";

function App() {
    const [DataSelected, setDataSelected] = useState<Result | undefined>();

    return (
        <div>
            <div className="max-w-2xl mx-auto">
                <Search onSelect={(value) => setDataSelected(value)} />
            </div>
            <div className="flex flex-col items-center p-2 gap-3 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100">
                {DataSelected ? (
                    <>
                        <Player Data={DataSelected} />
                    </>
                ) : (
                    ""
                )}
                <Footer />
            </div>
        </div>
    );
}

export default App;
