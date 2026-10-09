import { getBaseUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = getBaseUrl();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${siteConfig.name}</ShortName>
  <Description>${siteConfig.description}</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="${baseUrl}/search?q={searchTerms}"/>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
