const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();
const JIRA_SCOPES = [
  "read:jira-work",
  "manage:jira-project",
  "manage:jira-configuration",
  "read:jira-user",
  "write:jira-work",
  "manage:jira-webhook",
  "manage:jira-data-provider",
  "offline_access", // for refresh_token
];
const JIRA_REDIRECT_URL = `${process.env.API_SERVER_URL}/api/v1/test/jira/callback`;
router.get("/jira", async function (req, res, next) {
  try {
    const authorizeUrl =
      `https://auth.atlassian.com/authorize?` +
      `audience=api.atlassian.com` +
      `&client_id=${process.env.INTEGRATIONS_JIRA_CLIENT_ID}` +
      `&scope=${JIRA_SCOPES.join("%20")}` +
      `&redirect_uri=${JIRA_REDIRECT_URL.replaceAll("/", "%2F").replace(
        ":",
        "%3A"
      )}` +
      `&response_type=code` +
      `&prompt=consent`;
    req.session.authorization = "TEST_VALUE";

    res.redirect(authorizeUrl);
  } catch (error) {
    next(error);
  }
});

router.get("/jira/callback", async function (req, res, next) {
  try {
    const { code } = req.query;
    req.session.destroy();
    const { data } = await axios.post(
      `https://auth.atlassian.com/oauth/token`,
      {
        grant_type: "authorization_code",
        client_id: process.env.INTEGRATIONS_JIRA_CLIENT_ID,
        client_secret: process.env.INTEGRATIONS_JIRA_CLIENT_SECRET,
        code,
        redirect_uri: JIRA_REDIRECT_URL,
      }
    );

    const accessibleResources = await axios.get(
      `https://api.atlassian.com/oauth/token/accessible-resources`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );
    console.log(accessibleResources);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

const employeeData = [
  {
    id: 1,
    name: "John",
    designation: "Manager",
    nationality: "Indian",
    city: "Delhi",
  },
  {
    id: 2,
    name: "Ryan",
    designation: "Sales",
    nationality: "Indian",
    city: "Pune",
  },
  {
    id: 3,
    name: "Sam",
    designation: "Developer",
    nationality: "Indian",
    city: "Pune",
  },
  {
    id: 3,
    name: "Sam",
    designation: "Developer",
    nationality: "American",
    city: "NY",
  },
  {
    id: 3,
    name: "Sam",
    designation: "Developer",
    nationality: "American",
    city: "CA",
  },
];
const productData = [
  {
    id: 1,
    name: "Lenovo Laptop",
    price: 99,
    discount: "20%",
  },
  {
    id: 2,
    name: "Dell Laptop",
    price: 79,
    discount: "10%",
  },
  {
    id: 3,
    name: "HP Laptop",
    price: 89,
    discount: "15%",
  },
];

router.post("/data/:type", (req, res) => {
  const { type } = req.params;
  const { select } = req.query;
  const { city, nationality } = req.body;
  let data = type === "employee" ? employeeData : productData;
  data = data
    .filter((e) => e.city === city && e.nationality === nationality)
    .map((e) => {
      const response = {};
      select.split(",").forEach((s) => {
        response[s] = e[s];
      });
      return response;
    });
  res.json(data);
});

module.exports = router;
