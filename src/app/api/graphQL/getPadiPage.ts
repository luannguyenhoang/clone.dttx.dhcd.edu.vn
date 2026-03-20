import { gql } from "@apollo/client";

export const GET_LADI_PAGE = gql`
  query GetLadiPage($uri: String!) {
    pageBy(uri: $uri) {
      ladiPage {
        content
      }
      seo {
        fullHead
      }
    }
  }
`;
