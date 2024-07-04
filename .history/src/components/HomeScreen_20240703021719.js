import useFetch from './useFetch';

const Home = () => {

	return (
		<div className="home">
			{error && <div>error</div>}
			{isPending && <div>Loading...</div>}
			{blogs && <BlogList blogs={blogs} />} 
		</div>
	);
}
 
export default Home;