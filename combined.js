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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIyZDg0ZTVjLTE0MjQtNDM0My1iYjdiLTk4YjZmOTc5ZWFmMyJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYjNiNmIwM2IxYzFjMDAwODkwZTAyYiIsImZpcnN0TmFtZSI6IlByZW0iLCJsYXN0TmFtZSI6IkRoYW5hbmpheWFuIiwiZW1haWwiOiJwcmVtLnByYW1vZEBtZWx0d2F0ZXIuY29tIiwiYWN0aXZlQ29tcGFueUlkIjoiNjNiM2I2YWU3ODI5ODUwMDExMzM0N2M0IiwiaXNJbnRlcm5hbCI6dHJ1ZSwidGltZXpvbmUiOiJBc2lhL0tvbGthdGEiLCJsYW5ndWFnZSI6ImVuIiwiY3JlYXRlZCI6IjIwMjMtMDEtMDNUMDU6MDE6MzYuODM4WiIsIm1vZGlmaWVkIjoiMjAyMy0xMi0xNlQxNDoyOTo0Ni41NjZaIn0sImNvbXBhbnkiOnsiX2lkIjoiNjNiM2I2YWU3ODI5ODUwMDExMzM0N2M0IiwibmFtZSI6IlByZW0gRGhhbmFuamF5YW4iLCJjb3VudHJ5IjoiaW4iLCJjcmVhdGVkIjoiMjAyMy0wMS0wM1QwNTowMTozNC4zNTdaIiwibW9kaWZpZWQiOiIyMDIzLTEyLTEzVDA5OjM0OjQ5Ljg1OFoifSwiZXhwIjoxNzAzMzQxNzg2NzIxLCJpYXQiOjE3MDI3MzY5NzZ9.IIwWWFqzJc2PclQrZ4Z59N_g3Q7KK1dDttwOfVX1ba07Ucn2qJFUfbIUcce0DdgEk7E-HibOXdHgfX2w_gN74KbdVUaFkhrmLTcjoE1WALTIwvPnn2SZXpiBGyyq3AxYV2AbTg75NL6jaJJDL4u-bTga5KG4XwF_oiADe0YYOl3jtbqLKhfM-sP7Qr-HxAN87XnnTCBe4H5kkZrLa832h7h5t4uEi7wkQhve8ArKVUEE4XLwJljp6lgARBU8UuisveiJgM5hZygfeBNNPy8EQtp0yNoudP3FHmWKDN4r4JhsAlMtcmSNrhutoKEPtXhveeCn8SXB8PSqin1ElGwuauCLIEjp8UZyf1iOXrQiVdo1RXDPVjMxv4sj1a_skkIvNitDaSIvMs63cDHQbUd0rqIVOSC5rHV1bdOSnaNfOP9etb-Ah11vqOMMiMAMyc_BuHhgvrqTLDKLXG6G-sJ7okbNgADywbE3W3O06pBUavuZScHN3J0P8PZfJ8rcKPz4AB8kXXIhwfQWGRJEHxfUuGBpVQ8en-0GBluZptcGWMR_2rqn1ZRxJYHS7FHyMA9i1IiH8f1V3c8tngbhTbBe2_fW4XPeiJtV3SwXkiyOlYmGMhptm1gmBmDiOIQGnPa09VywetuCe-ec0rtahsrrYP7N8WTDPFqFpaQ2ibBWMmE",
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
      reportHeaders.authorization = authTokenAfterSwitching;
      userDataHeaders.authorization = authTokenAfterSwitching;
      userAnalyticsHeaders.authorization = authTokenAfterSwitching;
      searchListHeaders.Authorization = `Bearer ${authTokenAfterSwitching}`;
      searchDataHeaders.Authorization = `Bearer ${authTokenAfterSwitching}`;

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

const reportHeaders = {
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  authorization: "",
  Connection: "keep-alive",
  Origin: "https://app.meltwater.com",
  Referer: "https://app.meltwater.com/settings/report",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "cross-site",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Sec-Ch-Ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Accept-Encoding": "gzip",
};

// Headers and Endpoint to fetch Digest Reports

