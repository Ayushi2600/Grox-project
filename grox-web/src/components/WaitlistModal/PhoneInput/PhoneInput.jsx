import React, { useState, useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import './PhoneInput.scss';

// Global country data with flags and phone codes - sorted alphabetically
const countries = [
  {
    code: 'af',
    name: 'Afghanistan',
    flag: 'af Afghanistan.svg',
    phoneCode: '+93',
    format: '70 000 0000',
  },
  {
    code: 'al',
    name: 'Albania',
    flag: 'al Albania.svg',
    phoneCode: '+355',
    format: '600 000000',
  },
  {
    code: 'dz',
    name: 'Algeria',
    flag: 'dz Algeria.svg',
    phoneCode: '+213',
    format: '600 000000',
  },
  {
    code: 'ad',
    name: 'Andorra',
    flag: 'ad Andorra.svg',
    phoneCode: '+376',
    format: '300 000',
  },
  {
    code: 'ao',
    name: 'Angola',
    flag: 'ao Angola.svg',
    phoneCode: '+244',
    format: '900 000000',
  },
  {
    code: 'ag',
    name: 'Antigua and Barbuda',
    flag: 'ag Antigua and Barbuda.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'ar',
    name: 'Argentina',
    flag: 'ar Argentina.svg',
    phoneCode: '+54',
    format: '9 11 0000 0000',
  },
  {
    code: 'am',
    name: 'Armenia',
    flag: 'am Armenia.svg',
    phoneCode: '+374',
    format: '10 000000',
  },
  {
    code: 'au',
    name: 'Australia',
    flag: 'au Australia.svg',
    phoneCode: '+61',
    format: '400 000 000',
  },
  {
    code: 'at',
    name: 'Austria',
    flag: 'at Austria.svg',
    phoneCode: '+43',
    format: '660 123456',
  },
  {
    code: 'az',
    name: 'Azerbaijan',
    flag: 'az Azerbaijan.svg',
    phoneCode: '+994',
    format: '50 000 00 00',
  },
  {
    code: 'bs',
    name: 'Bahamas',
    flag: 'bs Bahamas.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'bh',
    name: 'Bahrain',
    flag: 'bh Bahrain.svg',
    phoneCode: '+973',
    format: '3000 0000',
  },
  {
    code: 'bd',
    name: 'Bangladesh',
    flag: 'bd Bangladesh.svg',
    phoneCode: '+880',
    format: '1700 000000',
  },
  {
    code: 'bb',
    name: 'Barbados',
    flag: 'bb Barbados.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'by',
    name: 'Belarus',
    flag: 'by Belarus.svg',
    phoneCode: '+375',
    format: '25 0000000',
  },
  {
    code: 'be',
    name: 'Belgium',
    flag: 'be Belgium.svg',
    phoneCode: '+32',
    format: '470 12 34 56',
  },
  {
    code: 'bz',
    name: 'Belize',
    flag: 'bz Belize.svg',
    phoneCode: '+501',
    format: '600 0000',
  },
  {
    code: 'bj',
    name: 'Benin',
    flag: 'bj Benin.svg',
    phoneCode: '+229',
    format: '900 000000',
  },
  {
    code: 'bt',
    name: 'Bhutan',
    flag: 'bt Bhutan.svg',
    phoneCode: '+975',
    format: '17 000 000',
  },
  {
    code: 'bo',
    name: 'Bolivia',
    flag: 'bo Bolivia.svg',
    phoneCode: '+591',
    format: '700 00000',
  },
  {
    code: 'ba',
    name: 'Bosnia and Herzegovina',
    flag: 'ba Bosnia and Herzegovina.svg',
    phoneCode: '+387',
    format: '60 000 000',
  },
  {
    code: 'bw',
    name: 'Botswana',
    flag: 'bw Botswana.svg',
    phoneCode: '+267',
    format: '71 000 000',
  },
  {
    code: 'br',
    name: 'Brazil',
    flag: 'br Brazil.svg',
    phoneCode: '+55',
    format: '11 90000 0000',
  },
  {
    code: 'bn',
    name: 'Brunei',
    flag: 'bn Brunei Darussalam.svg',
    phoneCode: '+673',
    format: '700 0000',
  },
  {
    code: 'bg',
    name: 'Bulgaria',
    flag: 'bg Bulgaria.svg',
    phoneCode: '+359',
    format: '88 123 4567',
  },
  {
    code: 'bf',
    name: 'Burkina Faso',
    flag: 'bf Burkina Faso.svg',
    phoneCode: '+226',
    format: '600 000000',
  },
  {
    code: 'bi',
    name: 'Burundi',
    flag: 'bi Burundi.svg',
    phoneCode: '+257',
    format: '60 000000',
  },
  {
    code: 'kh',
    name: 'Cambodia',
    flag: 'kh Cambodia.svg',
    phoneCode: '+855',
    format: '12 000 000',
  },
  {
    code: 'cm',
    name: 'Cameroon',
    flag: 'cm Cameroon.svg',
    phoneCode: '+237',
    format: '600 000000',
  },
  {
    code: 'ca',
    name: 'Canada',
    flag: 'ca Canada.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'cv',
    name: 'Cape Verde',
    flag: 'cv Cabo Verde.svg',
    phoneCode: '+238',
    format: '900 0000',
  },
  {
    code: 'cf',
    name: 'Central African Republic',
    flag: 'cf Central African Republic.svg',
    phoneCode: '+236',
    format: '700 000000',
  },
  {
    code: 'td',
    name: 'Chad',
    flag: 'td Chad.svg',
    phoneCode: '+235',
    format: '600 000000',
  },
  {
    code: 'cl',
    name: 'Chile',
    flag: 'cl Chile.svg',
    phoneCode: '+56',
    format: '9 0000 0000',
  },
  {
    code: 'cn',
    name: 'China',
    flag: 'cn China.svg',
    phoneCode: '+86',
    format: '130 0000 0000',
  },
  {
    code: 'co',
    name: 'Colombia',
    flag: 'co Colombia.svg',
    phoneCode: '+57',
    format: '300 0000000',
  },
  {
    code: 'km',
    name: 'Comoros',
    flag: 'km Comoros.svg',
    phoneCode: '+269',
    format: '300 0000',
  },
  {
    code: 'cg',
    name: 'Congo',
    flag: 'cg Republic of the Congo.svg',
    phoneCode: '+242',
    format: '600 000000',
  },
  {
    code: 'cr',
    name: 'Costa Rica',
    flag: 'cr Costa Rica.svg',
    phoneCode: '+506',
    format: '6000 0000',
  },
  {
    code: 'ci',
    name: 'Ivory Coast',
    flag: "ci Côte d'Ivoire.svg",
    phoneCode: '+225',
    format: '200 000000',
  },
  {
    code: 'hr',
    name: 'Croatia',
    flag: 'hr Croatia.svg',
    phoneCode: '+385',
    format: '91 123 4567',
  },
  {
    code: 'cu',
    name: 'Cuba',
    flag: 'cu Cuba.svg',
    phoneCode: '+53',
    format: '5 0000000',
  },
  {
    code: 'cy',
    name: 'Cyprus',
    flag: 'cy Cyprus.svg',
    phoneCode: '+357',
    format: '96 123456',
  },
  {
    code: 'cz',
    name: 'Czech Republic',
    flag: 'cz Czech Republic.svg',
    phoneCode: '+420',
    format: '601 123 456',
  },
  {
    code: 'dk',
    name: 'Denmark',
    flag: 'dk Denmark.svg',
    phoneCode: '+45',
    format: '20 12 34 56',
  },
  {
    code: 'dj',
    name: 'Djibouti',
    flag: 'dj Djibouti.svg',
    phoneCode: '+253',
    format: '700 00000',
  },
  {
    code: 'dm',
    name: 'Dominica',
    flag: 'dm Dominica.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'do',
    name: 'Dominican Republic',
    flag: 'do Dominican Republic.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'ec',
    name: 'Ecuador',
    flag: 'ec Ecuador.svg',
    phoneCode: '+593',
    format: '9 0000 0000',
  },
  {
    code: 'eg',
    name: 'Egypt',
    flag: 'eg Egypt.svg',
    phoneCode: '+20',
    format: '100 0000000',
  },
  {
    code: 'sv',
    name: 'El Salvador',
    flag: 'sv El Salvador.svg',
    phoneCode: '+503',
    format: '6000 0000',
  },
  {
    code: 'gq',
    name: 'Equatorial Guinea',
    flag: 'gq Equatorial Guinea.svg',
    phoneCode: '+240',
    format: '200 000000',
  },
  {
    code: 'er',
    name: 'Eritrea',
    flag: 'er Eritrea.svg',
    phoneCode: '+291',
    format: '700 00000',
  },
  {
    code: 'ee',
    name: 'Estonia',
    flag: 'ee Estonia.svg',
    phoneCode: '+372',
    format: '5123 4567',
  },
  {
    code: 'et',
    name: 'Ethiopia',
    flag: 'et Ethiopia.svg',
    phoneCode: '+251',
    format: '900 000000',
  },
  {
    code: 'fj',
    name: 'Fiji',
    flag: 'fj Fiji.svg',
    phoneCode: '+679',
    format: '700 0000',
  },
  {
    code: 'fi',
    name: 'Finland',
    flag: 'fi Finland.svg',
    phoneCode: '+358',
    format: '400 123 456',
  },
  {
    code: 'fr',
    name: 'France',
    flag: 'fr France.svg',
    phoneCode: '+33',
    format: '1 23 45 67 89',
  },
  {
    code: 'ga',
    name: 'Gabon',
    flag: 'ga Gabon.svg',
    phoneCode: '+241',
    format: '600 000000',
  },
  {
    code: 'gm',
    name: 'Gambia',
    flag: 'gm Gambia.svg',
    phoneCode: '+220',
    format: '300 0000',
  },
  {
    code: 'ge',
    name: 'Georgia',
    flag: 'ge Georgia.svg',
    phoneCode: '+995',
    format: '555 123 456',
  },
  {
    code: 'de',
    name: 'Germany',
    flag: 'de Germany.svg',
    phoneCode: '+49',
    format: '30 12345678',
  },
  {
    code: 'gh',
    name: 'Ghana',
    flag: 'gh Ghana.svg',
    phoneCode: '+233',
    format: '20 0000 000',
  },
  {
    code: 'gr',
    name: 'Greece',
    flag: 'gr Greece.svg',
    phoneCode: '+30',
    format: '690 123 4567',
  },
  {
    code: 'gd',
    name: 'Grenada',
    flag: 'gd Grenada.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'gt',
    name: 'Guatemala',
    flag: 'gt Guatemala.svg',
    phoneCode: '+502',
    format: '3000 0000',
  },
  {
    code: 'gn',
    name: 'Guinea',
    flag: 'gn Guinea.svg',
    phoneCode: '+224',
    format: '600 000000',
  },
  {
    code: 'gw',
    name: 'Guinea-Bissau',
    flag: 'gw Guinea-Bissau.svg',
    phoneCode: '+245',
    format: '600 0000',
  },
  {
    code: 'gy',
    name: 'Guyana',
    flag: 'gy Guyana.svg',
    phoneCode: '+592',
    format: '600 0000',
  },
  {
    code: 'ht',
    name: 'Haiti',
    flag: 'ht Haiti.svg',
    phoneCode: '+509',
    format: '3000 0000',
  },
  {
    code: 'hn',
    name: 'Honduras',
    flag: 'hn Honduras.svg',
    phoneCode: '+504',
    format: '9000 0000',
  },
  {
    code: 'hu',
    name: 'Hungary',
    flag: 'hu Hungary.svg',
    phoneCode: '+36',
    format: '20 123 4567',
  },
  {
    code: 'is',
    name: 'Iceland',
    flag: 'is Iceland.svg',
    phoneCode: '+354',
    format: '600 0000',
  },
  {
    code: 'in',
    name: 'India',
    flag: 'in India.svg',
    phoneCode: '+91',
    format: '90000 00000',
  },
  {
    code: 'id',
    name: 'Indonesia',
    flag: 'id Indonesia.svg',
    phoneCode: '+62',
    format: '800 0000 0000',
  },
  {
    code: 'ir',
    name: 'Iran',
    flag: 'ir Iran.svg',
    phoneCode: '+98',
    format: '900 000 0000',
  },
  {
    code: 'iq',
    name: 'Iraq',
    flag: 'iq Iraq.svg',
    phoneCode: '+964',
    format: '700 000 0000',
  },
  {
    code: 'ie',
    name: 'Ireland',
    flag: 'ie Ireland.svg',
    phoneCode: '+353',
    format: '85 123 4567',
  },
  {
    code: 'il',
    name: 'Israel',
    flag: 'il Israel.svg',
    phoneCode: '+972',
    format: '50 000 0000',
  },
  {
    code: 'it',
    name: 'Italy',
    flag: 'it Italy.svg',
    phoneCode: '+39',
    format: '300 0000000',
  },
  {
    code: 'jm',
    name: 'Jamaica',
    flag: 'jm Jamaica.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'jp',
    name: 'Japan',
    flag: 'jp Japan.svg',
    phoneCode: '+81',
    format: '90 0000 0000',
  },
  {
    code: 'jo',
    name: 'Jordan',
    flag: 'jo Jordan.svg',
    phoneCode: '+962',
    format: '7 0000 0000',
  },
  {
    code: 'kz',
    name: 'Kazakhstan',
    flag: 'kz Kazakhstan.svg',
    phoneCode: '+7',
    format: '700 000 00 00',
  },
  {
    code: 'ke',
    name: 'Kenya',
    flag: 'ke Kenya.svg',
    phoneCode: '+254',
    format: '700 000000',
  },
  {
    code: 'ki',
    name: 'Kiribati',
    flag: 'ki Kiribati.svg',
    phoneCode: '+686',
    format: '700 0000',
  },
  {
    code: 'kw',
    name: 'Kuwait',
    flag: 'kw Kuwait.svg',
    phoneCode: '+965',
    format: '500 00000',
  },
  {
    code: 'kg',
    name: 'Kyrgyzstan',
    flag: 'kg Kyrgyzstan.svg',
    phoneCode: '+996',
    format: '700 000000',
  },
  {
    code: 'la',
    name: 'Laos',
    flag: 'la Laos.svg',
    phoneCode: '+856',
    format: '20 0000 0000',
  },
  {
    code: 'lv',
    name: 'Latvia',
    flag: 'lv Latvia.svg',
    phoneCode: '+371',
    format: '2000 0000',
  },
  {
    code: 'lb',
    name: 'Lebanon',
    flag: 'lb Lebanon.svg',
    phoneCode: '+961',
    format: '70 000 000',
  },
  {
    code: 'ls',
    name: 'Lesotho',
    flag: 'ls Lesotho.svg',
    phoneCode: '+266',
    format: '5000 0000',
  },
  {
    code: 'lr',
    name: 'Liberia',
    flag: 'lr Liberia.svg',
    phoneCode: '+231',
    format: '700 000000',
  },
  {
    code: 'ly',
    name: 'Libya',
    flag: 'ly Libya.svg',
    phoneCode: '+218',
    format: '900 000000',
  },
  {
    code: 'li',
    name: 'Liechtenstein',
    flag: 'li Liechtenstein.svg',
    phoneCode: '+423',
    format: '700 000000',
  },
  {
    code: 'lt',
    name: 'Lithuania',
    flag: 'lt Lithuania.svg',
    phoneCode: '+370',
    format: '600 00000',
  },
  {
    code: 'lu',
    name: 'Luxembourg',
    flag: 'lu Luxembourg.svg',
    phoneCode: '+352',
    format: '621 123 456',
  },
  {
    code: 'mk',
    name: 'North Macedonia',
    flag: 'mk North Macedonia.svg',
    phoneCode: '+389',
    format: '70 000 000',
  },
  {
    code: 'mg',
    name: 'Madagascar',
    flag: 'mg Madagascar.svg',
    phoneCode: '+261',
    format: '32 000 0000',
  },
  {
    code: 'mw',
    name: 'Malawi',
    flag: 'mw Malawi.svg',
    phoneCode: '+265',
    format: '800 000000',
  },
  {
    code: 'my',
    name: 'Malaysia',
    flag: 'my Malaysia.svg',
    phoneCode: '+60',
    format: '12 000 0000',
  },
  {
    code: 'mv',
    name: 'Maldives',
    flag: 'mv Maldives.svg',
    phoneCode: '+960',
    format: '700 0000',
  },
  {
    code: 'ml',
    name: 'Mali',
    flag: 'ml Mali.svg',
    phoneCode: '+223',
    format: '600 000000',
  },
  {
    code: 'mt',
    name: 'Malta',
    flag: 'mt Malta.svg',
    phoneCode: '+356',
    format: '7900 0000',
  },
  {
    code: 'mh',
    name: 'Marshall Islands',
    flag: 'mh Marshall Islands.svg',
    phoneCode: '+692',
    format: '700 0000',
  },
  {
    code: 'mr',
    name: 'Mauritania',
    flag: 'mr Mauritania.svg',
    phoneCode: '+222',
    format: '200 00000',
  },
  {
    code: 'mu',
    name: 'Mauritius',
    flag: 'mu Mauritius.svg',
    phoneCode: '+230',
    format: '500 0000',
  },
  {
    code: 'mx',
    name: 'Mexico',
    flag: 'mx Mexico.svg',
    phoneCode: '+52',
    format: '55 0000 0000',
  },
  {
    code: 'fm',
    name: 'Micronesia',
    flag: 'fm Federated States of Micronesia.svg',
    phoneCode: '+691',
    format: '700 0000',
  },
  {
    code: 'md',
    name: 'Moldova',
    flag: 'md Moldova.svg',
    phoneCode: '+373',
    format: '600 00000',
  },
  {
    code: 'mc',
    name: 'Monaco',
    flag: 'mc Monaco.svg',
    phoneCode: '+377',
    format: '6 12 34 56 78',
  },
  {
    code: 'mn',
    name: 'Mongolia',
    flag: 'mn Mongolia.svg',
    phoneCode: '+976',
    format: '8000 0000',
  },
  {
    code: 'me',
    name: 'Montenegro',
    flag: 'me Montenegro.svg',
    phoneCode: '+382',
    format: '60 000 000',
  },
  {
    code: 'ma',
    name: 'Morocco',
    flag: 'ma Morocco.svg',
    phoneCode: '+212',
    format: '600 000000',
  },
  {
    code: 'mz',
    name: 'Mozambique',
    flag: 'mz Mozambique.svg',
    phoneCode: '+258',
    format: '800 000000',
  },
  {
    code: 'mm',
    name: 'Myanmar',
    flag: 'mm Myanmar.svg',
    phoneCode: '+95',
    format: '900 000000',
  },
  {
    code: 'na',
    name: 'Namibia',
    flag: 'na Namibia.svg',
    phoneCode: '+264',
    format: '60 000 0000',
  },
  {
    code: 'nr',
    name: 'Nauru',
    flag: 'nr Nauru.svg',
    phoneCode: '+674',
    format: '700 0000',
  },
  {
    code: 'np',
    name: 'Nepal',
    flag: 'np Nepal.svg',
    phoneCode: '+977',
    format: '980 000 0000',
  },
  {
    code: 'nl',
    name: 'Netherlands',
    flag: 'nl Netherlands.svg',
    phoneCode: '+31',
    format: '6 12345678',
  },
  {
    code: 'nz',
    name: 'New Zealand',
    flag: 'nz New Zealand.svg',
    phoneCode: '+64',
    format: '200 000 000',
  },
  {
    code: 'ni',
    name: 'Nicaragua',
    flag: 'ni Nicaragua.svg',
    phoneCode: '+505',
    format: '8000 0000',
  },
  {
    code: 'ne',
    name: 'Niger',
    flag: 'ne Niger.svg',
    phoneCode: '+227',
    format: '900 000000',
  },
  {
    code: 'ng',
    name: 'Nigeria',
    flag: 'ng Nigeria.svg',
    phoneCode: '+234',
    format: '90 0000 0000',
  },
  {
    code: 'no',
    name: 'Norway',
    flag: 'no Norway.svg',
    phoneCode: '+47',
    format: '400 00 000',
  },
  {
    code: 'om',
    name: 'Oman',
    flag: 'om Oman.svg',
    phoneCode: '+968',
    format: '9000 0000',
  },
  {
    code: 'pk',
    name: 'Pakistan',
    flag: 'pk Pakistan.svg',
    phoneCode: '+92',
    format: '300 0000000',
  },
  {
    code: 'pw',
    name: 'Palau',
    flag: 'pw Palau.svg',
    phoneCode: '+680',
    format: '700 0000',
  },
  {
    code: 'pa',
    name: 'Panama',
    flag: 'pa Panama.svg',
    phoneCode: '+507',
    format: '6000 0000',
  },
  {
    code: 'pg',
    name: 'Papua New Guinea',
    flag: 'pg Papua New Guinea.svg',
    phoneCode: '+675',
    format: '7000 0000',
  },
  {
    code: 'py',
    name: 'Paraguay',
    flag: 'py Paraguay.svg',
    phoneCode: '+595',
    format: '900 000000',
  },
  {
    code: 'pe',
    name: 'Peru',
    flag: 'pe Peru.svg',
    phoneCode: '+51',
    format: '900 000000',
  },
  {
    code: 'ph',
    name: 'Philippines',
    flag: 'ph Philippines.svg',
    phoneCode: '+63',
    format: '900 000 0000',
  },
  {
    code: 'pl',
    name: 'Poland',
    flag: 'pl Poland.svg',
    phoneCode: '+48',
    format: '500 000 000',
  },
  {
    code: 'pt',
    name: 'Portugal',
    flag: 'pt Portugal.svg',
    phoneCode: '+351',
    format: '912 345 678',
  },
  {
    code: 'qa',
    name: 'Qatar',
    flag: 'qa Qatar.svg',
    phoneCode: '+974',
    format: '3000 0000',
  },
  {
    code: 'ro',
    name: 'Romania',
    flag: 'ro Romania.svg',
    phoneCode: '+40',
    format: '720 123 456',
  },
  {
    code: 'ru',
    name: 'Russia',
    flag: 'ru Russia.svg',
    phoneCode: '+7',
    format: '900 000 00 00',
  },
  {
    code: 'rw',
    name: 'Rwanda',
    flag: 'rw Rwanda.svg',
    phoneCode: '+250',
    format: '700 000000',
  },
  {
    code: 'kn',
    name: 'Saint Kitts and Nevis',
    flag: 'kn Saint Kitts and Nevis.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'lc',
    name: 'Saint Lucia',
    flag: 'lc Saint Lucia.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'vc',
    name: 'Saint Vincent and the Grenadines',
    flag: 'vc Saint Vincent and the Grenadines.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'ws',
    name: 'Samoa',
    flag: 'ws Samoa.svg',
    phoneCode: '+685',
    format: '700 0000',
  },
  {
    code: 'sm',
    name: 'San Marino',
    flag: 'sm San Marino.svg',
    phoneCode: '+378',
    format: '600 000000',
  },
  {
    code: 'st',
    name: 'Sao Tome and Principe',
    flag: 'st Sao Tome and Principe.svg',
    phoneCode: '+239',
    format: '900 0000',
  },
  {
    code: 'sa',
    name: 'Saudi Arabia',
    flag: 'sa Saudi Arabia.svg',
    phoneCode: '+966',
    format: '50 000 0000',
  },
  {
    code: 'sn',
    name: 'Senegal',
    flag: 'sn Senegal.svg',
    phoneCode: '+221',
    format: '700 000000',
  },
  {
    code: 'rs',
    name: 'Serbia',
    flag: 'rs Serbia.svg',
    phoneCode: '+381',
    format: '60 000 000',
  },
  {
    code: 'sc',
    name: 'Seychelles',
    flag: 'sc Seychelles.svg',
    phoneCode: '+248',
    format: '200 0000',
  },
  {
    code: 'sl',
    name: 'Sierra Leone',
    flag: 'sl Sierra Leone.svg',
    phoneCode: '+232',
    format: '200 00000',
  },
  {
    code: 'sg',
    name: 'Singapore',
    flag: 'sg Singapore.svg',
    phoneCode: '+65',
    format: '8000 0000',
  },
  {
    code: 'sk',
    name: 'Slovakia',
    flag: 'sk Slovakia.svg',
    phoneCode: '+421',
    format: '901 123 456',
  },
  {
    code: 'si',
    name: 'Slovenia',
    flag: 'si Slovenia.svg',
    phoneCode: '+386',
    format: '31 123 456',
  },
  {
    code: 'sb',
    name: 'Solomon Islands',
    flag: 'sb Solomon Islands.svg',
    phoneCode: '+677',
    format: '700 0000',
  },
  {
    code: 'so',
    name: 'Somalia',
    flag: 'so Somalia.svg',
    phoneCode: '+252',
    format: '600 000000',
  },
  {
    code: 'za',
    name: 'South Africa',
    flag: 'za South Africa.svg',
    phoneCode: '+27',
    format: '60 000 0000',
  },
  {
    code: 'ss',
    name: 'South Sudan',
    flag: 'ss South Sudan.svg',
    phoneCode: '+211',
    format: '900 000000',
  },
  {
    code: 'es',
    name: 'Spain',
    flag: 'es Spain.svg',
    phoneCode: '+34',
    format: '600 000 000',
  },
  {
    code: 'lk',
    name: 'Sri Lanka',
    flag: 'lk Sri Lanka.svg',
    phoneCode: '+94',
    format: '70 000 0000',
  },
  {
    code: 'sd',
    name: 'Sudan',
    flag: 'sd Sudan.svg',
    phoneCode: '+249',
    format: '900 000000',
  },
  {
    code: 'sr',
    name: 'Suriname',
    flag: 'sr Suriname.svg',
    phoneCode: '+597',
    format: '600 0000',
  },
  {
    code: 'sz',
    name: 'Eswatini',
    flag: 'sz Eswatini.svg',
    phoneCode: '+268',
    format: '700 0000',
  },
  {
    code: 'se',
    name: 'Sweden',
    flag: 'se Sweden.svg',
    phoneCode: '+46',
    format: '70 123 45 67',
  },
  {
    code: 'ch',
    name: 'Switzerland',
    flag: 'ch Switzerland.svg',
    phoneCode: '+41',
    format: '76 123 45 67',
  },
  {
    code: 'sy',
    name: 'Syria',
    flag: 'sy Syria.svg',
    phoneCode: '+963',
    format: '900 000000',
  },
  {
    code: 'tw',
    name: 'Taiwan',
    flag: 'tw Taiwan.svg',
    phoneCode: '+886',
    format: '900 000 000',
  },
  {
    code: 'tj',
    name: 'Tajikistan',
    flag: 'tj Tajikistan.svg',
    phoneCode: '+992',
    format: '900 000000',
  },
  {
    code: 'tz',
    name: 'Tanzania',
    flag: 'tz Tanzania.svg',
    phoneCode: '+255',
    format: '700 000000',
  },
  {
    code: 'th',
    name: 'Thailand',
    flag: 'th Thailand.svg',
    phoneCode: '+66',
    format: '800 000 000',
  },
  {
    code: 'tl',
    name: 'Timor-Leste',
    flag: 'tl Timor-Leste.svg',
    phoneCode: '+670',
    format: '700 0000',
  },
  {
    code: 'tg',
    name: 'Togo',
    flag: 'tg Togo.svg',
    phoneCode: '+228',
    format: '900 000000',
  },
  {
    code: 'to',
    name: 'Tonga',
    flag: 'to Tonga.svg',
    phoneCode: '+676',
    format: '700 0000',
  },
  {
    code: 'tt',
    name: 'Trinidad and Tobago',
    flag: 'tt Trinidad and Tobago.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'tn',
    name: 'Tunisia',
    flag: 'tn Tunisia.svg',
    phoneCode: '+216',
    format: '200 00000',
  },
  {
    code: 'tr',
    name: 'Turkey',
    flag: 'tr Turkey.svg',
    phoneCode: '+90',
    format: '500 000 0000',
  },
  {
    code: 'tm',
    name: 'Turkmenistan',
    flag: 'tm Turkmenistan.svg',
    phoneCode: '+993',
    format: '600 00000',
  },
  {
    code: 'tv',
    name: 'Tuvalu',
    flag: 'tv Tuvalu.svg',
    phoneCode: '+688',
    format: '700 000',
  },
  {
    code: 'ug',
    name: 'Uganda',
    flag: 'ug Uganda.svg',
    phoneCode: '+256',
    format: '700 000000',
  },
  {
    code: 'ua',
    name: 'Ukraine',
    flag: 'ua Ukraine.svg',
    phoneCode: '+380',
    format: '50 000 0000',
  },
  {
    code: 'ae',
    name: 'United Arab Emirates',
    flag: 'ae United Arab Emirates.svg',
    phoneCode: '+971',
    format: '50 000 0000',
  },
  {
    code: 'gb',
    name: 'United Kingdom',
    flag: 'gb United Kingdom uk.svg',
    phoneCode: '+44',
    format: '7700 900000',
  },
  {
    code: 'us',
    name: 'United States',
    flag: 'us United States of America usa.svg',
    phoneCode: '+1',
    format: '(555) 123-4567',
  },
  {
    code: 'uy',
    name: 'Uruguay',
    flag: 'uy Uruguay.svg',
    phoneCode: '+598',
    format: '900 00000',
  },
  {
    code: 'uz',
    name: 'Uzbekistan',
    flag: 'uz Uzbekistan.svg',
    phoneCode: '+998',
    format: '900 000000',
  },
  {
    code: 'vu',
    name: 'Vanuatu',
    flag: 'vu Vanuatu.svg',
    phoneCode: '+678',
    format: '700 0000',
  },
  {
    code: 've',
    name: 'Venezuela',
    flag: 've Venezuela.svg',
    phoneCode: '+58',
    format: '400 0000000',
  },
  {
    code: 'vn',
    name: 'Vietnam',
    flag: 'vn Vietnam.svg',
    phoneCode: '+84',
    format: '900 000 000',
  },
  {
    code: 'ye',
    name: 'Yemen',
    flag: 'ye Yemen.svg',
    phoneCode: '+967',
    format: '700 000000',
  },
  {
    code: 'zm',
    name: 'Zambia',
    flag: 'zm Zambia.svg',
    phoneCode: '+260',
    format: '900 000000',
  },
  {
    code: 'zw',
    name: 'Zimbabwe',
    flag: 'zw Zimbabwe.svg',
    phoneCode: '+263',
    format: '700 000000',
  },
];

// Find Nigeria index for default selection
const nigeriaIndex = countries.findIndex(country => country.code === 'ng');

const PhoneInput = ({ value, onChange, error, disabled }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countries[nigeriaIndex]
  ); // Nigeria default
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const isValidPhone = value => /^[0-9]{0,15}$/.test(value);

  // Handle keyboard navigation
  const handleKeyDown = e => {
    if (!isDropdownOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < countries.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : countries.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleCountrySelect(countries[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'Tab':
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset highlighted index when dropdown opens/closes
  useEffect(() => {
    if (!isDropdownOpen) {
      setHighlightedIndex(-1);
    }
  }, [isDropdownOpen]);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
    // Update the full phone number with new country code
    const numberWithoutCode = phoneNumber.replace(/^\+\d+\s*/, '');
    const newFullNumber = `${country.phoneCode} ${numberWithoutCode}`;
    setPhoneNumber(newFullNumber);
    onChange(newFullNumber, {
      dialCode: country.phoneCode.replace('+', ''),
      phoneCode: country.phoneCode,
      code: country.code,
      name: country.name,
    });
  };

  const handlePhoneNumberChange = e => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, '');
    if (!isValidPhone(digitsOnly)) {
      return;
    }
    const fullPhoneNumber = `${selectedCountry.phoneCode}${digitsOnly}`;
    setPhoneNumber(fullPhoneNumber);
    onChange(fullPhoneNumber, {
      dialCode: selectedCountry.phoneCode.replace('+', ''),
      phoneCode: selectedCountry.phoneCode,
      code: selectedCountry.code,
      name: selectedCountry.name,
    });
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className='phone-input' ref={dropdownRef}>
      {/* Country Dropdown */}
      <div className='phone-input__dropdown'>
        <button
          type='button'
          className={`phone-input__dropdown-button ${isDropdownOpen ? 'phone-input__dropdown-button--open' : ''}`}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup='listbox'
          aria-expanded={isDropdownOpen}
          aria-label={`Select country. Currently selected: ${selectedCountry.name}`}
        >
          <img
            src={`/src/components/flags/${selectedCountry.flag}`}
            alt={`${selectedCountry.name} flag`}
            className='phone-input__flag'
          />
          <CaretDown
            size={16}
            className={`phone-input__caret ${isDropdownOpen ? 'phone-input__caret--flipped' : ''}`}
          />
        </button>
      </div>

      {/* Phone Number Input Area */}
      <div className='phone-input__input-area'>
        <div className='phone-input__code-holder'>
          {selectedCountry.phoneCode}
        </div>
        <input
          ref={inputRef}
          type='tel'
          className={`phone-input__number-input ${error ? 'phone-input__number-input--error' : ''}`}
          value={phoneNumber.replace(selectedCountry.phoneCode, '').trim()}
          onChange={handlePhoneNumberChange}
          placeholder={selectedCountry.format}
          disabled={disabled}
          aria-label='Phone number input'
        />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className='phone-input__dropdown-menu'
          role='listbox'
          aria-label='Country selection'
        >
          {countries.map((country, index) => (
            <button
              key={country.code}
              type='button'
              className={`phone-input__dropdown-item ${index === highlightedIndex ? 'phone-input__dropdown-item--highlighted' : ''}`}
              onClick={() => handleCountrySelect(country)}
              onMouseEnter={() => setHighlightedIndex(index)}
              role='option'
              aria-selected={country.code === selectedCountry.code}
            >
              <img
                src={`/src/components/flags/${country.flag}`}
                alt={`${country.name} flag`}
                className='phone-input__flag'
              />
              <span className='phone-input__country-name'>{country.name}</span>
              <span className='phone-input__country-code'>
                {country.phoneCode}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
