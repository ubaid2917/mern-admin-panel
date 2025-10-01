const axios = require("axios");

// get zoom access token
async function getZoomAccessToken() {
  try {
    const tokenResponse = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
      {},
      {
        auth: {
          username: process.env.ZOOM_CLIENT_ID,
          password: process.env.ZOOM_CLIENT_SECRET,
        },
      }
    );
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error("Error getting Zoom access token:", error);
    throw error;
  }
}

// create zoom  meetin
async function createZoomMeeting(userEmail) {
  const accessToken = await getZoomAccessToken();

  try {
    const meetingResponse = await axios.post(
      `https://api.zoom.us/v2/users/${userEmail}/meetings`,
      {
        topic: "Zoom Meeting",
        type: 1, // 1 for instant meeting,
        settings: {
            host_video: true,
            participant_video: true,
        }
      },
      {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
    );
    return meetingResponse.data;
  } catch (error) {
    console.log("Error creating Zoom meeting:", error);
  }
}
module.exports = {

  createZoomMeeting,
};