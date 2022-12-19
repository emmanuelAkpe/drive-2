module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    extend: {
      colors: {
        'oya-ghana-green': '#079669',
        'oya-ghana-red': '#F77171',
        'oya-ghana-black': '#3E2E4D',
        'oya-ghana-light-gray': '#FBFDFE',
        'oya-ghana-ligth-dark': '#606060',
        'oya-ghana-faded-gray': '#777E91',
        'oya-ghana-border': '#E6E8EC',
        'oya-ghana-modal-background': '#FCFCFD',
        ticketbg: 'rgba(7, 150, 105, 0.15)',
        ticket: 'rgba(7, 150, 105, 0.5)',
        ticketRed: 'rgba(196, 70, 70, 1)',
        bgCol: 'rgba(7, 150, 105, 1)',
        appBg: '#F5F6F6',
        hoverDashBg: 'rgb(240, 237, 234)',
        iconBg: 'rgb(7, 150, 105, 0.1)'
      },
      fontFamily: {
        custom: ['Archivo', 'sans-serif']
      },
      fontSize: {
        'oya-ghana-caption-sb': '10px',
        'oya-ghana-caption-normal': '12px',
        'oya-ghana-body-sb': '14px',
        'oya-ghana-body-normal': '16px',
        'oya-ghana-body-normal-large': '18px',
        'oya-ghana-header-h1': '64px',
        'oya-ghana-header-h2': '48px',
        'oya-ghana-header-h3': '36px',
        'oya-ghana-header-h4': '32px',
        'oya-ghana-header-h5': '24px',
        'oya-ghana-header-h6': '20px',
        'oya-ghana-header-h7': '16px'
      },
      gridTemplateColumns: {
        '2/3': '2fr, 3fr'
      },
      boxShadow: {
        form: '0px 13px 64px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['responsive', 'hover']
    }
  },
  plugins: [],
  corePlugins: {
    fontFamily: false
  }
}
