import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ReactHowler from "react-howler";

interface Props {
    url: string;
}

const MusicPreview: React.FC<Props> = ({ url }) => {
    const [IsPlaying, setIsPlaying] = useState<boolean>(false);

    useMemo(() => {
        setIsPlaying(false);
    }, [url]);

    return (
        <div className="flex justify-center">
            {IsPlaying ? (
                <div
                    className="bg-[#007AFF] hover:bg-[#007AFF]/80 cursor-pointer select-none text-white px-3 py-5 rounded-[0.8rem] font-semibold w-full flex justify-center sm:text-xl text-2xl"
                    onClick={() => setIsPlaying(false)}
                >
                    Pause
                </div>
            ) : (
                <div
                    className="bg-[#007AFF] hover:bg-[#007AFF]/80 cursor-pointer select-none text-white px-3 py-5 rounded-[0.8rem] font-semibold w-full flex justify-center sm:text-xl text-2xl"
                    onClick={() => setIsPlaying(true)}
                >
                    Play
                </div>
            )}
            <ReactHowler src={[url]} playing={IsPlaying} />
        </div>
    );
};

export default MusicPreview;
