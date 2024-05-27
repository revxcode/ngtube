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

import { firstData } from "./api/youtube/getFirstYoutubeData.js";

app.get("/api/youtube/mostpopular", async (req, res) => {
	const {
		chart = "mostPopular",
		part = "id,snippet,statistics",
		maxResults = 21,
		pageToken = null,
	} = req.query;

	try {
		const data = await firstData({
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

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
