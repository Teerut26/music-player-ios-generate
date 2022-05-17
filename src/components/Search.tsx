import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Response, Result } from "../interfaces/response";

interface Props {
    onSelect: (music: Result) => void;
}

const Search: React.FC<Props> = ({ onSelect }) => {
    const [keyWord, sekeyWord] = useState<string>("");
    const [musicList, setmMusicList] = useState<Result[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = async () => {
        if (keyWord.length === 0) return
        setLoading(true);
        let { data } = await axios.get<Response>(
            `https://itunes.apple.com/search?term=${keyWord}&limit=20&kind=song`
        );
        setmMusicList(data.results.filter((item) => item.kind === "song"));
        setLoading(false);
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => getData(), 500);
        return () => clearTimeout(timeOutId);
    }, [keyWord]);

    return (
        <div className="bg-blue-400 p-3 flex flex-col w-full">
            <div className="w-full relative">
                <input
                    onChange={(e) => sekeyWord(e.target.value)}
                    type="search"
                    className={`focus:outline-none p-2 shadow-md ${
                        keyWord.length > 0 ? "rounded-t-xl" : "rounded-xl"
                    } w-full`}
                    placeholder="ค้นหาเพลง"
                />
                {keyWord.length > 0 ? (
                    <div className="absolute bg-white rounded-b-xl right-0 left-0 p-3 flex flex-col gap-2 divide-y divide-light-500 shadow-md z-20">
                        {!loading
                            ? musicList.map((item, index) => (
                                  <div
                                      onClick={() => {
                                          onSelect(item);
                                          sekeyWord("");
                                      }}
                                      key={index}
                                      className="flex items-center gap-2 hover:bg-gray-200 cursor-pointer select-none"
                                  >
                                      <div className="">
                                          <img
                                              className="w-[60px]"
                                              src={item.artworkUrl60}
                                              alt=""
                                          />
                                      </div>
                                      <div className="flex flex-col flex-1 truncate">
                                          <div className="truncate">
                                              {item.trackName}
                                          </div>
                                          <div>{item.artistName}</div>
                                      </div>
                                  </div>
                              ))
                            : "Loading..."}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Search;
