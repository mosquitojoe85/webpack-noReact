import $ from 'jquery';
import template from './Button.html';
// import './Header.scss';

export default class Button {
  constructor(link) {
    this.link = link;
  }

  onClick(event) {
    event.preventDefault();
    alert(this.link);
  }

  render(node) {
    const text = $(node).text();
    console.log('node--->', node);

    // Render our button
    $(node).html(
      // Mustache.render(template, {text})
      template
    );
    // Attach our listeners
    $('.foo2').click(this.onClick.bind(this));
  }
}