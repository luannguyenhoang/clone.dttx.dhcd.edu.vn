export const replaceSeoRM = (input?: string) => {
  if (!input) return "";

  return input
    .replace(
      `link rel="canonical" href="https://admindttx.dhcongdoan.vn`,
      `link rel="canonical" href="https://dttx.dhcd.edu.vn`
    )
    .replace(
      `meta property="og:url" content="https://admindttx.dhcongdoan.vn`,
      `meta property="og:url" content="https://dttx.dhcd.edu.vn`
    )
    .replace(
      `"@id":"https://admindttx.dhcongdoan.vn/#organization"`,
      `"@id":"https://dttx.dhcd.edu.vn/#organization"`
    )
    .replace(
      `https://admindttx.dhcongdoan.vn/#logo`,
      `https://dttx.dhcd.edu.vn/#logo`
    )
    .replace(
      `https://admindttx.dhcongdoan.vn/#website`,
      `https://dttx.dhcd.edu.vn/#website`
    )
    .replace(
      `https://admindttx.dhcongdoan.vn/#webpage`,
      `https://dttx.dhcd.edu.vn/#webpage`
    )
    .replace(
      `"url":"https://admindttx.dhcongdoan.vn"`,
      `"url":"https://dttx.dhcd.edu.vn"`
    )
    .replace(
      `"@type":"WebPage","@id":"https://admindttx.dhcongdoan.vn`,
      `"@type":"WebPage","@id":"https://dttx.dhcd.edu.vn`
    )
    .replace(
      `#webpage","url":"https://admindttx.dhcongdoan.vn`,
      `#webpage","url":"https://dttx.dhcd.edu.vn`
    )
    .replace(
      `"mainEntityOfPage":{"@id":"https://admindttx.dhcongdoan.vn`,
      `"mainEntityOfPage":{"@id":"https://dttx.dhcd.edu.vn/`
    )
    .replace(
      `"worksFor":{"@id":"https://admindttx.dhcongdoan.vn/#organization`,
      `"worksFor":{"@id":"https://dttx.dhcd.edu.vn/#organization`
    )
    .replace(
      `"sameAs":["https://admindttx.dhcongdoan.vn"]`,
      `"sameAs":["https://dttx.dhcd.edu.vn"]`
    );
};
