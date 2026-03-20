import React from "react";
import { Contac } from "@/app/components/organisms/Contac";
import { getClient } from "@/lib/apolloClient";
import { GET_LIEN_HE } from "@/app/api/graphQL/getLienHe";

export default async function LienHe() {
  let contactData = null;
  try {
    const { data } = await getClient().query({
      query: GET_LIEN_HE,
      fetchPolicy: "no-cache"
    });
    contactData = data;
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }

  return <Contac contactData={contactData} />;
}
