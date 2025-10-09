let cart = []
let total = 0

const button = document.querySelectorAll(".btn-to-cart")

button.forEach(button => {
  let cartItem = button.closest(".cart-item")
  let itemName = cartItem.querySelector(".item-name").textContent.slice(0, 20)
  if (itemName.length >= 20) {
    itemName = itemName.slice(0, 20).concat("...")
  }
  let itemPrice = parseInt(cartItem.querySelector(".item-price").textContent)


  button.addEventListener("click", () => {


    if (button.classList.contains("add")) {
      cart.push({ name: itemName, price: itemPrice });
      total += itemPrice

      button.innerHTML = `Remove item <ion-icon name="remove-circle-outline"></ion-icon>`
      button.classList.add("remove")
      button.classList.remove("add")

    } else {
      cart = cart.filter(item => item.name !== itemName);
      total -= itemPrice;

      button.innerHTML = `Add item <ion-icon name= "add-circle-outline"></ion-icon>`
      button.classList.add("add")
      button.classList.remove("remove")
    }


    let input = document.querySelectorAll("input")
    input.forEach(input => {
      if (cart == "") {
        input.disabled = true
      } else {
        input.disabled = false
      }
    })


    let hideItem = document.getElementById("hide-item")
    if (cart == "") {
      hideItem.style.display = "flex"
    }else{
      hideItem.style.display = "none"
    }

    renderList()
  })

})

function renderList() {
  let cartList = document.querySelector("#cart-body")
  cartList.textContent = ""

  cart.forEach((item, index) => {
    let wholeItem = `
    <tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
    </tr>`
    cartList.innerHTML += wholeItem
  })
  document.querySelector(".total-price-title").textContent = total
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
  let msg = document.querySelector("#sucessMsg")
  if (cart == "") {
    msg.textContent = `Cart is Empty!`
    setTimeout(() => {
      msg.textContent = ''
    }, 3000)
  } else {
    setTimeout(() => {
      msg.textContent = ''
    }, 3000)
    msg.textContent = "Order Placed"
  }

})