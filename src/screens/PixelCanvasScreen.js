import PixelCanvas from "../components/PixelCanvas";

const PixelCanvasScreen = () => {
	return (
		<div className="canvas">
			<div className="animation-container">
			<PixelCanvas />
			</div>
			<div className="intro">
				<div className="stat-line">
					<p>Bored? Board ↑</p>
					<p>Double-click to clear the canvas</p>
				</div>
			</div>
		</div>
	);
}
 
export default PixelCanvasScreen;