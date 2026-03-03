let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, qtyId){
  let qty = parseInt(document.getElementById(qtyId).value);
  if(qty <= 0){
    alert("Quantity must be at least 1");
    return;
  }

  cart.push({name, price, qty});
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(name + " added to cart!");
}

function loadCart(){
  let cartDiv = document.getElementById("cartItems");
  let total = 0;
  cartDiv.innerHTML = "";

  if(cart.length === 0){
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("total").innerText = "Total: ₹0";
    return;
  }

  cart.forEach(item=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    cartDiv.innerHTML += `
      <p>${item.name} x ${item.qty} = ₹${itemTotal}</p>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function placeOrder(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  let message = "New Royal Bakery Order:%0A";
  let total = 0;

  cart.forEach(item=>{
    let itemTotal = item.price * item.qty;
    total += itemTotal;
    message += `${item.name} x ${item.qty} = ₹${itemTotal}%0A`;
  });

  message += `%0ATotal: ₹${total}`;

  alert("Order Successfully Placed!");

  window.open(`https://wa.me/91962734907?text=${message}`, "_blank");

  cart = [];
  localStorage.removeItem("cart");
}
