/* eslint-disable no-undef */
token = localStorage.getItem('token');
const updateStatus = (url, data) =>
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

const getPendingCandidates = url =>
  fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json());

const candidatesContainer = document.querySelector('#candidates-container');
const candidatesSubheading = document.querySelector('#candidates-subheading');
loaderBg.style.display = 'block';
loader.style.display = 'block';
getPendingCandidates(`${baseUrl}candidates`)
  .then(data => {
    loaderBg.style.display = 'none';
    loader.style.display = 'none';
    const candidatesData = data.data[0];
    if (!candidatesData[0]) {
      candidatesSubheading.innerHTML = 'No Candidate request to display';
      document.querySelector('.table-container').removeChild(document.querySelector('table'));
    }
    candidatesData.sort((a, b) => (a.id < b.id ? -1 : 1));

    candidatesData.map(candidateData => {
      candidatesContainer.innerHTML += `
    <tr>
      <td>${candidateData.firstname} ${candidateData.lastname}</td>
      <td>${candidateData.id}</td>
      <td>${candidateData.name}</td>
      <td>${candidateData.symbol}</td>
      <td data-id="${candidateData.id}">
        <a href="" class="approve button button--alt u-bg-green">Approve</a>
        <a href="" class="reject button button--alt">Reject</a>
      </td>
    </tr>
    `;
    });

    // Modal
    const modalStatus = document.querySelector('.modal-status');
    const modalReject = document.querySelector('.modal-reject');
    const confirmApprove = document.querySelector('.confirm-approve');
    const confirmReject = document.querySelector('.confirm-reject');

    if (modalStatus) modalStatus.style.display = 'none';
    if (modalReject) modalReject.style.display = 'none';
    const approveLinks = Array.from(document.querySelectorAll('.approve'));
    const rejectLinks = Array.from(document.querySelectorAll('.reject'));

    const openModal = (links, modal, confirm) => {
      let candidateId;
      links.map(link => {
        link.addEventListener('click', x => {
          x.preventDefault();
          candidateId = x.target.parentElement.dataset.id;
          modal.style.display = 'block';
        });
      });
      confirm.addEventListener('click', e => {
        e.preventDefault();
        modalStatus.style.display = 'none';
        modalReject.style.display = 'none';
        loaderBg.style.display = 'block';
        loader.style.display = 'block';
        const statusData = {
          status: e.target.dataset.status,
        };
        updateStatus(`${baseUrl}offices/${candidateId}/status`, statusData).then(data => {
          loaderBg.style.display = 'none';
          loader.style.display = 'none';
          alert.style.display = 'block';
          if (data.status === 200) {
            if (alert.classList.contains('failure')) alert.classList.remove('failure');
            alert.classList.add('success');
            alertMessage.innerHTML = e.target.dataset.status.toUpperCase();
            sessionStorage.setItem('reloadCandidates', 'true');
            setTimeout(() => window.location.reload(), 1000);
          } else {
            alert.classList.add('failure');
            alertMessage.innerHTML = data.error;
          }
          setTimeout(() => (alert.style.display = 'none'), 2500);
          console.log(data);
        });
      });
    };
    if (approveLinks && modalStatus) openModal(approveLinks, modalStatus, confirmApprove);
    if (rejectLinks && modalReject) openModal(rejectLinks, modalReject, confirmReject);

    // When the user clicks on <span> (x), close the modal
    const close = Array.from(document.querySelectorAll('.close'));
    close.map(e =>
      e.addEventListener('click', () => {
        if (modalStatus) modalStatus.style.display = 'none';
        if (modalReject) modalReject.style.display = 'none';
      }),
    );
  })
  .catch(error => console.log(error));
