function showInsults(insults) {
  const insultsElem = document.querySelector('#insults');
  for(insult of insults) {
    const insultElem = document.createElement('li');
    insultElem.innerHTML = `${insult.insult} - ${insult.play}`;
    insultsElem.append(insultElem);
  }
}

async function getInsults() {
  const response = await fetch('http://localhost:8000/api/insults');
  const data = await response.json();
  console.log('Data:', data);
  showInsults(data.insults);
}

document.querySelector('#buttonElem').addEventListener('click', () => {
  getInsults();
});