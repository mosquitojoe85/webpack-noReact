

import '../scss/style.scss';

import "bootstrap/scss/bootstrap.scss";


if (process.env.NODE_ENV !== 'production') {
  require('../index.html');
}

if (document.querySelectorAll('test').length) {
    require.ensure([], () => {
      const Button = require('../components/Button.js').default;
      const button = new Button('google.com');

      button.render('test');
    }, 'button');
}

