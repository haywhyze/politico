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

const updatePartyName = (url, data) =>
  fetch(url, {
    mode: 'cors',
    method: 'PATCH',
    cache: 'no-cache',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  }).then(response => response.json());

const deleteParty = url =>
  fetch(url, {
    mode: 'cors',
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json());

const partiesContainer = document.querySelector('#parties-container');
const partySubheading = document.querySelector('#party-subheading');
loaderBg.style.display = 'block';
loader.style.display = 'block';
getAllParties(`${baseUrl}parties`)
  .then(data => {
    loaderBg.style.display = 'none';
    loader.style.display = 'none';
    const partiesData = data.data[0];
    if (!partiesData[0]) {
      partySubheading.innerHTML = 'No Party to display';
    }
    partiesData.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    partiesData.map(partyData => {
      const dFlexItem = document.createElement('div');
      dFlexItem.setAttribute('class', 'flex-item');
      dFlexItem.setAttribute('data-id', `${partyData.id}`);
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
      const editLink = document.createElement('a');
      const deleteLink = document.createElement('a');
      editLink.setAttribute('class', 'button edit u-blue');
      deleteLink.setAttribute('class', 'button delete');
      dFlexItem.appendChild(editLink);
      dFlexItem.appendChild(deleteLink);
      delText = document.createTextNode('Delete');
      edText = document.createTextNode('Edit');
      deleteLink.appendChild(delText);
      editLink.appendChild(edText);
    });
    // Modal
    const modalEdit = document.querySelector('.modal-edit');
    const modalDelete = document.querySelector('.modal-delete');
    const confirmDelete = document.querySelector('.confirm-delete');
    const update = document.querySelector('.update');

    if (modalEdit) modalEdit.style.display = 'none';
    if (modalDelete) modalDelete.style.display = 'none';
    const editLinks = Array.from(document.querySelectorAll('.edit'));
    const deleteLinks = Array.from(document.querySelectorAll('.delete'));

    const openModal = (links, modal, confirm) => {
      let partyId;
      let nameData;
      links.map(link => {
        link.addEventListener('click', x => {
          x.preventDefault();
          partyId = x.target.parentElement.dataset.id;
          modal.style.display = 'block';
        });
      });
      confirm.addEventListener('click', e => {
        e.preventDefault();
        modalEdit.style.display = 'none';
        modalDelete.style.display = 'none';
        loaderBg.style.display = 'block';
        loader.style.display = 'block';
        if (e.target.matches('.update')) {
          const newPartyName = document.querySelector('#new-party-name');
          nameData = { name: newPartyName.value };
          updatePartyName(`${baseUrl}parties/${partyId}/name`, nameData)
            .then(data => {
              loaderBg.style.display = 'none';
              loader.style.display = 'none';
              alert.style.display = 'block';
              if (data.status === 200) {
                if (alert.classList.contains('failure')) alert.classList.remove('failure');
                alert.classList.add('success');
                alertMessage.innerHTML = 'Name Succesfully Updated';
                sessionStorage.setItem('reloadParties', 'true');
                setTimeout(() => window.location.reload(), 1000);
              } else {
                alert.classList.add('failure');
                alertMessage.innerHTML = data.error;
              }
              setTimeout(() => (alert.style.display = 'none'), 2500);
            })
            .catch(error => console.log(error));
        } else if (e.target.matches('.confirm-delete'))
          deleteParty(`${baseUrl}parties/${partyId}`)
            .then(data => {
              loaderBg.style.display = 'none';
              loader.style.display = 'none';
              alert.style.display = 'block';
              if (data.status === 200) {
                if (alert.classList.contains('failure')) alert.classList.remove('failure');
                alert.classList.add('success');
                alertMessage.innerHTML = 'Party deleted successfully';
                sessionStorage.setItem('reloadParties', 'true');
                setTimeout(() => window.location.reload(), 1000);
              } else {
                alert.classList.add('failure');
                alertMessage.innerHTML = data.error;
              }
              setTimeout(() => (alert.style.display = 'none'), 2500);
            })
            .catch(error => console.log(error));
      });
    };
    if (editLinks && modalEdit) openModal(editLinks, modalEdit, update);
    if (deleteLinks && modalDelete) openModal(deleteLinks, modalDelete, confirmDelete);

    // When the user clicks on <span> (x), close the modal
    const close = Array.from(document.querySelectorAll('.close'));
    close.map(e =>
      e.addEventListener('click', () => {
        if (modalEdit) modalEdit.style.display = 'none';
        if (modalDelete) modalDelete.style.display = 'none';
      }),
    );
  })
  .catch(error => console.log(error));
