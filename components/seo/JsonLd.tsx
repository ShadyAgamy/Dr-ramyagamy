/**
 * Writes structured data (JSON-LD) into the page for Google.
 * "<" is escaped so text inside the data can never close the <script> tag.
 */
export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);
