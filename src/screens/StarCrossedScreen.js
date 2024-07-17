import star from '../assets/star.png';
import crossword from '../assets/crossword.png';

const StarCrossedScreen = () => {

	return (
		<div className="home">
			<div className="text">
				<h4>Coming soon: Mini Crossword + Stats</h4>
				<p>In the mean time, enjoy expertly-crafted themed crosswords by Writers Against the War on Gaza via The New York War Crimes.</p>
			</div>
			<div className="archive-container">
				<div className="archive">
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-july-3-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Allow Me to Demonstrate"</h5>
						<p>July 3</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-june-27-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"All Talk"</h5>
						<p>June 27</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-june-20-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"The Radical Left"</h5>
						<p>June 20</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-june-13-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Untitled"</h5>
						<p>June 13</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-june-6-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Untitled"</h5>
						<p>June 6</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-may-30-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Untitled"</h5>
						<p>May 30</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-may-23-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Untitled"</h5>
						<p>May 23</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-may-15-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Untitled"</h5>
						<p>May 15</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-may-9-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Untitled"</h5>
						<p>May 9</p>
					</a>
					<a href="https://newyorkwarcrimes.com/crossword-puzzle-may-1-2024" className="puzzle">
						<img src={crossword}/>
						<h5>"Untitled"</h5>
						<p>May 1</p>
					</a>
				</div>
			</div>
		</div>
	);
}
 
export default StarCrossedScreen;