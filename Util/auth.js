import axios from "axios";

const API_KEY = "AIzaSyBgxBad-3jiDfDKV32xNMFvs-syYRxlofI";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export async function getSports( limit, page ) {
  // Function implementation

  const url = `http://103.180.31.8/api/rest/getList`;

  try {
    const response = await axios.post(url, {
      lang: "en",
      limit: limit,
      model: "Sports",
      page: page,
    });

    const sportsData = response.data._result;

    return sportsData;
  } catch (error) {
    console.error("Error in getSports:", error);
    throw error; // rethrow the error so that the calling code can handle it
  }
}

export async function getBanners() {
  const url = `http://103.180.31.8/api/rest/getHomePage`;

  try {
    const response = await axios.post(url);

    const bannerData = response.data._result;
    console.log(bannerData);

    return bannerData;
  } catch (error) {
    console.error("Error in getSports:", error);
    throw error; // rethrow the error so that the calling code can handle it
  }
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
