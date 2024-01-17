/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        cBlack: '#000',
        cWhite: '#fff',
      },
      minHeight: {},
      boxShadow: {},
      scale: {
        90: '0.9',
        120: '1.2',
      },
      animation: {
        'spin-slow': 'spinSlow 5s linear infinite',
        'loading-spin': 'loadingSpin 2s ease infinite',
      },
      animationDelay: {
        'n1.5': '-1.5s',
        n1: '-1s',
        'n0.5': '-0.5s',
      },
      transitionDuration: {
        400: '400ms',
        1000: '1000ms',
        1100: '1100ms',
        1200: '1200ms',
        1300: '1300ms',
      },
      transitionDelay: {
        1000: '1000ms',
        1100: '1100ms',
        1200: '1200ms',
      },
      gridTemplateColumns: {
        '1-3': '1fr 3fr',
      },
    },
    screens: {
      // 'xl-max': { max: '1439px' },
      // xl: '1440px',

      'lg-max': { max: '1439px' },
      lg: '1440px',

      'md-max': { max: '1023px' },
      md: '1023px',

      'sm-max': { max: '767px' },
      sm: '768px',

      'xs-max': { max: '519px' },
      xs: '520px',
    },
    columns: {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      auto: 'auto',
    },
    spacing: {
      '1/2': '50%',
      0: '0px',
      0.1: '0.1rem',
      0.2: '0.2rem',
      0.3: '0.3rem',
      0.4: '0.4rem',
      0.5: '0.5rem',
      0.6: '0.6rem',
      0.7: '0.7rem',
      0.8: '0.8rem',
      0.9: '0.9rem',
      1: '1rem',
      1.1: '1.1rem',
      1.2: '1.2rem',
      1.3: '1.3rem',
      1.4: '1.4rem',
      1.5: '1.5rem',
      1.6: '1.6rem',
      1.7: '1.7rem',
      1.8: '1.8rem',
      1.9: '1.9rem',
      2: '2rem',
      2.1: '2.1rem',
      2.2: '2.2rem',
      2.3: '2.3rem',
      2.4: '2.4rem',
      2.5: '2.5rem',
      2.6: '2.6rem',
      2.7: '2.7rem',
      2.8: '2.8rem',
      2.9: '2.9rem',
      3: '3rem',
      3.1: '3.1rem',
      3.2: '3.2rem',
      3.3: '3.3rem',
      3.4: '3.4rem',
      3.5: '3.5rem',
      3.6: '3.6rem',
      3.7: '3.7rem',
      3.8: '3.8rem',
      3.9: '3.9rem',
      4: '4rem',
      4.1: '4.1rem',
      4.2: '4.2rem',
      4.3: '4.3rem',
      4.4: '4.4rem',
      4.5: '4.5rem',
      4.6: '4.6rem',
      4.7: '4.7rem',
      4.8: '4.8rem',
      4.9: '4.9rem',
      5: '5rem',
      5.1: '5.1rem',
      5.2: '5.2rem',
      5.3: '5.3rem',
      5.4: '5.4rem',
      5.5: '5.5rem',
      5.6: '5.6rem',
      5.7: '5.7rem',
      5.8: '5.8rem',
      5.9: '5.9rem',
      6: '6rem',
      6.1: '6.1rem',
      6.2: '6.2rem',
      6.3: '6.3rem',
      6.4: '6.4rem',
      6.5: '6.5rem',
      6.6: '6.6rem',
      6.7: '6.7rem',
      6.8: '6.8rem',
      6.9: '6.9rem',
      7: '7rem',
      7.1: '7.1rem',
      7.2: '7.2rem',
      7.3: '7.3rem',
      7.4: '7.4rem',
      7.5: '7.5rem',
      7.6: '7.6rem',
      7.7: '7.7rem',
      7.8: '7.8rem',
      7.9: '7.9rem',
      8: '8rem',
      8.1: '8.1rem',
      8.2: '8.2rem',
      8.3: '8.3rem',
      8.4: '8.4rem',
      8.5: '8.5rem',
      8.6: '8.6rem',
      8.7: '8.7rem',
      8.8: '8.8rem',
      8.9: '8.9rem',
      9: '9rem',
      9.1: '9.1rem',
      9.2: '9.2rem',
      9.3: '9.3rem',
      9.4: '9.4rem',
      9.5: '9.5rem',
      9.6: '9.6rem',
      9.7: '9.7rem',
      9.8: '9.8rem',
      9.9: '9.9rem',
      10: '10rem',
      px: '1px',
    },
    fontSize: {
      '4xl': [
        '12.8rem',
        {
          lineHeight: '90%',
        },
      ],
      '3xl': [
        '10.4rem',
        {
          lineHeight: '90%',
        },
      ],
      '2xl': [
        '6.4rem',
        {
          lineHeight: '90%',
        },
      ],
      xl: [
        '5.6rem',
        {
          'line-height': '120%',
        },
      ],
      lg: [
        '2.8rem',
        {
          lineHeight: '105%',
        },
      ],
      md: [
        '1.8rem',
        {
          lineHeight: '120%',
        },
      ],
      base: [
        '1.6rem',
        {
          lineHeight: '130%',
        },
      ],
      sm: [
        '1.4rem',
        {
          lineHeight: '120%',
        },
      ],
      0: [
        '0',
        {
          lineHeight: '0',
          letterSpacing: '0',
        },
      ],
    },
    lineHeight: {
      none: '1',
      normal: '1.5',
    },
    fontFamily: {
      base: 'var(--base-font)',
      secondary: 'var(--secondary-font)',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      169: '16 / 9',
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']),
        addVariant('inverted-colors', '@media (inverted-colors: inverted)'),
        addVariant('not-last', '&:not(:last-child)'),
        addVariant('not-first', '&:not(:first-child)'),
        addVariant('child-1', '&:nth-child(1)'),
        addVariant('child-2', '&:nth-child(2)'),
        addVariant('child-3', '&:nth-child(3)'),
        addVariant('child-4', '&:nth-child(4)'),
        addVariant('child-5', '&:nth-child(5)'),
        addVariant('child-6', '&:nth-child(6)'),
        addVariant('child-7', '&:nth-child(7)'),
        addVariant('child-8', '&:nth-child(8)'),
        addVariant('child-9', '&:nth-child(9)');
    }),
    require('tailwindcss-aspect-ratio'),
    require('tailwindcss-animation-delay'),
  ],
};
