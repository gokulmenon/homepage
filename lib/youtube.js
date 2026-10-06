const YOUTUBE_HOST = "https://youtube.googleapis.com";
import { mockYoutubeItems } from '../mock/fixtures';

// export async function getChannelInfo(channelId) {
//   try {
//     const response = await fetch(
//       `${YOUTUBE_HOST}/youtube/v3/channels?part=snippet,contentDetails&id=${channelId}&key=${process.env.YOUTUBE_API}`
//     );

//     const data = await response.json();

//     return data;
//   } catch (err) {
//     console.log(err);
//   }

//   return null;
// }

export async function getAllPlaylistItems() {
  // Local-build mock: fixture playlist instead of the YouTube API.
  // Activated by MOCK_EXTERNAL_APIS=1 (`npm run build:local`); never in prod.
  if (process.env.MOCK_EXTERNAL_APIS === '1') return mockYoutubeItems
  try {
    // const chanenlId =  "UCg8CoV0GtKK8U34ABH-0bTg"; // channel id
    // const playlistId = 'UUg8CoV0GtKK8U34ABH-0bTg'; // uploads playlist
    const playlistId = 'PLCclPnN9j2wWQQhSrCQMrw9Q7YKtxJy7d' // gallery playlist id
    const playlistItemsUrl = `${YOUTUBE_HOST}/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API}`;
    let playlistItems = [];

    let response = await fetch(playlistItemsUrl);
    let data = await response.json();

    // The API answers { error: ... } with no `items` when the key is
    // missing, invalid, or over quota. Never let `undefined` reach
    // getStaticProps — Next.js cannot serialize it and the build fails.
    playlistItems = data.items || [];
    while (data.nextPageToken) {
      response = await fetch(
        `${playlistItemsUrl}&pageToken=${data.nextPageToken}`
      );

      data = await response.json();

      playlistItems = playlistItems.concat(data.items);
    }

    return playlistItems;
  } catch (err) {
    console.log(err);
  }

  return null;
}