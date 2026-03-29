import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'zfh2ewg4',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return { width: () => ({ height: () => ({ url: () => '' }), url: () => '' }), height: () => ({ url: () => '' }), url: () => '' };
  return builder.image(source);
}

// Helper to fetch data
export async function getSanityData(query, params = {}) {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
