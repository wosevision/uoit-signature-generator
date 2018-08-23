import { FormControlOption, SocialNetwork, SocialNetworkOption } from '.';

export interface SocialNetworkData {
  type: SocialNetwork;
  account: SocialNetworkOption;
  username: any;
}

export interface EventData {
  icon: FormControlOption;
  size: string;
  name: string;
  date: string;
  desc: string;
  cta: string;
  url: string;
}

export interface FormData {
  name: {
    first: string;
    last: string;
  };
  contact: {
    phone: string;
    ext: string;
    mobile: string;
    fax: string;
    faxext: string;
    email: string;
    website: string;
  };
  credentials: {
    title: string;
    dept: string;
  };
  // hours: {
  // 	title: '',
  // 	dept: '',
  // };
  hours: string;
  social: {
    style: FormControlOption;
    networks: SocialNetworkData[];
  };
  logo: FormControlOption;
  event: {
    use: boolean;
    data: EventData;
  };
  message: {
    style: string;
    content: string;
    acknowledgement: boolean;
  };
}
