import { useEffect } from "react";

function Canvas() {

    useEffect(() => {
        console.log('hej');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var size = window.innerWidth;
        var step = 20;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();

        for(var x = 0; x < size; x += step) {
            for(var y = 0; y < size; y+= step) {
                
                var leftToRight = Math.random() >= 0.5;

                if(leftToRight) {
                    context.moveTo(x, y);
                    context.lineTo(x + step, y + step);    
                } else {
                    context.moveTo(x + step, y);
                    context.lineTo(x, y + step);
                }

                context.stroke();
            }
        }

    }, [])
    
    return (
        <canvas id="canvas" width={500} height={500}/>
    );
}

export default Canvas;