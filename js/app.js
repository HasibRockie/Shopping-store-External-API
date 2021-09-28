const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
   
    div.innerHTML = `
    <div class="single-product">
      <div class="image-div">
        <img class="product-image" src=${image}></img>
      </div>
      <div class="single-product-details">
        <h5>${product.title}</h3>
        <hr>
        <p>Category: ${product.category}</p>
        <hr>

        <div class="rating">
          <div class="rate-count"><p>Ratings: ${product.rating.rate}</p></div>
          <div class="rate-count"><p>Count: ${product.rating.count} People</p></div>
        </div>
        
        <hr>
        <h5>Price: $ ${product.price}</h2>
        <hr>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" class="btn btn-danger" data-toggle="modal" onclick="showDetails(${product.id})" data-target="#exampleModal">Details</button></div>
      </div>
    </div>

      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

updateTotal()

// handle details
const showDetails = (productId) =>{
  const singleUrl = `https://fakestoreapi.com/products/${productId}`;
  fetch(singleUrl)
    .then(res => res.json())
    .then(data => showPopUp(data));


  const showPopUp = (product) => {
    const div2 = document.createElement("div");
    const content = `
      
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${product.title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>${product.description}</p>
            <p>${product.category}</p>
            <p>Rating:${product.rating.rate}</p>
            <p>${product.rating.count} people rated this product</p>
            
          </div>
          <div class="modal-footer">
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;
    div2.innerHTML = content;
    document.getElementById("exampleModal").appendChild(div2);
  }
}
