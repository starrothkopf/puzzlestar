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
            var context = event.target.getContext('2d');
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
      }).on('hold', function (event) {
        event.currentTarget.classList.toggle('rotate')
        event.currentTarget.classList.remove('large')
      });

    function resizeCanvases() {
      canvas.width = window.innerWidth * 0.967;
      canvas.height = window.innerHeight * 0.75;
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
    </div>
  );
};

export default PixelCanvas;