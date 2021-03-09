import React, {useState, useEffect, useRef} from "react";
import {initialSrc, urlRegex} from "../../constants";
import '../../styles/preview.scss';

function ImageUploader() {

    let [url, setUrl] = useState(initialSrc);
    const urlReg = urlRegex
    const imageEl = useRef(null);
    const canvasRef = useRef(null);
    const inputEl = useRef(null);

    const handelUpload = () => {
        let value = inputEl.current.value;
        if (value && value.match(urlReg)) {
            setUrl(value);
        } else {
            alert('Wrong Image Url');
        }
    }

    useEffect(() => {
        const image = imageEl.current;
        if (image) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            image.onload = function () {
                image.style.display = 'block';
                ctx.canvas.width = image.clientWidth;
                ctx.canvas.height = image.clientHeight;
                ctx.drawImage(image, 0, 0);
                image.style.display = 'none';
            };
        }
    }, [imageEl, canvasRef, url]);


    return (
        <>
            <div className="image-uploader-container">
                <div className="uploader-url">
                    <input className="url" ref={inputEl} placeholder='https://unsplash.com/s/photos/image'/>
                    <button className="btn" onClick={handelUpload}>Upload</button>
                </div>
                <div className="preview">
                    {url ?
                        <>
                            <img src={url} alt="Native Image" ref={imageEl} crossOrigin="anonymous"/>
                            <canvas id="canvas" ref={canvasRef}/>
                        </>
                        :
                        ""}

                </div>
            </div>
        </>

    )
}

export default ImageUploader;