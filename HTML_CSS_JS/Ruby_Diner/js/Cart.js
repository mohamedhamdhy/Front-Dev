document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    const buyNowButton = document.getElementById('buy-now');
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
  
    function updateTotalPrice() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let totalPrice = 0;
      cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
      });
      totalPriceElement.textContent = totalPrice.toFixed(2);
    }
  
    function renderCartItems() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartContainer.innerHTML = '';
  
      if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-white">No items in the cart. Please visit the menu to add items.</p>';
      } else {
        cartItems.forEach(item => {
          const itemTotalPrice = (item.price * item.quantity).toFixed(2);
          const itemElement = `
    <div class="cart-item text-center d-flex flex-column align-items-center justify-content-center">
      <img src="${item.image}" alt="${item.title}">
      <h5>${item.title}</h5>
      <p>Price: ${item.price}/=</p>
      <div class="quantity-controls d-flex align-items-center justify-content-center">
        <button class="btn btn-sm btn-secondary decrease-quantity" data-title="${item.title}">
          <i class="fas fa-minus"></i>
        </button>
        <span class="quantity mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-secondary increase-quantity" data-title="${item.title}">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <p>Total Price: ${itemTotalPrice}/=</p>
      <button class="btn btn-sm btn-danger remove-item" data-title="${item.title}">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `;
  
          cartContainer.innerHTML += itemElement;
        });
        addEventListeners();
      }
      updateTotalPrice();
    }
  
    function addEventListeners() {
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
          const title = this.getAttribute('data-title');
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          cartItems = cartItems.filter(item => item.title !== title);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          renderCartItems();
        });
      });
  
      document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
          const title = this.getAttribute('data-title');
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const item = cartItems.find(item => item.title === title);
          if (item && item.quantity > 1) {
            item.quantity -= 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
          }
        });
      });
  
      document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
          const title = this.getAttribute('data-title');
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const item = cartItems.find(item => item.title === title);
          if (item) {
            item.quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
          }
        });
      });
    }
  
    renderCartItems();
  
    buyNowButton.addEventListener('click', function() {
      const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
      if (selectedMethod === 'cash') {
        localStorage.removeItem('cartItems');
        renderCartItems();
      }
    });
  });
  