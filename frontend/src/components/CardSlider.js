import React, { useRef, useState, useCallback } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";
import "../css/cardslider.css";

const CardSlider = React.memo(({ data, title }) => {
    const sliderRef = useRef();
    const [position, setPosition] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(false);

    const slide = useCallback((direction) => {
        const offset = sliderRef.current.getBoundingClientRect().x - 70;
        if (direction === "left" && position > 0) {
            sliderRef.current.style.transform = `translateX(${230 + offset}px)`;
            setPosition(position - 1);
        } else if (direction === "right" && position < 4) {
            sliderRef.current.style.transform = `translateX(${-230 + offset}px)`;
            setPosition(position + 1);
        }
    }, [position]);

    return (
        <div className="slider_body" 
            onMouseEnter={() => setControlsVisible(true)}
            onMouseLeave={() => setControlsVisible(false)}
        >
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${!controlsVisible ? "none" : ""}`}>
                    <AiOutlineLeft onClick={() => slide("left")} />
                </div>
                <div className="slider" ref={sliderRef}>
                    {data.map((movie, index) => (
                        <Card movieData={movie} key={movie.id} index={index} />
                    ))}
                </div>
                <div className={`slider-action right ${!controlsVisible ? "none" : ""}`}>
                    <AiOutlineRight onClick={() => slide("right")} />
                </div>
            </div>
        </div>
    );
});

export default CardSlider;