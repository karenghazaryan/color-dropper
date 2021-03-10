import React, {useState, useEffect, useRef} from "react";
import {initialSrc, urlRegex} from "../../constants";
import '../../styles/preview.scss';

function ImageUploader() {

    let [url, setUrl] = useState(initialSrc);
    const canvasRef = useRef(null);
    const inputEl = useRef(null);

    const handleUpload = () => {
        let value = inputEl.current.value;
        if (value && value.match(urlRegex)) {
            setUrl(value);
        } else {
            alert('Wrong Image Url');
        }
    }

    useEffect(() => {
        const newImage = new Image();
        newImage.src = url || initialSrc;
        newImage.crossOrigin = 'Anonymous';
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        newImage.onload = function () {
            ctx.canvas.width = this.width;
            ctx.canvas.height = this.height;
            ctx.drawImage(newImage, 0, 0);
        };
    }, [url]);


    return (
        <>
            <div className="image-uploader-container">
                <div className="uploader-url">
                    <input className="url" ref={inputEl} placeholder='https://unsplash.com/s/photos/image'/>
                    <button className="btn" onClick={handleUpload}>Upload</button>
                </div>
                <div className="preview">
                    {url ?
                        <>
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