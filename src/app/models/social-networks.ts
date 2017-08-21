import { FormControlOption } from '.';

export class SocialNetwork implements FormControlOption {
  name: string;
  value: string;
  src: string;
  /**
   * The base URL for the social network's profile endpoints.
   * The URL given here will have the social network user's
   * username appended to it to form social links.
   *
   * @example
   * 'https://facebook.com'
   * // produces
   * 'https://facebook.com/my.username.here'
   *
   * @type {string}
   * @memberof SocialNetwork
   */
  href: string;
  /**
   * The social network's "Call-to-action", i.e. the flavour
   * text that describes a 'subscription' to someone's profile.
   *
   * @example
   * 'Like' // or...
   * 'Follow' // etc.
   *
   * @type {string}
   * @memberof SocialNetwork
   */
  cta: string;
  constructor(params: SocialNetwork) {
    Object.assign(this, params);
  }
}

export const SocialNetworks: SocialNetwork[] = [{
  name: 'Facebook',
  href: 'https://facebook.com/',
  cta: 'Like',
  value: 'fb',
  src: '../../assets/social_icons/socialicon_facebook.gif'
}, {
  name: 'Twitter',
  href: 'https://twitter.com/',
  cta: 'Follow',
  value: 'tw',
  src: '../../assets/social_icons/socialicon_twitter.gif'
}, {
  name: 'YouTube',
  href: 'https://youtube.com/user/',
  cta: 'Subscribe to',
  value: 'yt',
  src: '../../assets/social_icons/socialicon_youtube.gif'
}, {
  name: 'LinkedIn',
  href: 'https://linkedin.com/in/',
  cta: 'Connect with',
  value: 'li',
  src: '../../assets/social_icons/socialicon_linkedin.gif'
}, {
  name: 'Instagram',
  href: 'https://instagram.com/',
  cta: 'Follow',
  value: 'in',
  src: '../../assets/social_icons/socialicon_instagram.gif'
}];

export const ButtonStyles: FormControlOption[] = [{
  value: 'button',
  name: 'Button only'
}, {
  value: 'both',
  name: 'Button and link'
}, {
  value: 'link',
  name: 'Link only'
}];
