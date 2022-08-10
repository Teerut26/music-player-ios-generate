import saveAs from "file-saver";
import domtoimage from "dom-to-image";
import React, { useEffect, useRef, useState } from "react";
import { Result } from "../interfaces/response";
import { copyImageToClipboard } from "copy-image-clipboard";
import SelectDevices from "./SelectDevices";
import moment from "moment";
import MusicPreview from "./MusicPreview";
import { Slider } from "@mui/material";

interface Props {
    Data: Result;
}

const Player: React.FC<Props> = ({ Data }) => {
    const area = useRef<HTMLDivElement>(null);
    const [Loading, setLoading] = useState<boolean>(false);
    const [clipboardBtnLoading, setclipboardBtnLoading] =
        useState<boolean>(false);

    const [Devices, setDevices] = useState<string>("iPhone");
    const [scale, setScale] = useState(1);

    const handleDownload = async () => {
        setLoading(true);
        // const dataUrl = await domtoimage.toPng(area.current as any);
        const dataUrl = await domtoimage.toPng(area.current as any, {
            width: area.current?.clientWidth! * scale,
            height: area.current?.clientHeight! * scale,
            style: {
                transform: "scale(" + scale + ")",
                transformOrigin: "top left",
            },
        });
        setLoading(false);
        saveAs(dataUrl, `playerify-${Data?.trackId}.png`);
    };

    const copyToClipboard = async () => {
        setclipboardBtnLoading(true);
        const dataUrl = await domtoimage.toPng(area.current as any);
        let img = new Image();
        img.src = dataUrl;
        await copyImageToClipboard(img.src);
        img.remove();
        setclipboardBtnLoading(false);
    };

    return (
        <div className="flex flex-col items-center">
            <div ref={area} className="p-10 bg-white ">
                <div className="w-[585px] h-[1007px] border-2 flex flex-col gap-5 items-center p-10 rounded-[3rem] bg-[#F6F6F6]">
                    <div>
                        <img
                            className="rounded-[2rem]"
                            src={Data.artworkUrl100.replace(
                                "100x100bb.jpg",
                                "1000x1000bb.jpg"
                            )}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="self-start w-full text-[#898989] text-[22px] mt-[20px] font-semibold">
                            {Devices}
                        </div>
                        <div className="self-start w-full flex relative">
                            <div className=" text-black text-[37px] font-semibold truncate w-[78%]">
                                {Data.trackName}
                            </div>
                            <svg
                                className="w-10 absolute right-0 bottom-[-46px]"
                                width="122"
                                height="121"
                                viewBox="0 0 122 121"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M103.546 103.233C98.5094 100.99 97.7476 97.4349 100.371 92.9913C102.784 88.8862 105.789 85.1197 107.82 80.8877C122.167 50.6285 100.118 17.9996 75.2331 11.6938C47.2593 4.58397 22.375 19.6923 13.6993 40.4293C7.18191 55.9609 8.11292 71.2387 16.577 85.9662C18.6507 89.6057 22.5018 92.2296 22.8827 96.7578C23.052 98.9162 22.2054 100.905 20.3433 102.217C18.058 103.825 16.4076 102.471 15.138 100.736C0.241203 80.7184 -5.42964 59.4313 6.25081 35.7318C18.1852 11.4822 37.8641 -1.51036 64.6106 0.14014C108.962 2.84865 137.529 52.7869 112.39 92.2719C109.893 96.123 108.285 100.99 103.546 103.233Z"
                                    fill="#939297"
                                />
                                <path
                                    d="M61.1825 119.953C50.6447 119.953 40.1491 120.165 29.6113 119.869C22.8823 119.7 20.5547 115.595 24.5752 110.939C34.8167 99.005 45.4817 87.3668 56.0195 75.644C58.9819 72.343 62.1136 72.0467 65.4992 75.263C77.2643 86.5626 87.4211 99.3011 97.8743 111.786C100.752 115.214 98.8054 119.53 94.3195 119.657C83.2738 119.996 72.2281 119.784 61.1825 119.784C61.1825 119.827 61.1825 119.911 61.1825 119.953Z"
                                    fill="#939297"
                                />
                                <path
                                    d="M60.2946 27.9887C35.791 28.2003 20.0903 51.5189 29.2739 74.2873C30.6281 77.673 33.0404 80.5932 34.6063 83.8942C35.5797 85.9679 34.8176 87.9567 33.0402 89.5226C31.0511 91.3001 29.3585 90.6655 27.6657 88.9727C17.932 79.239 13.9115 60.4063 19.4131 47.8794C31.0512 21.5984 47.0061 15.462 71.0018 19.1439C88.3109 21.8101 98.0021 34.887 103.419 50.5456C108.413 64.8499 103.208 77.4192 94.3204 88.7188C92.9661 90.4116 91.1463 91.4695 88.988 89.7344C87.2105 88.2955 86.1525 86.2218 87.1259 84.1904C88.4378 81.355 90.8077 78.9849 92.0773 76.1494C102.615 52.2384 86.4063 27.7348 60.2946 27.9887Z"
                                    fill="#939297"
                                />
                                <path
                                    d="M35.1562 63.5822C34.9023 48.8546 40.0232 41.2369 51.9576 37.0895C62.9609 33.323 74.0911 35.7775 80.6507 43.3952C87.8452 51.7747 88.9456 66.5021 83.1054 75.8549C81.8358 77.8863 80.2276 79.029 78.0269 77.7594C76.2494 76.7437 74.3452 75.3895 75.3186 72.808C76.8421 68.7875 77.2229 64.6402 77.096 60.4081C76.7997 50.4205 71.2558 44.7072 61.5644 44.284C51.8307 43.8608 44.9323 50.5051 44.6783 60.662C44.5937 64.8941 45.1018 68.9991 46.4984 73.0619C47.3871 75.5165 45.4403 76.9975 43.5782 77.8862C41.3352 78.9866 39.854 77.7172 38.5421 75.7281C35.9605 71.5807 34.8177 67.0948 35.1562 63.5822Z"
                                    fill="#939297"
                                />
                            </svg>
                        </div>
                        <div className="self-start w-[90%] text-black text-[37px] truncate ">
                            {Data.artistName} - {Data.collectionName}
                        </div>
                        <div className="relative mt-5">
                            <div className="bg-[#A4A4A4] border-0 rounded-full overflow-hidden">
                                <div
                                    style={{
                                        width:
                                            (27 * 100) /
                                                ((Data.trackTimeMillis as number) *
                                                    0.001) +
                                            "%",
                                    }}
                                    className={`bg-black  h-2`}
                                ></div>
                            </div>
                        </div>
                        <div className="flex justify-between font-semibold mt-2 text-[22px] text-[#A8A8A8]">
                            <div>0:27</div>
                            <div>
                                -
                                {moment
                                    .utc(Data.trackTimeMillis)
                                    .subtract(27, "seconds")
                                    .format("m:ss")}
                            </div>
                        </div>
                        <div className="flex justify-between px-[5rem] items-center py-[1.5rem] mb-2">
                            <svg
                                className="w-20 text-black"
                                width="169"
                                height="109"
                                viewBox="0 0 169 109"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.65584 60.4574C5.22323 57.7226 5.22322 51.2774 9.65583 48.5426L65.8245 13.8881C70.4881 11.0108 76.5 14.3657 76.5 19.8455V89.1545C76.5 94.6343 70.4881 97.9892 65.8245 95.1119L9.65584 60.4574Z"
                                    fill="#CFCFD1"
                                />
                                <path
                                    d="M76.6558 60.4574C72.2232 57.7226 72.2232 51.2774 76.6558 48.5426L132.824 13.8881C137.488 11.0108 143.5 14.3657 143.5 19.8455V89.1545C143.5 94.6343 137.488 97.9892 132.824 95.1119L76.6558 60.4574Z"
                                    fill="#CFCFD1"
                                />
                            </svg>

                            <svg
                                className="w-12"
                                width="94"
                                height="129"
                                viewBox="0 0 94 129"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="37"
                                    height="129"
                                    rx="7"
                                    fill="#000000"
                                />
                                <rect
                                    x="57"
                                    width="37"
                                    height="129"
                                    rx="7"
                                    fill="#000000"
                                />
                            </svg>
                            <svg
                                className="w-20"
                                width="169"
                                height="110"
                                viewBox="0 0 169 110"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M159.343 49.5387C163.776 52.2735 163.776 58.7187 159.343 61.4535L103.175 96.108C98.5109 98.9853 92.499 95.6304 92.499 90.1506L92.499 20.8416C92.499 15.3618 98.5109 12.0069 103.175 14.8842L159.343 49.5387Z"
                                    fill="#000000"
                                />
                                <path
                                    d="M92.3432 49.5387C96.7758 52.2735 96.7758 58.7187 92.3432 61.4535L36.1746 96.108C31.5109 98.9853 25.499 95.6304 25.499 90.1506L25.499 20.8416C25.499 15.3618 31.5109 12.0069 36.1746 14.8842L92.3432 49.5387Z"
                                    fill="#000000"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2 max-w-[585px] mx-auto ">
                <SelectDevices onChange={(v) => setDevices(v)} />
                <Slider
                    onChange={(v:any) => setScale(v.target?.value)}
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
                <MusicPreview url={Data.previewUrl} />
                <div
                    className="bg-[#007AFF] hover:bg-[#007AFF]/80 cursor-pointer select-none text-white px-3 py-5 rounded-[0.8rem] font-semibold w-full flex justify-center sm:text-xl text-2xl"
                    onClick={() => handleDownload()}
                >
                    {Loading ? "Loading..." : "Download"}
                </div>
                <div
                    className="bg-[#007AFF] hover:bg-[#007AFF]/80 cursor-pointer select-none text-white px-3 py-5 rounded-[0.8rem] font-semibold w-full flex justify-center sm:text-xl text-2xl"
                    onClick={() => copyToClipboard()}
                >
                    {clipboardBtnLoading ? "Loading..." : "Copy"}
                </div>
            </div>
        </div>
    );
};

export default Player;
