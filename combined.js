require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const headers = {
  authority: "live.gaf-identity-provider.meltwater.io",
  accept: "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9",
  authorization:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIyZDg0ZTVjLTE0MjQtNDM0My1iYjdiLTk4YjZmOTc5ZWFmMyJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYjNiNmIwM2IxYzFjMDAwODkwZTAyYiIsImZpcnN0TmFtZSI6IlByZW0iLCJsYXN0TmFtZSI6IkRoYW5hbmpheWFuIiwiZW1haWwiOiJwcmVtLnByYW1vZEBtZWx0d2F0ZXIuY29tIiwiYWN0aXZlQ29tcGFueUlkIjoiNjNiM2I2YWU3ODI5ODUwMDExMzM0N2M0IiwiaXNJbnRlcm5hbCI6dHJ1ZSwidGltZXpvbmUiOiJBc2lhL0tvbGthdGEiLCJsYW5ndWFnZSI6ImVuIiwiY3JlYXRlZCI6IjIwMjMtMDEtMDNUMDU6MDE6MzYuODM4WiIsIm1vZGlmaWVkIjoiMjAyMy0xMS0zMFQwNjowNjoyMi40MjJaIn0sImNvbXBhbnkiOnsiX2lkIjoiNTViZWY1ZGUzODc2N2E5NTM3NzQxMTE5IiwibmFtZSI6IlRoZSBDcnUgTWVkaWEgKyBDb21tdW5pY2F0aW9ucyAtIEZhaXJoYWlyIiwiY291bnRyeSI6ImF1IiwiY3JlYXRlZCI6IjIwMTUtMDgtMDNUMDU6MDI6MjIuOTI2WiIsIm1vZGlmaWVkIjoiMjAyMy0xMC0yNlQwNDoxNDoyNS44NDFaIn0sImV4cCI6MTcwMTkyOTE4NDAzNiwiaWF0IjoxNzAxMzI0Mzc0fQ.lMA7-lNHpBaUccHg4w3wdoB3uxxVm8VCy4ol9zy0tysYO7A06Hgi5nk_KKfS4gLqS_07PKs59qRWChsgA3ezC75cpiIwtwjrm2wWfg9bjuhsFORL5ooCe3s07dXpqE5zx_oNlTU-UtIswxtcld_q84EHCuZEFwRtebmquVh5gT5aSSatQ_9Ebb80Ee-LwHOKhSrsWfZsab8I6dS2oeXH03YkmNHfQiAARMaoK6KSapu3qkWIqzFXBPBh0ezhhTJ0CeEP4d5AD1v7KWgU6mbzVunbRqTAGrm3Gy_FUA82cMCD0HuMyXy2Fuca3_5izgBaWDq0tGR_oBOCN-1-sNHm9wo0qnGI-Rebcb0-NzsnKVRzBBVhOQkc-3tMn42UE5cibL8hZXh2TkmoetNObKAMZem9DwL72SFZ3Aub1Ocs9I-z3fVCKhShyOpKMx92u6NufeAsFfO735UiGe0t0eZYqaMG-qy_7Favd4LthOcogkHItyOEmTP71oiD_aXxj6OpaKCJ6fzMqQNDmHQRE8UIPgh_xbHYvyl12A5Yw03I0Q3WHnX5mz5TDhRKqB_Q95kV-UMIwtwceXy3Y4Y64HvnGB9nRgm5RVHbh_FtjsfQPyvHt0TykZptQD6QZoOa0FPRLa9meVVSsVbI8hjpaC4lgi_c6t99wn-j5Ebg-Bxcrek",
  origin: "https://app.meltwater.com",
  referer: "https://app.meltwater.com/",
  "sec-ch-ua":
    '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "macOS",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "cross-site",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
  "x-client-name": "gaf-identity-provider-app",
};

