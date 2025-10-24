const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
emailjs.init("uLHyBlFF7xm5hKewb"); // e.g. "bPQ6g_abcd12345"



document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const cartSummary = cartData.map(item => `${item.name} - ₹${item.price}`).join(", ");
  
  console.log(cartSummary);

  const params = {
    user_name: this.user_name.value,
    user_email: this.user_email.value,
    user_number: this.user_number.value,
    user_cart: cartSummary
  };

  emailjs.send("service_ag2t5pn", "template_vn9w4o4", params)
    .then(() => {
      let msg = document.querySelector("#sucessMsg")
      if (cart != "") {
        setTimeout(() => {
          msg.textContent = ''
        }, 3000)
        msg.textContent = "Order Placed"
      }
    })
    .catch(error => {
      let msg = document.querySelector("#sucessMsg")
      if (cart == "") {
        msg.textContent = `${error.text} - Cart is empty`
        setTimeout(() => {
          msg.textContent = ''
        }, 3000)
      }
    });
});
