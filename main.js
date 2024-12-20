  const createPlayerBtn = document.getElementById("create-palyer-button");
  const popup = document.getElementById("create-player-popup");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const form = document.getElementById("create-player-form");
  const positionOptions = document.querySelectorAll(".position-btn");
  const generalStats = document.getElementById("general-stats");
  const goalkeeperStats = document.getElementById("goalkeeper-stats");

  let selectedPosition = null;


  // Validation Functions
  function validateName(name) {
      const nameRegex = /^[A-Za-z\s']+$/;
      return nameRegex.test(name.trim());
    }
    
    function validateStats(stats) {
      return stats.every(stat => Number.isInteger(stat) && stat > 0 && stat <= 100);
    }
    
  // Show popup and reset stats display
  createPlayerBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
    selectedPosition = null;
  });

  // Hide popup
  closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    form.reset();
    positionOptions.forEach((btn) => {
      btn.style.backgroundColor = ""; // Reset background color
    });
  });

  // Handle position selection
  positionOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const position = btn.dataset.position;

      // Deselect previous selection
      if (selectedPosition) {
        document.querySelector(`[data-position="${selectedPosition}"]`).style.backgroundColor = "";
      }
      // Update selection
      selectedPosition = position;
      btn.style.backgroundColor = "green";

      // Toggle stats visibility based on position
      if (position === "GK") {
        generalStats.style.display = "none"; 
        goalkeeperStats.style.display = "flex"; 
      } else {
        generalStats.style.display = "flex"; 
        goalkeeperStats.style.display = "none";
      }
    });
  });



  // Handle form submission
  form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get the values from the form inputs
    const lastName = document.getElementById("player-last-name").value.trim();
    const firstName = document.getElementById("player-first-name").value.trim();

    if (!validateName(firstName) || !validateName(lastName)) {
      alert("First name and last name must contain only letters and spaces and '");
      return;
    }
      if (!selectedPosition) {
      alert("Please select a position.");
      return;
    }
    
    // Stats for players (general stats or goalkeeper stats)
    let stats = [];
    let power = 0

    if (selectedPosition === "GK") {
      const div = parseInt(document.getElementById("div").value);
      const han = parseInt(document.getElementById("han").value);
      const kic = parseInt(document.getElementById("kic").value);
      const ref = parseInt(document.getElementById("ref").value);
      const spe = parseInt(document.getElementById("spe").value);
      const pos = parseInt(document.getElementById("pos").value);

      stats = [div, han, kic, ref, spe, pos];
      power = Math.round((div + han + kic + ref + spe + pos) / 6);

      if (!validateStats(stats)) {
          alert("Stats must be between 1 and 100.");
          return;
        }
      } else {
          const pac = parseInt(document.getElementById("pac").value);
          const sho = parseInt(document.getElementById("sho").value);
          const pas = parseInt(document.getElementById("pas").value);
          const dri = parseInt(document.getElementById("dri").value);
          const def = parseInt(document.getElementById("def").value);
          const phy = parseInt(document.getElementById("phy").value);

      stats = [pac, sho, pas, dri, def, phy];
      power = Math.round((pac + sho + pas + dri + def + phy) / 6);

      if (!validateStats(stats)) {
          alert("Stats must be between 1 and 100.");
          return;
        }

      }
    // Select the subs container
    const cardContainer = document.querySelector(".subs"); // Parent container for all cards
    // Create a new player card 
    const photo = document.getElementById("image-url").value.trim();
    const nationality = document.getElementById("image-nationality").value.trim();
    const club = document.getElementById("image-club").value.trim();

    const newCard = document.createElement("div");
    newCard.classList.add("player-card");
    newCard.setAttribute("data-position", selectedPosition);

    newCard.innerHTML = `
        <div class="card-header">
            <span id="rating">${power}</span>
            <span id="position">${selectedPosition}</span>
        </div>

        <div id="photo" class="photo">
            <img src="${photo}" alt="Player photo">
        </div>

        <div id="player-name" class="player-name">${lastName}</div>
        <div id="club-nation">
            <div id="nation" class="nation">
              <img src="${nationality}" alt="Player photo">
            </div>
            <div id="club" class="club">
              <img src="${club}" alt="Player photo">
            </div>
        </div>

        <div id="powers" class="powers">
            ${selectedPosition === "GK" ? `
                <div id="pac1">DIV<br>${stats[0]}</div>
                <div id="sho1">HAN<br>${stats[1]}</div>
                <div id="pas1">KIC<br>${stats[2]}</div>
                <div id="dri1">REF<br>${stats[3]}</div>
                <div id="def1">SPE<br>${stats[4]}</div>
                <div id="phy1">POS<br>${stats[5]}</div>
            ` : `
                <div id="pac1">PAC<br>${stats[0]}</div>
                <div id="sho1">SHO<br>${stats[1]}</div>
                <div id="pas1">PAS<br>${stats[2]}</div>
                <div id="dri1">DRI<br>${stats[3]}</div>
                <div id="def1">DEF<br>${stats[4]}</div>
                <div id="phy1">PHY<br>${stats[5]}</div>
            `}
        </div>
    `;

    cardContainer.appendChild(newCard);
    alert("Player added successfully!");

    //drag and drop function
    newCard.setAttribute("draggable", "true");
    newCard.style.cursor = "grab";

    let box1 = document.querySelector('.subs');
    let boxes = document.querySelectorAll('.position');
    let playerCards = document.querySelectorAll(".player-card")

    let selected = null;

    for (let playerCard of playerCards){
      playerCard.addEventListener('dragstart', function(){
            selected = playerCard;
            playerCard.style.opacity = '0.5';
        });
        playerCard.addEventListener('dragend', function(){
            selected = null;
            playerCard.style.opacity = '1';
        });
    }

    for (let box of boxes) {
      box.addEventListener("dragover", function (e) {
          e.preventDefault();
      });

      box.addEventListener("drop", function () {
          if (selected) {
              if (box.children.length === 1) {
                  //swap the selected card with the existing card in the box
                  let existingCard = box.children[0]; //get the current card in the box
                  let parentBox = selected.parentElement; //get the original parent of the dragged card

                  parentBox.appendChild(existingCard); //move the existing card to the original parent of the dragged card

                  box.appendChild(selected); //place the dragged card in the target box

              } else if (box.children.length === 0) {
                  box.appendChild(selected);
                };
            };
        });
      };

      box1.addEventListener("dragover", function(e){
            e.preventDefault();
        });

      box1.addEventListener("drop", function(){
            box1.appendChild(selected);
        });
        

    //delete function
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "x";
    deleteBtn.classList.add('deletebtn');

    newCard.appendChild(deleteBtn);

    deleteBtn.addEventListener('click',() =>{
      //confirmation winddow
      const confirmDelete = window.confirm('Are you sure you want to delete this player?');
      if (confirmDelete) {
        newCard.remove();
      }      
    });

  //edit
  const editBtn = document.createElement("button"); 
  editBtn.innerHTML = `<img src="images/edit.png" alt="Edit">`;                    
  editBtn.classList.add("editbtn");      

  editBtn.addEventListener("click", () => {
    //check if an editBox already exists
    const existEditBox = newCard.querySelector('.editbox');
    if (existEditBox) 
    return; //prevent multiple editBoxes
    
    //create the editBox
    const editBox = document.createElement('div');
    editBox.classList.add('editbox');

    const cardName = newCard.querySelector('#player-name').textContent; 
    const cardNationality = newCard.querySelector('.nation img').src; 
    const cardClub = newCard.querySelector('.club img').src; 
    const cardPhoto = newCard.querySelector('.photo img').src;

    editBox.innerHTML = `
      <label>Player Name: <input type="text" id="edit-player-name" value="${cardName}"></label>
      <label>Nationality (URL): <input type="url" id="edit-nationality" value="${cardNationality}"></label>
      <label>Club (URL): <input type="url" id="edit-club" value="${cardClub}"></label>
      <label>Photo (URL): <input type="url" id="edit-photo" value="${cardPhoto}"></label>
      `;

    //create cancel and confirm buttons
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('cancel-btn');

    cancelBtn.addEventListener('click', () => { 
      newCard.removeChild(editBox) 
    });

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm';
    confirmBtn.classList.add('confirm-btn');

    confirmBtn.addEventListener('click', () => {
      //get updated values
      const updatedName = document.getElementById("edit-player-name").value.trim(); 
      const updatedNationality = document.getElementById("edit-nationality").value.trim(); 
      const updatedClub = document.getElementById("edit-club").value.trim(); 
      const updatedPhoto = document.getElementById("edit-photo").value.trim();

      //update the card's DOM elements
      newCard.querySelector('#player-name').textContent = updatedName; 
      newCard.querySelector('.nation img').src = updatedNationality; 
      newCard.querySelector('.club img').src = updatedClub; 
      newCard.querySelector('.photo img').src = updatedPhoto;

      newCard.removeChild(editBox);
    });

    //append buttons to editBox
    editBox.appendChild(cancelBtn);
    editBox.appendChild(confirmBtn);

    //append the editBox to the newCard
    newCard.appendChild(editBox);
  });

  //append the edit button to the newCard
  newCard.appendChild(editBtn);

  positionOptions.forEach((btn) => {
  btn.style.backgroundColor = ""; 
  });
  selectedPosition = null;

  form.reset();
});

