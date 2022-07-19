import { authenticatedFetch } from "@shopify/app-bridge-utils";

const post = async (app, data) => {
  const fetchAPI = authenticatedFetch(app);
  const res = await fetchAPI("/api/pages", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const newPage = await res.json();
  return newPage;
};

const getPages = async (app) => {
  const fetchAPI = authenticatedFetch(app);
  const res = await fetchAPI("/api/pages/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const allPages = await res.json();
  return allPages;
};

const getPage = async (app, id) => {
  const fetchAPI = authenticatedFetch(app);
  const res = await fetchAPI(`/api/pages/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const page = await res.json();
  return page;
};

const deleteMany = async (app, arr) => {
  const fetchAPI = authenticatedFetch(app);
  const res = await fetchAPI("/api/pages", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(arr),
  });
  const isSuccess = await res.json();

  return isSuccess;
};

const deleteOne = async (app, id) => {
  const fetchAPI = authenticatedFetch(app);
  const res = await fetchAPI(`/api/pages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const isSuccess = await res.json();
  return isSuccess;
};

const update = async (app, data, id) => {
  const fetchAPI = authenticatedFetch(app);
  const res = await fetchAPI(`/api/pages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const isSuccess = res.json();
  return isSuccess;
};

const callAPI = { post, getPages, deleteMany, update, deleteOne, getPage };

export default callAPI;
