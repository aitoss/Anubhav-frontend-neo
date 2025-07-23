import axios from "axios";
import React, { useEffect, useState } from "react";
import BackgroundDots from "../../components/assets/Background";
import Tag from "../../components/InputTag/Tag";
import YoutubeCard from "../../components/Video/YoutubeCard";
import YoutubeCardLoading from "../../components/Video/YoutubeCardLoading";
import {YoutubeItem } from "@/types/types";

const API_KEY = process.env.VITE_YOUTUBE_API_KEY;
const PLAYLIST_ID = process.env.VITE_PLAYLIST_ID;


const YouTubePlaylist = () => {
  const [youtubeData, setYoutubeData] = useState<YoutubeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const response = await axios.get(
          "/api/youtube/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              maxResults: 25,
              playlistId: PLAYLIST_ID,
              key: API_KEY,
              t: new Date().getTime(),
            },
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          },
        );

        if (response.data && response.data.items) {
          setYoutubeData(response.data.items);
        } else {
          setError("No videos found in this playlist.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist items:", error);
        setError("Failed to fetch videos. Please try again later.");
        setLoading(false);
      }
    };

    fetchPlaylistItems();
  }, []);

  const tagsData = [
    "Amazon",
    "Google",
    "Zeta",
    "UBS",
    "Microsoft",
    "Deutsche-Bank",
    "Cred",
  ];

  return (
    <>
      <BackgroundDots
        dotSize={1.8}
        dotColor="#cbcbcc"
        backgroundColor=""
        gap={15}
        className="custom-class"
        fade={true}
        style={undefined}
      />
      <div className="mx-auto flex min-h-screen flex-col">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center overflow-hidden py-6 pt-24 text-center">
          <h2 className="mb-4 text-4xl font-[600] tracking-tight">Videos</h2>
          <div className="flex w-full flex-wrap justify-center gap-4 align-bottom">
            {tagsData.map((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center p-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-1 lg:grid-cols-3">
            {loading ? (
              new Array(7)
                .fill(null)
                .map((_, index) => <YoutubeCardLoading key={index} />)
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : youtubeData.length > 0 ? (
              youtubeData
                .slice()
                .reverse()
                .map((data) => {
                  const { snippet } = data;
                  if (
                    !snippet ||
                    !snippet.thumbnails ||
                    !snippet.thumbnails.medium
                  ) {
                    return null;
                  }
                  const videoId = snippet.resourceId.videoId;
                  const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
                  const { title, description, tags = [] } = snippet;

                  return (
                    <YoutubeCard
                      key={videoId}
                      title={title}
                      img={
                        snippet.thumbnails.maxres?.url ||
                        snippet.thumbnails.medium.url
                      }
                      link={videoLink}
                      description={description}
                      tags={tags}
                    />
                  );
                })
            ) : (
              <div>No videos available in this playlist.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default YouTubePlaylist;