//tactics (formations)
const button433 = document.getElementById("btn433");
const button442 = document.getElementById("btn442");
const formation = document.getElementById("formation");

//hide the formation container in default
formation.style.display = "none";

//add event listeners for buttons
button433.addEventListener("click", () => {
  //style for the active button
  button433.style.backgroundColor = "green";
  button442.style.backgroundColor = "";
  formation.style.display = "flex"; //display the formation container
});

button442.addEventListener("click", () => {
  //style for the active button
  button442.style.backgroundColor = "green";
  button433.style.backgroundColor = "";
  formation.style.display = "flex"; //display the formation container
});

let positions = document.querySelectorAll('.position'); //select all elements with the class "position"

//for 433 button
button433.addEventListener("click", () => {
  positions[0].style.top = "20%";
  positions[0].style.right = "46%";

  positions[1].style.top = "18%";
  positions[1].style.right = "60%";

  positions[2].style.top = "20%";
  positions[2].style.right = "74%";

  positions[3].style.top = "41%";
  positions[3].style.right = "49%";

  positions[5].style.top = "49%";
  positions[5].style.right = "60%";

  positions[4].style.top = "41%";
  positions[4].style.right = "71%";

  positions[6].style.top = "61%";
  positions[6].style.right = "79%";

  positions[7].style.top = "65%";
  positions[7].style.right = "68%";

  positions[8].style.top = "65%";
  positions[8].style.right = "52%";

  positions[9].style.top = "61%";
  positions[9].style.right = "41%";

  positions[10].style.top = "82%";
  positions[10].style.right = "60%";

});

//for 442 button
button442.addEventListener("click", () => {
  positions[1].style.top = "20%";
  positions[1].style.right = "66%";

  positions[0].style.top = "20%";
  positions[0].style.right = "55%";

  positions[4].style.top = "44%";
  positions[4].style.right = "66%";

  positions[5].style.top = "44%";
  positions[5].style.right = "54%";

  positions[2].style.top = "36%";
  positions[2].style.right = "78%";

  positions[3].style.top = "36%";
  positions[3].style.right = "43%";

  positions[6].style.top = "61%";
  positions[6].style.right = "79%";

  positions[7].style.top = "65%";
  positions[7].style.right = "68%";

  positions[8].style.top = "65%";
  positions[8].style.right = "52%";

  positions[9].style.top = "61%";
  positions[9].style.right = "41%";

  positions[10].style.top = "82%";
  positions[10].style.right = "60%";
});

