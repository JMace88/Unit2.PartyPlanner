const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/josh-mace/events`;

// -----STATE-----
const state = {
  parties: [],
};

// -----REFERENCE-----
const partyList = document.querySelector('#parties');
const addPartyForm = document.querySelector('#addParty');

// -----EVENT LISTENERS-----
addPartyForm.addEventListener('submit', addParty);

// ----FETCH CALLS-----

// to pull parties from API
async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties = json.data;
  } catch (error) {
    console.error(error);
  }
}
// to add parties to API
async function addParty(event) {
  event.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        description: addPartyForm.description.value,
        date: new Date(addPartyForm.date.value).toISOString(),
        location: addPartyForm.location.value,
      }),
    });
    if (!response.ok) {
      console.log(addPartyForm.date.value);
      throw new Error('Failed to create party');
    }
    render();
  } catch (error) {
    console.error(error);
  }
}
// to delete parties from API
async function deleteParty(eventId) {
  try {
    const response = await fetch(API_URL + '/' + eventId, {
      method: 'DELETE',
    });
    render();
  } catch (error) {
    console.error(error);
  }
}

// -----RENDER-----
function renderParties() {
  if (!state.parties.length) {
    partyList.innerHTML = '<li> No Parties</li>';
    return;
  }

  const partyCards = state.parties.map((party) => {
    const partyCard = document.createElement('li');
    partyCard.innerHTML = `
        <h2>${party.name}</h2>
        <h3>${party.description}</h3>
        <h3>${party.date}</h3>
        <h3>${party.location}</h3>
        `;
    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteParty(party.id));
    partyCard.append(deleteButton);
    return partyCard;
  });
  partyList.replaceChildren(...partyCards);
}

async function render() {
  await getParties();
  renderParties();
}
render();