// MI Login and company switch functions
async function performMILoginAndGetAuthToken(companyId) {
  try {
    // Your logic to perform MI Login and get the authorization token
    const loginUrl = `https://app.meltwater.com/idp/tempLogin/${companyId}`;
    const cookie = process.env.COOKIE;
    const headers = {
      cookie,
      authority: "app.meltwater.com",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua":
        '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "macOS",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    };
    // Make the necessary axios request with loginUrl and other required data
    const response = await axios.get(loginUrl, { headers });

    // Extract and return the authorization token from the response headers or body
    const authToken = response.headers.authorization;
    return authToken; // Return the obtained authToken
  } catch (error) {
    console.error("Error during MI Login:", error);
    throw error;
  }
}

async function switchCompanyUsingAuthToken(authToken, companyId) {
  try {
    // Your logic to switch company using the obtained authorization token
    const switchCompanyUrl = `https://live.gaf-identity-provider.meltwater.io/switchCompany/${companyId}`;
    // Make a request to switch company with the authorization token as header
    const response = await axios.get(switchCompanyUrl, { headers });

    const authTokenAfterSwitching = response.data["token"];

    return { authTokenAfterSwitching };
  } catch (error) {
    console.error("Error during company switch:", error);
    throw error;
  }
}

// Endpoint to perform login, switch company, and set the authorization token
app.post("/perform-login-and-switch", async (req, res) => {
  const { companyId } = req.body;

  if (!companyId || companyId.trim() === "") {
    return res.status(400).json({ error: "Company ID is required." });
  }

  try {
    // Perform MI Login to get the authorization token
    const authToken = await performMILoginAndGetAuthToken(companyId);

    // Switch company using the obtained authorization token
    const { authTokenAfterSwitching, cookieFromResponse } =
      await switchCompanyUsingAuthToken(authToken, companyId);

    // Log authTokenAfterSwitching to check its value
    console.log("Auth Token after switching:", authTokenAfterSwitching);

    // Set the obtained authTokenAfterSwitching as the authorization header
    if (authTokenAfterSwitching) {
      
      alertsHeaders.authorization = authTokenAfterSwitching;
      nlHeaders.authorization = authTokenAfterSwitching;

      return res
        .status(200)
        .json({ message: "Authorization token set successfully." });
    } else {
      return res
        .status(500)
        .json({ error: "Error obtaining authorization token." });
    }
  } catch (error) {
    console.error("Error during login and company switch:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

const alertsHeaders = {
  authority: "sas-web-api.notifications.meltwater.com",
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9",
  authorization: "",
  "content-type": "application/json",
  origin: "https://app.meltwater.com",
  referer: "https://app.meltwater.com/",
  "sec-ch-ua":
    '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
  "x-client-name": "Mustangs_SettingsApp",
};

// Endpoint to handle resume/pause actions
app.post("/resume-pause", async (req, res) => {
  const { action } = req.body;

  try {
    if (action === "resume") {
      console.log("Resuming newsletters...");
      await handleNewslettersResume();
    } else if (action === "pause") {
      console.log("Pausing newsletters...");
      await handleNewslettersPause();
    } else {
      return res
        .status(400)
        .json({ error: "Invalid action. Please choose resume or pause." });
    }

    return res
      .status(200)
      .json({ message: `Action ${action} completed successfully.` });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error while performing ${action}: ${error.message}` });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//For bulk-resuming NL//

const nlHeaders = {
  authority: "sas-web-api.notifications.meltwater.com",
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9",
  authorization: "",
  "content-type": "application/json",
  origin: "https://app.meltwater.com",
  referer: "https://app.meltwater.com/",
  "sec-ch-ua":
    '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "macOS",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
  "x-client-name": "Mustangs_SettingsApp",
};

async function handleNewslettersResume() {
  try {
    const baseUrlNewsletters = process.env.BASEURL_NEWSLETTERS;
    const response = await axios.get(baseUrlNewsletters, {
      headers: nlHeaders,
    });
    await resumeNewsletters(response.data);
  } catch (error) {
    throw new Error(`Error fetching newsletters: ${error.message}`);
  }
}

async function resumeNewsletters(data) {
  const newsletters = data || [];

  for (const item of newsletters) {
    const { _id, name, type } = item;
    if (type === "Automated") {
      try {
        const patchUrl = process.env.PATCHURL_NEWSLETTERS.replace(
          "${_id}",
          _id
        );
        await axios.put(
          patchUrl,
          { paused: false },
          {
            headers: {
              ...nlHeaders,
              Authorization: nlHeaders.authorization,
            },
          }
        );
        console.log(`${name}, with ID:${_id} has been resumed successfully.`);
      } catch (error) {
        console.error(
          `Error resuming automated newsletter ${name} with ${_id}:`,
          error.message
        );
      }
    }
  }
}

//For bulk-pausing NL//

async function handleNewslettersPause() {
  try {
    const baseUrlNewsletters = process.env.BASEURL_NEWSLETTERS;

    const response = await axios.get(baseUrlNewsletters, {
      headers: nlHeaders,
    });
    await pauseNewsletters(response.data);
  } catch (error) {
    throw new Error(`Error fetching newsletters: ${error.message}`);
  }
}

async function pauseNewsletters(data) {
  const newsletters = data || [];

  for (const item of newsletters) {
    const { _id, name, type } = item;
    if (type === "Automated") {
      try {
        const patchUrl = process.env.PATCHURL_NEWSLETTERS.replace(
          "${_id}",
          _id
        );

        // console.log("headers used:", nlHeaders);
        await axios.put(
          patchUrl,
          { paused: true },
          {
            headers: {
              ...nlHeaders,
              Authorization: nlHeaders.authorization,
            },
          }
        );
        console.log(`${name}, with ID:${_id} has been paused successfully.`);
      } catch (error) {
        console.error(
          `Error resuming automated newsletter ${name} with ${_id}:`,
          error.message
        );
      }
    }
  }
}

// Endpoint to fetch newsletters
app.get("/api/newsletters", async (req, res) => {
  try {
    const baseUrlNewsletters = process.env.BASEURL_NEWSLETTERS;
    const response = await axios.get(baseUrlNewsletters, {
      headers: nlHeaders,
    });

    const newsletters = response.data || [];
    res.status(200).json(newsletters);
  } catch (error) {
    console.error(`Error fetching newsletters: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch newsletters" });
  }
});








// Endpoint to get newsletter distributions based on ID
app.get("/api/newsletters/:id/distributions", async (req, res) => {
  const { id } = req.params;

  try {
    const distributionUrl = `https://app.meltwater.com/api/newsletters/newsletter/distribution/${id}/distributions`;

    // Make a request to fetch distributions with the provided newsletter ID
    const response = await axios.get(distributionUrl, {
      headers: nlHeaders,
    });

    // Extract and send the distribution data in response
    const distributionData = response.data;
    res.status(200).json(distributionData);
  } catch (error) {
    console.error(`Error fetching newsletter distributions: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch newsletter distributions" });
  }
});





// app.get("/api/distribution-analytics/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const analyticsUrl = `https://app.meltwater.com/api/email-analytics/analytics/get/recipients/${id}`;

//     // Make a request to fetch distribution analytics with the provided ID
//     const response = await axios.get(analyticsUrl, {
//       headers: nlHeaders, // Include necessary headers if required
//     });

//     // Extract and send the distribution analytics data in response
//     const analyticsData = response.data;
//     res.status(200).json(analyticsData);
//   } catch (error) {
//     console.error(`Error fetching distribution analytics: ${error.message}`);
//     res.status(500).json({ error: "Failed to fetch distribution analytics" });
//   }
// });


app.get("/api/distribution-analytics/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const analyticsUrl = `https://app.meltwater.com/api/email-analytics/analytics/get/recipients/${id}`;

    // Make a request to fetch distribution analytics with the provided ID
    const response = await axios.get(analyticsUrl, {
      headers: nlHeaders, 
    });

    // Extract the total value from the response
    const { total } = response.data;

    // Append 'page' and 'size' parameters to the analytics URL
    const updatedUrl = `${analyticsUrl}?page=0&size=${total}&sortField=emailAddress&sortOrder=asc`;

    // Make another request with the updated URL
    const updatedResponse = await axios.get(updatedUrl, {
      headers: nlHeaders,
    });

    // Extract and send the updated distribution analytics data in response
    const updatedAnalyticsData = updatedResponse.data;
    res.status(200).json(updatedAnalyticsData);
  } catch (error) {
    console.error(`Error fetching distribution analytics: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch distribution analytics" });
  }
});