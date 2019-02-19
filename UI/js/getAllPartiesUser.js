/* eslint-disable no-undef */
token = localStorage.getItem('token');
const getAllParties = url =>
  fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json());

const partiesContainer = document.querySelector('#parties-container');
const partySubheading = document.querySelector('#party-subheading');
const rurl = 'https://politico-yusuf.herokuapp.com/api/v1/parties';
loader = document.querySelector('#loader');
loaderBg = document.querySelector('#loader-background');
loaderBg.style.display = 'block';
loader.style.display = 'block';

getAllParties(rurl)
  .then(data => {
    const partiesData = data.data[0];
    loaderBg.style.display = 'none';
    loader.style.display = 'none';
    if (!partiesData[0]) {
      partySubheading.innerHTML = 'No Party to display';
    }
    partiesData.map(partyData => {
      const dFlexItem = document.createElement('div');
      dFlexItem.setAttribute('class', 'flex-item');
      partiesContainer.appendChild(dFlexItem);
      const partyContainer = document.createElement('div');
      partyContainer.setAttribute('class', 'party-container');
      dFlexItem.appendChild(partyContainer);
      const rTertiary = document.createElement('h3');
      rTertiary.setAttribute('class', 'tertiary-heading');
      const rTertiaryText = document.createTextNode(`${partyData.name}`);
      rTertiary.appendChild(rTertiaryText);
      dFlexItem.appendChild(rTertiary);
      const partyLogo = document.createElement('img');
      partyLogo.setAttribute('class', 'img party-logo');
      partyLogo.src = partyData.logo_url;
      partyContainer.appendChild(partyLogo);
      const partySymbol = document.createElement('h2');
      partySymbol.setAttribute('class', 'secondary-heading');
      const partySymbolText = document.createTextNode(`${partyData.symbol}`);
      partySymbol.appendChild(partySymbolText);
      partyContainer.appendChild(partySymbol);
      const hqAdd = document.createElement('address');
      const locIcon = document.createElement('i');
      locIcon.setAttribute('class', 'material-icons');
      iconText = document.createTextNode('location_on');
      hqAdd.appendChild(locIcon);
      locIcon.appendChild(iconText);
      const hqAddText = document.createTextNode(partyData.hq_address);
      hqAdd.appendChild(hqAddText);
      dFlexItem.appendChild(hqAdd);
    });
  })
  .catch(error => console.log(error));
