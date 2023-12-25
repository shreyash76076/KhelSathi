import axios from "axios";

const API_KEY = "AIzaSyBgxBad-3jiDfDKV32xNMFvs-syYRxlofI";
const BASE_URL = "http://103.180.31.8/api/rest/";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    const token = response.data.idToken;

    return token;
  } catch (error) {
    console.error("Error in authenticate:", error);
    throw error;
  }
}

async function getList(model, limit, page) {
  const url = `${BASE_URL}getList`;

  try {
    const response = await axios.post(url, {
      lang: "en",
      limit: limit,
      model: model,
      page: page,
    });

    const data = response.data._result;

    return data;
  } catch (error) {
    console.error(`Error in getList (${model}):`, error);
    throw error;
  }
}

async function getNewList(model, limit, page) {
  const url = `${BASE_URL}getList`;

  try {
    const response = await axios.post(url, {
      lang: "en",
      limit: limit,
      model: model,
      page: page,
    });

    const { _result, total_count } = response.data;
    // Return an object containing both the _result and total_count
    console.log("Total Count----", total_count);
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error(`Error in getList (${model}):`, error);
    throw error;
  }
}

async function getSportsCalendarData(endPoint, model, limit, page,searchQuery) {
  const url = `${BASE_URL}${endPoint}`;

  try {
    const response = await axios.post(url, {
      filters: {
        name: searchQuery,
      },
      lang: "en",
      limit: limit,
      model: model,
      page: page,
    });

    const { _result, total_count } = response.data;
    // Return an object containing both the _result and total_count
    console.log("Total Count----", total_count);
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error(`Error in getList (${model}):`, error);
    throw error;
  }
}

async function getGallery(model, limit, page) {
  const url = `${BASE_URL}getList`;

  try {
    const response = await axios.post(url, {
      lang: "en",
      limit: limit,
      model: model,
      page: page,
    });

    const { _result, total_count } = response.data;

    console.log("Gallery Item----", _result);
    console.log("Total Count----", total_count);

    // Return an object containing both the _result and total_count
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error(`Error in getList (${model}):`, error);
    throw error;
  }
}

async function getGalleryDetials(model, catId, limit, page) {
  console.log("Data Coming" + limit + " " + page);
  const url = `${BASE_URL}getList`;

  const requestBody = {};

  try {
    const response = await axios.post(url, {
      filters: {
        category_id: catId,
      },
      lang: "en",
      limit: limit,
      model: model,
      page: page,
    });

    const { _result, total_count } = response.data;

    console.log("Gallery Item----", _result);
    console.log("Total Count----", total_count);

    // Return an object containing both the _result and total_count
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
    throw error; // Re-throw the error to be caught by the calling code
  }
}

async function getPlayerList(limit, page) {
  const url = `${BASE_URL}getPlayerLists`;

  try {
    const response = await axios.post(url, {
      filters: {
        name: "",
      },
      lang: "en",
      limit: limit,
      page: page,
    });

    const { _result, total_count } = response.data;

    console.log("Player Item----", _result);
    console.log("PlayerTotal Count----", total_count);

    // Return an object containing both the _result and total_count
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
    throw error; // Re-throw the error to be caught by the calling code
  }
}

async function getCollegeList() {
  const url = `${BASE_URL}getFacilityColleges`;

  const requestData = {
    lang: "en",
    sport_id: [], // an array of sport IDs
    district_id: [], // an array of district IDs
    authurity: [], // an array of authority values
    gender: [], // an array of gender values
  };

  try {
    const response = await axios.post(url, requestData);

    const { _result, total_count } = response.data;

    console.log("College Item----", _result);
    console.log("College Count----", total_count);

    // Return an object containing both the _result and total_count
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
    throw error; // Re-throw the error to be caught by the calling code
  }
}

async function getGroundsList() {
  const url = `${BASE_URL}getFacilityGround`;

  const requestData = {
    filters: {
      title: "",
    },
    lang: "en",
    sport_id: [], // an array of sport IDs
    district_id: [], // an array of district IDs
  };

  try {
    const response = await axios.post(url, requestData);

    const { _result, total_count } = response.data;

    console.log("Grounds Item----", _result);
    console.log("Grounds Count----", total_count);

    // Return an object containing both the _result and total_count
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
    throw error; // Re-throw the error to be caught by the calling code
  }
}

async function getHostelList() {
  const url = `${BASE_URL}getFacilityHostels`;

  const requestData = {
    lang: "en",
  };

  try {
    const response = await axios.post(url, requestData);

    const { _result, total_count } = response.data;

    console.log("Hostel Item----", _result);
    console.log("Hostel Count----", total_count);

    // Return an object containing both the _result and total_count
    return { result: _result, totalCount: total_count };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
    throw error; // Re-throw the error to be caught by the calling code
  }
}

export async function getCollege() {
  return await getCollegeList();
}

export async function getCoaches(limit, page) {
  return await getNewList("Coaches", limit, page);
}

export async function getPlayers(limit, page) {
  return await getPlayerList(limit, page);
}

export async function getSchemes(endPoint, limit, page) {
  return await getNewList(endPoint, limit, page);
}

export async function getSportsCalendar(endPoint, limit, page, searchQuery) {
  return await getSportsCalendarData(
    endPoint,
    "Camps",
    limit,
    page,
    searchQuery
  );
}

export async function getHostel() {
  return await getHostelList();
}

export async function getGrounds() {
  return await getGroundsList();
}
export async function getSports(limit, page) {
  return await getList("Sports", limit, page);
}

export async function getNotices(limit, page) {
  return await getNewList("Notices", limit, page);
}

export async function getGalleryCategory(limit, page) {
  return await getGallery("Gallerycategories", limit, page);
}

export async function getGalleryDetailsItem(catId, limit, page) {
  return await getGalleryDetials("Galleries", catId, limit, page);
}

export async function getBanners() {
  const url = `${BASE_URL}getHomePage`;

  try {
    const response = await axios.post(url);
    const bannerData = response.data._result;

    return bannerData;
  } catch (error) {
    console.error("Error in getBanners:", error);
    throw error;
  }
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
