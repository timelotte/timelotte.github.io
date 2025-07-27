var TimeLotte = window.TimeLotte || {};

TimeLotte.svg = {
  eye_open: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><defs><mask id="eye-mask"><rect width="24" height="24" fill="white"/><circle cx="12" cy="12" r="5" fill="black"/></mask></defs><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" mask="url(#eye-mask)"/><circle cx="12" cy="12" r="2"/></svg>`,
  eye_closed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><defs><mask id="eye-mask"><rect width="24" height="24" fill="white"/><circle cx="12" cy="12" r="5" fill="black"/></mask></defs><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" mask="url(#eye-mask)"/><circle cx="12" cy="12" r="2"/><path d="M5.14 2.51 L17.14 22.51 L18.86 21.49 L6.86 1.49 Z" /></svg>`,
  clear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke-width="2"><defs><mask id="x-mask"><rect width="24" height="24" fill="white"/><line x1="8" y1="8" x2="16" y2="16" stroke="black"/><line x1="16" y1="8" x2="8" y2="16" stroke="black"/></mask></defs><circle cx="12" cy="12" r="10" mask="url(#x-mask)"/></svg>`
}

TimeLotte.renderTextInputs = function renderTextInputs() {
  const elements = Array.from(document.body.getElementsByClassName('tlc-text'));
  for(let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const type = el.dataset.type;
    const id = el.dataset.id || '';
    const label = document.createElement(id !== '' ? 'label' : 'span');
    const wrapper = document.createElement('div');
    const content = document.createElement('input');
    const extra = document.createElement('span');
    let action = '';
    
    if(id !== '') {
      label.setAttribute('for', id);
      content.setAttribute('id', id);
      label.classList.add('tlc-input-title');
      label.innerText = el.dataset.title || '';
    }
    
    wrapper.classList.add('tlc-input-wrapper');
    extra.classList.add('tlc-input-extra')
    
    switch(type) {
      case 'email': {
        content.setAttribute('type', 'email');
        break;
      }
      case 'password': {
        action = 'appendChild';
        extra.innerHTML = TimeLotte.svg.eye_open;
        content.setAttribute('type', 'password');
        extra.addEventListener('click', function() {
          if((content.getAttribute('type') || 'password') === 'password') {
            content.setAttribute('type', 'text');
            extra.innerHTML = TimeLotte.svg.eye_closed;
          } else {
            content.setAttribute('type', 'password');
            extra.innerHTML = TimeLotte.svg.eye_open;
          }
        });
        break;
      }
      case 'text':
      case 'default':
      default: {
        action = 'appendChild';
        extra.innerHTML = TimeLotte.svg.clear;
        content.setAttribute('type', 'text');
        extra.addEventListener('click', function() {
          content.value = '';
          extra.style.display = 'none';
        });
      }
    }
    
    if(type !== 'password') {
      extra.style.display = 'none';
      content.addEventListener('input', function() {
        extra.style.display =
            (content.value === '')
            ? 'none'
            : 'flex';
      });
    }
    
    content.classList.add('tlc-input-content');
    
    wrapper.appendChild(content);
    el.appendChild(label);
    el.appendChild(wrapper);
    
    if(action) {
      wrapper[action](extra);
    }
  }
}

TimeLotte.renderTextInputs();