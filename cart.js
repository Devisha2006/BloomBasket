document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button[data-id]");


  buttons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const item = btn.closest(".item");
      if (!item) return;
      const imgPath = btn.getAttribute("data-img");
      const nameTag = item.querySelector("h3");
      const priceTag = item.querySelector("p");

      const name = nameTag ? nameTag.textContent.replace("Name:", "").trim() : `Item ${index + 1}`;
      const price = priceTag ? priceTag.textContent.replace("Price:", "").replace(/[^\d]/g, "").trim() : "0";

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price, img: imgPath});
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} added to cart ✅`);
    });
  });
});

// 🔹 Render cart table (only on cart.html)
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("cart.html")) {
    const cartBody = document.getElementById("cart-body");
    const finalTotal = document.getElementById("totalAmount");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateFinalTotal() {
      let totals = document.querySelectorAll(".total");
      let sum = 0;
      totals.forEach((t) => {
        sum += parseInt(t.textContent.toString().replace(/[^\d]/g, ""));
      });
      finalTotal.textContent = "Total Amount: " + sum + "/-";
    }

    function renderCart() {
      cartBody.innerHTML = "";


      cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td><img src="${item.img}" height="60" onerror="this.src='placeholder.jpg'" /></td>
          <td>${item.name}</td>
          <td class="price">${item.price}</td>
          <td><input type="number" class="quantity" value="1" min="1"/></td>
          <td class="total">${item.price}</td>
          <td><button class="remove-btn">X</button></td>
        `;

        row.querySelector(".quantity").addEventListener("input", function () {
          const qty = parseInt(this.value);
          const unitPrice = parseInt(item.price.toString().replace(/[^\d]/g, ""));
          const totalCell = row.querySelector(".total");
          totalCell.textContent = unitPrice * qty;
          updateFinalTotal();
        });

        row.querySelector(".remove-btn").addEventListener("click", function () {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });

        cartBody.appendChild(row);
      });

      updateFinalTotal();
    }

    renderCart();
  }
});
