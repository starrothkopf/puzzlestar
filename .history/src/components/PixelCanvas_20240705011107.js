import React, { useEffect, useRef } from 'react';
import interact from 'interactjs';

const PixelCanvas = () => {
  const canvasRef = useRef(null);
  const pixelSize = 8;

  useEffect(() => {
    const canvas = canvasRef.current;

    interact(canvas)
      .origin('self')
      .draggable({
        max: Infinity,
        maxPerElement: Infinity,
        modifiers: [
          interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: pixelSize, y: pixelSize })],
          }),
        ],
        listeners: {
          move: function (event) {
            var context = event.target.getContext('2d'),
              dragAngle = (180 * Math.atan2(event.dx, event.dy)) / Math.PI;

            context.fillStyle = '#333';
            context.fillRect(
              event.pageX - pixelSize / 2,
              event.pageY - pixelSize / 2,
              pixelSize,
              pixelSize
            );
          },
        },
      })
      .on('doubletap', function (event) {
        var context = event.target.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      });

    function resizeCanvases() {
      canvas.width = window.innerWidth * 0.967;
      canvas.height = window.innerHeight * 0.5;
    }

    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);

    return () => {
      window.removeEventListener('resize', resizeCanvases);
    };
  }, []);

  return (
    <div className="container">
      <canvas ref={canvasRef} className="pixel-canvas"></canvas>
      <p>Double click to clear the canvas</p>
    </div>
  );
};

export default PixelCanvas;