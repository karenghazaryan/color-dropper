import React, {useState, useEffect, useRef} from 'react';
import {dropperHeight, dropperWidth} from "../../constants";
import '../../styles/dropper.scss';

function Dropper(props) {
    let {onChangeColor} = props;
    const [canvas, setCanvas] = useState(null);
    const [offsetLeft, setOffsetLeft] = useState(null);
    const [offsetTop, setOffsetTop] = useState(null);
    const [isHover, setIsHover] = useState(false);
    const [colorHex, setColorHex] = useState(null);
    const zoomEl = useRef(null);
    const pickerEl = useRef(null);

    useEffect(() => {
        window.addEventListener('mousemove', handleMove, false);
        return function () {
            window.removeEventListener('mousemove', handleMove);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps,
    }, [canvas, offsetLeft, offsetTop]);

    const handleClick = () => {
        if (isHover) {
            onChangeColor(colorHex);
        }
    }

    const handleMove = (e) => {
        let canvasEl = e.target.closest('#canvas') || null;

        if (canvasEl) {
            setCanvas(canvasEl);
            setOffsetLeft(canvasEl.offsetLeft);
            setOffsetTop(canvasEl.offsetTop);
        }

        setTimeout(() => {
            if (canvas || e.target.closest('.picker')) {
                const x = e.pageX - offsetLeft;
                const y = e.pageY - offsetTop;
                if (x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height) {
                    setIsHover(true);
                    pickerEl.current.style.transform = `translate(${e.pageX - dropperWidth / 2}px, ${e.pageY - dropperHeight / 2}px)`;
                    zoom(canvas, x, y);
                    pick();
                } else {
                    setIsHover(false)
                }
            }
        })
    }

    const zoom = (canvas, x, y) => {
        let ctx = zoomEl.current.getContext('2d');
        ctx.drawImage(canvas,
            Math.abs(x - 5),
            Math.abs(y - 5),
            10, 10,
            0, 0,
            200, 200)
    }

    const pick = () => {
        const pixel = zoomEl.current.getContext('2d').getImageData(150, 75, 1, 1);
        const data = pixel.data;
        const hex = rgbToHex(data[0], data[1], data[2])
        setColorHex(hex);
    }

    const componentToHex = (c) => {
        let hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    const rgbToHex = (r, g, b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    return (
        <div className="picker" ref={pickerEl}>
            {isHover ?
                <>
                    <canvas id="zoom" ref={zoomEl} onClick={handleClick}/>
                    {colorHex ?
                        <div className="color-hex">
                            {colorHex}
                        </div>
                        :
                        ''
                    }
                </>

                :
                ""
            }
        </div>


    )
}

export default Dropper;