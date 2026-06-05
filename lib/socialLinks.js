import { SITE } from "./siteConfig";

/**
 * Centralized social link definitions.
 * Used by Footer, Connect page, and JSON-LD sameAs arrays.
 */
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: SITE.social.instagram,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`,
    external: true,
  },
  {
    name: "Pinterest",
    href: SITE.social.pinterest,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12C2 16.236 4.636 19.855 8.356 21.312C8.268 20.521 8.189 19.299 8.389 18.422C8.569 17.636 9.533 13.526 9.533 13.526C9.533 13.526 9.237 12.923 9.237 12.035C9.237 10.632 10.038 9.583 11.034 9.583C11.882 9.583 12.293 10.218 12.293 10.977C12.293 11.828 11.746 13.104 11.464 14.287C11.226 15.271 11.96 16.073 12.932 16.073C14.694 16.073 16.053 14.216 16.053 11.499C16.053 9.078 14.318 7.363 11.957 7.363C9.216 7.363 7.609 9.407 7.609 11.518C7.609 12.37 7.928 13.285 8.328 13.78C8.407 13.877 8.418 13.962 8.394 14.058L8.146 15.048C8.107 15.211 8.017 15.246 7.847 15.166C6.598 14.594 5.82 12.738 5.82 11.477C5.82 8.279 8.143 5.347 12.211 5.347C15.479 5.347 18.044 7.696 18.044 11.452C18.044 14.698 16.01 17.317 13.194 17.317C12.189 17.317 11.243 16.793 10.928 16.178L10.417 18.14C10.218 18.914 9.668 19.896 9.302 20.484C10.159 20.752 11.063 20.898 12 20.898C17.523 20.898 22 16.421 22 10.898C22 6.477 17.523 2 12 2Z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`,
    external: true,
  },
  {
    name: "Email",
    href: `mailto:${SITE.author.email}`,
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    external: false,
  },
];

/**
 * Returns an array of social URLs for JSON-LD sameAs.
 */
export function getSameAsUrls() {
  return SOCIAL_LINKS.filter((link) => link.external).map((link) => link.href);
}
