/* eslint-disable no-undef */
token = localStorage.getItem('token');
const userId = localStorage.getItem('id');
const getVoteHistory = url =>
  fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'x-access-token': token,
    },
  }).then(response => response.json());

const voteHistoryContainer = document.querySelector('#vote-history-container');
const historySubheading = document.querySelector('#history-subheading');
loaderBg.style.display = 'block';
loader.style.display = 'block';

getVoteHistory(`${baseUrl}vote/${userId}`)
  .then(data => {
    const votesData = data.data;
    loaderBg.style.display = 'none';
    loader.style.display = 'none';
    votesData.sort((a, b) => (a.created_on > b.created_on ? -1 : 1));
    console.log(votesData);
    if (!votesData[0]) {
      historySubheading.innerHTML = 'You have not voted for any candidates yet';
    }
    let votesCount = 0;
    votesData.map(voteData => {
      votesCount += 1;
      voteHistoryContainer.innerHTML += `
      <tr>
        <td>${votesCount}</td>
        <td>${voteData.office_name}</td>
        <td>${voteData.type}</td>
        <td>${voteData.firstname} ${voteData.lastname}</td>
        <td>${voteData.acronym}</td>
        <td>${new Date(voteData.created_on).toDateString()}</td>
      </tr>
      `;
    });
  })
  .catch(error => console.log(error));
