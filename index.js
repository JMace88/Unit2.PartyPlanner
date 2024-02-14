const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/josh-mace/events`;

// -----STATE-----
const state = {
  parties: [],
};

// -----REFERENCE-----
const partyList = document.querySelector('#parties');
const addPartyForm = document.querySelector('#addParty');

// ----FETCH CALLS-----
async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties = json.data;
  } catch (error) {
    console.error(error);
  }
}

async function addParty(event) {
  event.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        description: addPartyForm.description.value,
        date: addPartyForm.date.value,
        location: addPartyForm.location.value,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create party');
    }
    render();
  } catch (error) {
    console.error(error);
  }
}

// -----EVENT LISTENERS-----
addPartyForm.addEventListener('submit', addParty);

// -----RENDER-----
function renderParties() {
  if (!state.parties.length) {
    partyList.innerHTML = '<li> No Parties</li>';
    return;
  }

  const partyCard = state.parties.map((party) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <h2>${party.name}</h2>
        <h3>${party.description}</h3>
        <h3>${party.date}</h3>
        <h3>${party.location}</h3>
        `;
    return li;
  });
  partyList.replaceChildren(...partyCard);
}

async function render() {
  await getParties();
  renderParties();
}
render();
