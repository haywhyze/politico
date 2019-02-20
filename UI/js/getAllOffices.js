/* eslint-disable no-undef */
token = localStorage.getItem('token');
const fetchOffices = url =>
  fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json());

const officesContainer = document.querySelector('#offices-container');
const ourl = 'https://politico-yusuf.herokuapp.com/api/v1/offices';
// const ourl = 'http://localhost:3000/api/v1/offices';
fetchOffices(ourl)
  .then(data => {
    const officesData = data.data[0];
    officesData.sort((a, b) => (a.name < b.name ? -1 : 1));
    officesData.map(officeData => {
      const oFlexItem = document.createElement('div');
      oFlexItem.setAttribute('class', 'flex-item');
      officesContainer.appendChild(oFlexItem);
      const resultLink = document.createElement('a');
      resultLink.setAttribute('class', 'result-link');
      resultLink.setAttribute('href', '');
      resultLink.setAttribute('data-id', `${officeData.id}`);
      const rTertiary = document.createElement('h3');
      rTertiary.setAttribute('class', 'tertiary-heading');
      const rTertiaryText = document.createTextNode(`${officeData.name}`);
      rTertiary.appendChild(rTertiaryText);
      oFlexItem.appendChild(resultLink);
      resultLink.appendChild(rTertiary);
      const pElem = document.createElement('p');
      resultLink.appendChild(pElem);
      pElemText = document.createTextNode(officeData.type);
      pElem.appendChild(pElemText);
    });

    // Modal
    const modal = document.querySelector('.modal');
    const officeContainer = document.querySelector('#modal-office-container');

    if (modal) modal.style.display = 'none';

    const resultLinks = Array.from(document.querySelectorAll('.result-link'));

    const openModal = (links, modal) => {
      links.map(link => {
        link.addEventListener('click', x => {
          x.preventDefault();
          loaderBg.style.display = 'block';
          loader.style.display = 'block';
          const officeId = x.target.dataset.id || x.target.parentElement.dataset.id;
          // const getOneOfficeUrl = `http://localhost:3000/api/v1/offices/${officeId}`;
          const getOneOfficeUrl = `https://politico-yusuf.herokuapp.com/api/v1/offices/${officeId}`;
          fetchOffices(getOneOfficeUrl)
            .then(data => {
              loaderBg.style.display = 'none';
              loader.style.display = 'none';
              const officeData = data.data[0];
              const officeName = document.querySelector('#modal-office-name');
              officeName.innerHTML = officeData[0].name;
              const candidatesDetails = data.data[1];
              while (officeContainer.firstChild)
                officeContainer.removeChild(officeContainer.firstChild);
              if (typeof candidatesDetails === 'string') {
                officeName.innerHTML = 'No candidates registered yet for this office!';
              } else {
                candidatesDetails.sort((a, b) => (a.symbol < b.symbol ? -1 : 1));
                candidatesDetails.map(candidateDetail => {
                  const divContainer = document.createElement('div');
                  const dFlexitem = document.createElement('div');
                  dFlexitem.setAttribute('class', 'flex-item flex-item--alt');
                  officeContainer.appendChild(divContainer);
                  divContainer.appendChild(dFlexitem);
                  const partyLogo = document.createElement('img');
                  partyLogo.setAttribute('class', 'img party-logo');
                  partyLogo.setAttribute('width', '50');
                  partyLogo.src = candidateDetail.logo_url;
                  dFlexitem.appendChild(partyLogo);
                  const passport = document.createElement('img');
                  passport.setAttribute('class', 'img party-logo');
                  passport.src = candidateDetail.passport_url;
                  dFlexitem.appendChild(passport);
                  const candidateName = document.createElement('p');
                  const candidateNameText = document.createTextNode(
                    `${candidateDetail.firstname} ${candidateDetail.lastname} (${
                      candidateDetail.symbol
                    })`,
                  );
                  dFlexitem.appendChild(candidateName);
                  candidateName.appendChild(candidateNameText);

                  if (typeof candidatesDetails === 'string')
                    officeContainer.removeChild(divContainer);
                });
              }
              modal.style.display = 'block';
            })
            .catch(error => console.log(error));
        });
      });
    };
    if (resultLinks && modal) openModal(resultLinks, modal);

    // When the user clicks on <span> (x), close the modal
    const close = Array.from(document.querySelectorAll('.close'));
    close.map(e =>
      e.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
      }),
    );
  })
  .catch(error => console.log(error));
