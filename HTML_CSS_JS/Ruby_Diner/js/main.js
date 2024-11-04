











(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);






/*Start Add To Cart */
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to all "Add To Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            // Get item details
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const img = this.getAttribute('data-img');

            // Create cart item object
            const item = {
                name: name,
                price: price,
                img: img,
                quantity: 1
            };

            // Get current cart from localStorage or initialize empty array
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item is already in the cart
            const existingItemIndex = cart.findIndex(cartItem => cartItem.name === name);
            if (existingItemIndex !== -1) {
                // Item is already in cart, update quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                cart.push(item);
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Optionally show an alert or update UI
            alert('Item added to cart!');
        });
    });


  // Function to update the cart in localStorage
  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
  }

  // Function to display cart items
  function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    if (cart.length > 0) {
      cart.forEach((item, index) => {
const itemElement = `
    <div class="cart-item mb-3">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img img-thumbnail" style="width: 100px;" />
        <h2>${item.name}</h2>
        <p>Price: ${item.price}/-</p>
        <p>Quantity: 
            <button class="btn btn-sm btn-secondary decrease-quantity" data-index="${index}">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-sm btn-secondary increase-quantity" data-index="${index}">+</button>
        </p>
        <p>Total: ${item.price * item.quantity}/-</p>
        <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
    </div>
`;

        cartItemsContainer.innerHTML += itemElement;
      });

      // Attach event listeners to the buttons
      attachEventListeners();
    } else {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    }
  }

  // Function to attach event listeners to increase, decrease, and remove buttons
  function attachEventListeners() {
    document.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        cart[index].quantity += 1;
        updateCart();
      });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1); // Remove item if quantity is 1 and decrease is clicked
        }
        updateCart();
      });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        cart.splice(index, 1); // Remove item from cart
        updateCart();
      });
    });
  }

  // Initial call to display cart items
  displayCartItems();
});


/*End Add To Cart*/