import { FormControlOptGroup } from '.';

export const BrandLogos: FormControlOptGroup[] = [
  {
    name: 'Primary',
    options: [
      {
        name: 'UOIT',
        value: 'uoit',
        src: '/assets/logos/uoit_logo-basic.gif',
        href: 'https://uoit.ca'
      },
      {
        name: 'UOIT | DC',
        value: 'uoitdc',
        src: '/assets/logos/uoit-dc_logo-joint-horizontal.gif',
        href: 'http://dc-uoit.ca'
      },
      {
        name: 'UOIT Oshawa | Canada',
        value: 'uoitca',
        src: '/assets/logos/uoit_logo-canadian.gif',
        href: 'http://uoit.ca'
      }
    ]
  },
  {
    name: 'Faculty',
    options: [
      {
        name: 'Faculty of Business and Information Technology',
        value: 'fbit',
        src: '/assets/logos/uoit_logo-fbit-horizontal.gif',
        href: 'http://businessandit.uoit.ca'
      },
      {
        name: 'Faculty of Engineering and Applied Science',
        value: 'feas',
        src: '/assets/logos/uoit_logo-feas-horizontal.gif',
        href: 'http://engineering.uoit.ca/'
      },
      {
        name: 'Faculty of Education',
        value: 'fed',
        src: '/assets/logos/uoit_logo-fed-horizontal.gif',
        href: 'https://education.uoit.ca/'
      },
      {
        name: 'Faculty of Energy Systems and Nuclear Science',
        value: 'fesns',
        src: '/assets/logos/uoit_logo-fesns-horizontal.gif',
        href: 'https://nuclear.uoit.ca/'
      },
      {
        name: 'Faculty of Health Sciences',
        value: 'fhs',
        src: '/assets/logos/uoit_logo-fhs-horizontal.gif',
        href: 'http://healthsciences.uoit.ca/'
      },
      {
        name: 'Faculty of Science',
        value: 'fsci',
        src: '/assets/logos/uoit_logo-fsci-horizontal.gif',
        href: 'http://science.uoit.ca/'
      },
      {
        name: 'Faculty of Social Science and Humanities',
        value: 'fssh',
        src: '/assets/logos/uoit_logo-fssh-horizontal.gif',
        href: 'http://socialscienceandhumanities.uoit.ca/'
      },
      {
        name: 'School of Graduate and Postdoctoral Studies',
        value: 'sgps',
        src: '/assets/logos/uoit_logo-gpds-horizontal.gif',
        href: 'http://gradstudies.uoit.ca/'
      }
    ]
  },
  {
    name: 'Associated',
    options: [
      {
        name: 'Brilliant Catalyst',
        value: 'brc',
        src: '/assets/logos/brilliant_logo-horizontal.gif',
        href: 'https://www.uoitbrilliant.ca/'
      },
      {
        name: 'Indigenous Education and Cultural Services',
        value: 'iecs',
        src: '/assets/logos/indigenous_logo-horizontal.gif',
        href: 'https://studentlife.uoit.ca/indigenous/'
      }
    ]
  }
];
