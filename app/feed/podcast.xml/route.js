import { getEpisodeList } from "@/lib/episodes";
import { SITE } from "@/lib/siteConfig";
import { escapeHtml } from "@/lib/escapeHtml";

/**
 * Generates a valid podcast RSS feed at /feed/podcast.xml.
 * Conforms to Apple Podcasts and Spotify requirements.
 */
export async function GET() {
  const episodes = getEpisodeList();

  const items = episodes
    .map(
      (ep) => `
    <item>
      <title>${escapeHtml(ep.title)}</title>
      <description>${escapeHtml(ep.description)}</description>
      <enclosure url="${ep.audioUrl}" length="${ep.fileSize}" type="audio/mpeg" />
      <guid isPermaLink="false">${SITE.url}/journal/${ep.slug}</guid>
      <link>${SITE.url}/journal/${ep.slug}</link>
      <pubDate>${new Date(ep.publishedDate).toUTCString()}</pubDate>
      <itunes:title>${escapeHtml(ep.title)}</itunes:title>
      <itunes:summary>${escapeHtml(ep.description)}</itunes:summary>
      <itunes:duration>${ep.durationSeconds}</itunes:duration>
      <itunes:episode>${ep.episodeNumber}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:podcast="https://podcastindex.org/namespace/1.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nina</title>
    <link>${SITE.url}/listen</link>
    <description>Select journal essays read aloud by the author. A slower way to take in words about attention, the body, and what it means to stay present.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE.url}/feed/podcast.xml" rel="self" type="application/rss+xml" />

    <itunes:author>Nina</itunes:author>
    <itunes:summary>Select journal essays read aloud by the author. Attention, the nervous system, and what it takes to stay present.</itunes:summary>
    <itunes:owner>
      <itunes:name>Nina</itunes:name>
      <itunes:email>${SITE.author.email || "hello@ninahealthy.com"}</itunes:email>
    </itunes:owner>
    <itunes:image href="${SITE.url}/images/podcast-cover.png" />
    <itunes:category text="Health &amp; Fitness">
      <itunes:category text="Mental Health" />
    </itunes:category>
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>

    <podcast:locked>no</podcast:locked>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
