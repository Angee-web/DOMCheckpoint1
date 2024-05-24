// this is an array of the product we are displaying to users
let goods = [
  {
    image:
      "https://images.unsplash.com/photo-1613061527119-56ad37b8a581?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFza2V0fGVufDB8fDB8fHww",
    nameOfProduct: "Basket",
    price: 100,
    isLiked: false,
    quantity: 0,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664302318670-29dee41e85e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29ja3N8ZW58MHx8MHx8fDA%3D",
    nameOfProduct: "Socks",
    price: 20,
    isLiked: false,
    quantity: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    nameOfProduct: "Bag",
    price: 50,
    isLiked: false,
    quantity: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNha2V8ZW58MHx8MHx8fDA%3D",
    nameOfProduct: "Cake",
    price: 500,
    isLiked: false,
    quantity: 0,
  },
];

//get the container to append the data we are working with into
const cardContainer = document.getElementById("list-products");

//get the total div from html
const totalBody = document.querySelector(".total");

// updating total price
let sum = 0;
const updatePrice = () => {
  sum = goods.reduce(function (total, good) {
    return total + good.price * good.quantity;
  }, 0);

  totalBody.textContent = sum;
};

// adding plus button
const add = (good) => {
  good.quantity++;
  cardContainer.innerHTML = "";
  updatePrice();
  updateUi();
};

// adding minus button
const subtract = (good) => {
  if (good.quantity > 0) {
    good.quantity--;
    cardContainer.innerHTML = "";
    updatePrice();
    updateUi();
  }
};

// adding delete button
const deleteGood = (index) => {
  goods.splice(index, 1);
  cardContainer.innerHTML = "";
  updatePrice();
  updateUi();
};

//creating a function that updates the ui
function updateUi() {
  cardContainer.innerHTML = ""; // Clear the container before updating UI
  goods.forEach((good, index) => {
    const cardBody = document.createElement("div");

    cardBody.innerHTML = `
      <div class="card-body">
        <div class="card" style="width: 18rem">
          <img src=${good.image} class="card-img-top" alt="${good.nameOfProduct}" />
          <div class="card-body">
            <h5 class="card-title">${good.nameOfProduct}</h5>
            <p class="card-text">This is a ${good.nameOfProduct}</p>
            <h4 class="unit-price">${good.price} $</h4>
            <div>
              <i id="plus-${index}" class="fas fa-plus-circle"></i>
              <span class="quantity">${good.quantity}</span>
              <i id="minus-${index}" class="fas fa-minus-circle"></i>
            </div>
            <div>
              <i class="fas fa-trash-alt" id="delete-icon-${index}"></i>
              <i class="fas fa-heart" id="heart-icon-${index}"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    //plus and minus button for each items mapped
    const plus = cardBody.querySelector(`#plus-${index}`); //plus
    const minus = cardBody.querySelector(`#minus-${index}`); //minus
    const heart = cardBody.querySelector(`#heart-icon-${index}`); //heart
    const deleteIcon = cardBody.querySelector(`#delete-icon-${index}`); //delete

    // adding event listener to the plus, minus and delete buttons that calls the functions
    plus.addEventListener("click", () => add(good));
    minus.addEventListener("click", () => subtract(good));
    deleteIcon.addEventListener("click", () => deleteGood(index));
    
    //adding event listener that controls the like button 
    heart.addEventListener("click", () => {
        // toggle event
      good.isLiked = !good.isLiked;
      // using tenary operator
      heart.style.color = good.isLiked ? "red" : "black";

    });

    cardContainer.append(cardBody);
  });
}

//invoking the function that updates the UI
updateUi();


