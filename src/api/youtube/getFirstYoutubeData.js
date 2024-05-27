import axios from "axios";
const apikey = "AIzaSyDppR0KAJKAjCAnRQEGn7pE_4fAD6lC4v0";
const pageTokenLimit = 10;
let globalData = [];
let pageTokenLoop = 0;
let currentPageToken = null;

async function getRecommendedVideos(props) {
	const { chart, part, maxResults, pageToken } = props;
	const pageTokenParams = pageToken ? `&pageToken=${pageToken}` : "";

	if (pageToken !== null) {
		pageTokenLoop++;
	}

	try {
		const response = await axios.get(
			`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&chart=${chart}&part=${part}&type=video&regionCode=ID&maxResults=${maxResults}${pageTokenParams}`,
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
				videoId: item.id,
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
		console.error("Error fetching recommended videos:", error);
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

async function firstData(props) {
	if (pageTokenLoop < pageTokenLimit) {
		const data = await getRecommendedVideos(props);

		if (currentPageToken != data.nextPageToken) {
			currentPageToken = data.nextPageToken;
			globalData = globalData.concat(...data.items);
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

export { firstData };