app.get("/api/reports", async (req, res) => {
  try {
    const reportUrl = `https://dashboard-services.daily-digest.meltwater.io/dashboard_services/v2/reportDefinitions/`;
    const response = await axios.get(reportUrl, {
      headers: reportHeaders,
    });
    const reportData = response.data;
    // console.log(reportData);
    res.status(200).json(reportData);
  } catch (error) {
    console.error(`Error fetching Digest Report info: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch Digest Reports" });
  }
});

// Headers and Endpoint to get User Analytics

const userDataHeaders = {
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  authorization: "",
  Connection: "keep-alive",
  Origin: "https://app.meltwater.com",
  Referer: "https://app.meltwater.com/",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "cross-site",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Sec-Ch-Ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Accept-Encoding": "gzip",
};

app.get("/api/userData", async (req, res) => {
  try {
    const userDataUrl = `https://v2.walkme.meltwater.io/identity`;
    const response = await axios.get(userDataUrl, {
      headers: userDataHeaders,
    });
    const userData = response.data;
    // console.log(reportData);
    res.status(200).json(userData);
  } catch (error) {
    console.error(`Error fetching User Info: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch User Info" });
  }
});

// Headers and Endpoint for User Analytics

const userAnalyticsHeaders = {
  Authority: "app.meltwater.com",
  Accept: "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  authorization: "",
  "Content-Type": "text/plain;charset=UTF-8",

  Origin: "https://app.meltwater.com",
  Referer: "https://app.meltwater.com/m/home",
  "Sec-Ch-Ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Encoding": "gzip",
};

app.get("/api/userAnalytics", async (req, res) => {
  try {
    const userAnalyticsUrl = `https://app.meltwater.com/manifest`;
    const response = await axios.get(userAnalyticsUrl, {
      headers: userAnalyticsHeaders,
    });
    const userAnalytics = response.data;

    res.status(200).json(userAnalytics);
  } catch (error) {
    console.error(`Error fetching User Data: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

//Headers and Endpoint for User Search list

const searchListHeaders = {
  "Accept-Language": "en-US,en;q=0.9",
  Connection: "keep-alive",
  Origin: "https://app.meltwater.com",
  Referer: "https://app.meltwater.com/",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "cross-site",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "*/*",
  "Apollographql-Client-Name": "discovery-next",
  "Apollographql-Client-Version": "07911e5c2e25053115fe3f36ca77045e06d3425e",
  Authorization: "",
  "Content-Type": "application/json",
  "Sec-Ch-Ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Accept-Encoding": "gzip",
};

app.get("/api/searchList", async (req, res) => {
  try {
    const searchListUrl = `https://discovery-next-mw-apollo-production.meltwater.io/graphql`;

    const jsonData = {
      operationName: "Searches",
      query:
        "query Searches {\n  searches {\n    id\n    name\n    __typename\n  }\n}",
      variables: {},
    };

    const response = await axios.post(searchListUrl, jsonData, {
      headers: searchListHeaders,
    });
    const searchList = response.data;

    res.status(200).json(searchList);
  } catch (error) {
    console.error(`Error fetching User Search List: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

//Headers and Endpoint for User Search Data

const searchDataHeaders = {
  "Accept-Language": "en-US,en;q=0.9",
  Connection: "keep-alive",
  Origin: "https://app.meltwater.com",
  Referer: "https://app.meltwater.com/",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "cross-site",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "*/*",
  "Apollographql-Client-Name": "discovery-next",
  "Apollographql-Client-Version": "07911e5c2e25053115fe3f36ca77045e06d3425e",
  Authorization: "",
  "Content-Type": "application/json",
  "Sec-Ch-Ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Accept-Encoding": "gzip",
};

// Endpoint to receive the appended search ID
app.post("/api/sendSearchID/:searchID", async (req, res) => {
  try {
    const { searchID } = req.params;

    // Modify the JSON payload by inserting the search ID into 'variables'
    const modifiedPayload = {
      operationName: "GetSearch",
      query:
        "query GetSearch($id: String!) {\n  search(id: $id) {\n    id\n    name\n    type\n    searchQuery {\n      searchQueryType\n      allKeywords\n      allSearches {\n        id\n        name\n        type\n        __typename\n      }\n      anyKeywords\n      anySearches {\n        id\n        name\n        type\n        __typename\n      }\n      booleanQuery\n      caseSensitive\n      notKeywords\n      notSearches {\n        id\n        name\n        type\n        __typename\n      }\n      filter\n      __typename\n    }\n    __typename\n  }\n}",
      variables: {
        id: searchID,
      },
    };

    // Send the modified payload to the external GraphQL API
    const response = await axios.post(
      "https://discovery-next-mw-apollo-production.meltwater.io/graphql",
      modifiedPayload,
      {
        headers: searchDataHeaders,
      }
    );
// Forward the received JSON response to the /api/searchData endpoint
    const searchDataResponse = await axios.post('http://localhost:3600/api/searchData', response.data);



    // Send the received JSON response back to the frontend
    res.json(response.data);
      console.log(searchDataResponse);
  } catch (error) {
    console.error("Error processing search ID:", error);
    res.status(500).send("Server Error");
  }
});

// Endpoint to process relayed data
app.post('/api/searchData', async (req, res) => {
  try {
    const relayedData = req.body;

    // Process the relayed data if needed
    // For example, log the received data for now
    console.log('Received relayed data:', relayedData);

    // Send the relayed data back to the frontend (if needed)
    res.status(200).json({ message: 'Data processed successfully', data: relayedData });
  } catch (error) {
    console.error('Error processing searchData:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

