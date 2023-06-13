import './Visualizer.css';
import * as html2canvas from 'html2canvas';
import { useRef, useState, useEffect } from 'react';
import Canvas from './Canvas';

function Visualizer() {

    const exampleCode = '{/* Header area, only used for styling */}\n<div id="header-area">\n\t<div id="close"></div>\n\t<div id="minimize"></div>\n\t<div id="maximize"></div>\n</div>'
    const [code, setCode] = useState("");
    const exportRef = useRef();

    const exportAsImage = async (element, imageFileName) => {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);
        downloadImage(image, imageFileName);
    };

    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        
        fakeLink.href = blob;
        
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        
        fakeLink.remove();
    };

    const printCode = () => {
        let i = 0;
        let lines = exampleCode.split(/\n/);
        setCode("");
        console.log(lines);
        let interval = setInterval(function() {
            console.log(i);
            let newCode = code + lines[i];
            setCode(newCode);
            if (++i > lines.length - 1) clearInterval(interval)
        }, 500);
    }

    return (
        <div id='home'>
            <Canvas/>

            <div id='container'>

                <div id="code-box" ref={exportRef}>

                    {/* Header area, only used for styling */}
                    <div id="header-area">
                        <div id="close"></div>
                        <div id="minimize"></div>
                        <div id="maximize"></div>
                    </div>

                    {/* Code area, line numbers, code lines */}
                    <div id="code-container">
                        <div id="line-numbers">
                            <p id="code-p">1</p>
                            <p id="code-p">2</p>
                            <p id="code-p">3</p>
                            <p id="code-p">4</p>
                            <p id="code-p">5</p>
                            <p id="code-p">6</p>
                            <p id="code-p">7</p>
                            <p id="code-p">8</p>
                            <p id="code-p">9</p>
                            <p id="code-p">10</p>
                            <p id="code-p">11</p>
                            <p id="code-p">12</p>
                            <p id="code-p">13</p>
                            <p id="code-p">14</p>
                        </div>
                        <div id="text-area">
                            <p id="code-p">{code}</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => exportAsImage(exportRef.current, "test")}>Save Image</button>
                <button onClick={() => printCode()}>Generate</button>
            </div>

        </div>
    );
}

export default Visualizer;