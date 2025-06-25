
document.addEventListener('DOMContentLoaded', function () {
  // All your code here

//setTimeout(() => {
(function () {
  // Inject CSS
  const style = document.createElement('style');
  style.innerHTML = `
  .hp-anchor-nav {
      margin-block: 5px 15px;
      padding: 5px 10px;
      border-top: 1px solid #f9b232;
      border-bottom: 1px solid #f9b232;
      font-weight: bold;
      border-radius: 20px;
      width: fit-content;
      border: 2px solid #f9b232;
      background: #8080802b;
    }
    .hp-anchor-nav a {
      margin-right: 10px;
      cursor: pointer;
      font-size: 1.5rem;
      text-decoration: none;
    }
    .hp-read-toggle {
      background: none;
      color: #ef9b00;
      border: none;
      cursor: pointer;
      padding-left: 5px;
      font-weight: bold;
    }
    button.hp-read-toggle:hover,
    button.hp-read-toggle:active {
      background: none;
      color: #ef9b00;
      border: none;
      box-shadow: none;
    }
    .product-info-main .product.attribute.overview {
      margin: 0 !important;
      display: inline-block !important;
    }
    @media only screen and (max-width: 1200px) {
    .hp-anchor-nav {
    width: auto;
}
      .hp-anchor-nav a {
          width: 49%;
          display: inline-block;
          text-align: center;
          margin-right: 0px;
          text-wrap-mode: nowrap;
   
      }
      .hp-anchor-nav a:nth-child(n+3) {
        margin-top: 7px !important;
      }
    }
  
  `;
  document.head.appendChild(style);

  const overviewSection = document.querySelector('.product.attribute.overview');
  if (!overviewSection) return;

  const originalHTML = overviewSection.innerHTML.trim();
  const firstP = overviewSection.querySelector('p');
  const rawText = (firstP || overviewSection).innerText.trim();
  const firstSentence = rawText.split('. ')[0] + (rawText.includes('.') ? '.' : '');

  const createToggle = (showMore = true) => {
    overviewSection.innerHTML = showMore
      ? `<p>${firstSentence}<button class="hp-read-toggle">Read More</button></p>`
      : originalHTML + `<button class="hp-read-toggle">Read Less</button>`;

    overviewSection.querySelector('.hp-read-toggle').addEventListener('click', () => {
      createToggle(!showMore);
    });
  };

  if (firstSentence && originalHTML.length > firstSentence.length) {
    createToggle(true);
  }

  // Anchor Navigation
  const nav = document.createElement('div');
  nav.className = 'hp-anchor-nav';
  const tabData = {
    1: ['Description', '📄 Product Overview'],
    2: ['Technical Info', '⚙️ Technical Specs'],
    3: ['Video', '🎥 Installation Guide'],
  };

  let navHTML = '';
  let validTabs = [];

  for (let i in tabData) {
    const tab = document.querySelector(`.mgz-tabs-nav .mgz-tabs-tab-title:nth-child(${i})`);
    const span = tab?.querySelector('span');
    const label = span?.innerText?.trim() || '';
    const contentExists = document.querySelector('.mgz-tabs-content')?.innerText?.trim();

    if (tab && label.includes(tabData[i][0]) && contentExists) {
      validTabs.push(i);
    }
  }

  navHTML += `<a href="#" data-tab="1" class="hp-anchor-link" data-role="overview">${tabData[1][1]}</a>`;
  validTabs.forEach(i => {
    if (i !== '1') navHTML += `<a href="#" data-tab="${i}" class="hp-anchor-link">${tabData[i][1]}</a>`;
  });
  navHTML += `<a href="#enquiry" class="hp-enquiry-link">❓ Ask a Question</a>`;

  nav.innerHTML = navHTML;
  overviewSection.insertAdjacentElement('afterend', nav);

  nav.querySelectorAll('.hp-anchor-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabIndex = link.getAttribute('data-tab');
      const isOverview = link.dataset.role === 'overview';

      const scrollToSection = (selector) => {
        const el = document.querySelector(selector);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 225;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };

      if (!validTabs.length && isOverview) {
        scrollToSection('.product.info.detailed');
      } else {
        const tab = document.querySelector(`.mgz-tabs-nav .mgz-tabs-tab-title:nth-child(${tabIndex})`);
        if (tab) {
          tab.click();
          setTimeout(() => scrollToSection('.product.info.detailed'), 100);
        }
      }
    });
  });

  const enquiryLink = nav.querySelector('.hp-enquiry-link');
  const enquiryForm = document.querySelector('.pdp-form');
  if (!enquiryForm) {
    enquiryLink.style.display = 'none';
  } else {
    enquiryLink.addEventListener('click', e => {
      e.preventDefault();
      const y = enquiryForm.getBoundingClientRect().top + window.pageYOffset - 225;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }
})();
//}, 350);
});
    
