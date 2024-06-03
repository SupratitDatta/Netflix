import React from "react";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../utils";
import "../css/select.css"

export default function SelectGenre({ genres, type }) {
    const dispatch = useDispatch();
    return (
        <select className="select_body" defaultValue="Select Genre" onChange={(e) => { dispatch(fetchDataByGenre({ genres, genre: e.target.value, type, })); }}>
            <option className="genre" value="">Select Genre</option>
            {genres.map((genre) => {
                return (
                    <option className="genre" value={genre.id} key={genre.id}>{genre.name}</option>
                );
            })}
        </select>
    );
}
