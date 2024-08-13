import axios from "axios";
const apikey = "AIzaSyDppR0KAJKAjCAnRQEGn7pE_4fAD6lC4v0";
const pageTokenLimit = 100;
let globalData = [];
let pageTokenLoop = 0;
let currentPageToken = null;

async function getVideosWithSearch(props) {
	const { keyword, part, maxResults, pageToken } = props;
	const pageTokenParams = pageToken ? `&pageToken=${pageToken}` : "";

	if (pageToken !== null) {
		pageTokenLoop++;
		console.log("Page Token Loop: ", pageTokenLoop);
	}

	//start axios
	try {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=${maxResults}&type=video&part=${part}&key=${apikey + pageTokenParams}`,
		);

		const { items, nextPageToken } = response.data;

		const channelIds = items.map((item) => item.snippet.channelId);
		const channelData = await getChannelData(channelIds);

		const getCustomData = items.map((item, index) => ({
			channelData: channelData.find(
				(channel) => channel.id === item.snippet.channelId,
			),
		}));

		return {
			items: items.map((item, index) => ({
				// ...item,
				// ...getCustomData[index],
				// index: index,
				videoId: item.id.videoId,
				videoTitle: item.snippet.title,
				videoThumbnail: item.snippet.thumbnails.high.url,
				videoDescription: item.snippet.description,
				channelProfile:
					getCustomData[index].channelData.snippet.thumbnails.default
						.url,
				channelName: getCustomData[index].channelData.snippet.title,
				videoStatistics: item.statistics,
				channelStatistics: getCustomData[index].channelData.statistics,
				channelCountry:
					getCustomData[index].channelData.snippet.country,
				publishedAt: item.snippet.publishedAt,
			})),
			nextPageToken,
		};
	} catch (error) {
		console.error("Error fetching search videos:", error);
		throw error;
	}
}

async function getChannelData(channelIds) {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds.join(",")}&key=${apikey}`,
		);
		return response.data.items;
	} catch (error) {
		console.error("Error fetching channel data:", error);
		throw error;
	}
}

async function getWithSearch(props) {
	const { keyword, maxResults, pageToken } = props;

	if (pageTokenLoop < pageTokenLimit) {
		const data = await getVideosWithSearch(props);
		console.log(currentPageToken, data.nextPageToken);

		if (currentPageToken != data.nextPageToken) {
			currentPageToken = data.nextPageToken;
			globalData.push(...data.items);
		} else {
			globalData = [...data.items];
		}
		return {
			items: globalData,
			nextPageToken: data.nextPageToken,
		};
	} else {
		return {
			items: globalData,
			nextPageToken: null,
		};
	}
}

export default getWithSearch;
