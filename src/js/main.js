

import '../scss/style.scss';

import "bootstrap/scss/bootstrap.scss";


if (process.env.NODE_ENV !== 'production') {
  require('../index.html');
}

const chartOption = {
  chart: { type: 'line' },
  title: { text: '' },
  scrollbar: { enabled: false },
  navigator: { enabled: false },
  tooltip:{ enabled: true },
  credits: { enabled: false },
  series: {},
  exporting: { enabled: false }
};


