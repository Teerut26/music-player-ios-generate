import { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/Search";
import Player from "./components/Player";
import domtoimage from "dom-to-image";
import { copyImageToClipboard } from "copy-image-clipboard";
import { saveAs } from "file-saver";
import { Result } from "./interfaces/response";

function App() {
    let area = useRef<HTMLDivElement>(null);
    const [DataSelected, setDataSelected] = useState<Result | undefined>();
    const [Loading, setLoading] = useState<boolean>(false);

    const handleDownload = async () => {
        setLoading(true);
        const dataUrl = await domtoimage.toPng(area.current as any);
        setLoading(false);
        saveAs(dataUrl, `playerify-${DataSelected?.trackId}.png`);
        window.location.reload()
    };

    return (
        <div>
            <Search onSelect={(value) => setDataSelected(value)} />
            <div className="flex flex-col items-center p-2 gap-3 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100">
                {DataSelected ? (
                    <>
                        <Player
                            Data={DataSelected}
                            onRef={(value) => (area = value)}
                        />
                        <div
                            className="bg-[#007AFF] hover:bg-[#007AFF]/80 cursor-pointer select-none text-white px-3 py-2 rounded-[0.8rem] font-semibold w-full max-w-[585px] mx-auto flex justify-center"
                            onClick={() => handleDownload()}
                        >
                            {Loading ? "Loading..." : "Download"}
                        </div>
                        <div
                            className="bg-[#FF0000] hover:bg-[#FF0000]/80 cursor-pointer select-none text-white px-3 py-2 rounded-[0.8rem] font-semibold w-full max-w-[585px] mx-auto flex justify-center"
                            onClick={() => {
                                setDataSelected(undefined);
                            }}
                        >
                            Clear
                        </div>
                    </>
                ) : (
                    ""
                )}
<div>แนะนำให้ใช้งานบน Application Google Chrome หรือ Google Chrome Desktop</div>
            </div>
        </div>
    );
}

export default App;
