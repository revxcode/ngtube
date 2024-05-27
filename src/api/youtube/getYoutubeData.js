import axios from "axios";
const apikey = "AIzaSyDppR0KAJKAjCAnRQEGn7pE_4fAD6lC4v0";

async function getVideosWithSearch(props) {
	const { keyword, maxResults } = props;

	//start axios
	try {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=${maxResults}&type=video&part=id,snippet&key=${apikey}`,
		);

		console.log(response.data);
	} catch (error) {
		console.log("Error : " + error);
		return [];
	}
}
