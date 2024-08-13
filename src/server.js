// server.js
import cors from "cors";
import express from "express";

const app = express();
app.use(
	cors({
		origin: "http://localhost:5173", // Sesuaikan dengan URL client Anda
		credentials: true,
	}),
);

import getFirstYoutubeData from "./api/youtube/getFirstYoutubeData.js";
import getWithSearch from "./api/youtube/getWithSearch.js";

app.get("/api/youtube/mostpopular", async (req, res) => {
	const {
		chart = "mostPopular",
		part = "id,snippet,statistics",
		maxResults = 21,
		pageToken = null,
	} = req.query;

	try {
		const data = await getFirstYoutubeData({
			chart,
			part,
			maxResults,
			pageToken,
		});

		res.json(data);
	} catch (error) {
		console.error("Error fetching recommended videos:", error);
		res.status(500).json({ error: "Error fetching recommended videos" });
	}
});

app.get("/api/youtube/search", async (req, res) => {
	const {
		keyword,
		part = "id,snippet",
		maxResults = 21,
		pageToken = null,
	} = req.query;

	try {
		let data = await getWithSearch({
			keyword,
			part,
			maxResults,
			pageToken,
		});
		console.log(keyword);
		res.json(data);
	} catch (error) {
		console.error("Errors fetching search videos:", error);
		res.status(500).json({ error: "Errorx fetching search videos" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
