import { google } from "googleapis";

export function getBusinessClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  return google.mybusinessbusinessinformation({
    version: "v1",
    auth,
  });
}

export function getReviewsClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  return google.mybusinessreviews({
    version: "v1",
    auth,
  });
}

export function getPostsClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  return google.mybusinessposts({
    version: "v1",
    auth,
  });
}
