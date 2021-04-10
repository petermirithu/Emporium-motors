// Scrolling Effect
$(window).on("scroll", function () {
      if ($(window).scrollTop()) {
            $('nav').addClass('black');
      }

      else {
            $('nav').removeClass('black');
      }
})

// cart system
var shoppingCart = (function () {
      cart = [];

      function Item(name, price, count,img) {
            this.name = name;
            this.price = price;
            this.img=img;
            this.count = count;
      }

      function saveCart() {
            sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
      }

      function loadCart() {
            cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
      }
      if (sessionStorage.getItem("shoppingCart") != null) {
            loadCart();
      }

      var obj = {};

      obj.addItemToCart = function (name, price, count, img) {
            for (var item in cart) {
                  if (cart[item].name === name) {
                        cart[item].count++;
                        saveCart();
                        return;
                  }
            }
            var item = new Item(name, price, count, img);
            cart.push(item);
            saveCart();
      }

      obj.setCountForItem = function (name, count, img) {
            for (var i in cart) {
                  if (cart[i].name === name) {
                        cart[i].count = count;
                        break;
                  }
            }
      };

      obj.removeItemFromCart = function (name) {
            for (var item in cart) {
                  if (cart[item].name === name) {
                        cart[item].count--;
                        if (cart[item].count === 0) {
                              cart.splice(item, 1);
                        }
                        break;
                  }
            }
            saveCart();
      }

      obj.removeItemFromCartAll = function (name) {
            for (var item in cart) {
                  if (cart[item].name === name) {
                        cart.splice(item, 1);
                        break;
                  }
            }
            saveCart();
      }

      obj.clearCart = function () {
            cart = [];
            saveCart();
      }

      obj.totalCount = function () {
            var totalCount = 0;
            for (var item in cart) {
                  totalCount += cart[item].count;
            }
            return totalCount;
      }

      obj.totalCart = function () {
            var totalCart = 0;
            for (var item in cart) {
                  totalCart += cart[item].price * cart[item].count;
            }
            return Number(totalCart.toFixed(2));
      }

      obj.listCart = function () {
            var cartCopy = [];
            for (i in cart) {
                  item = cart[i];
                  itemCopy = {};
                  for (p in item) {
                        itemCopy[p] = item[p];

                  }
                  itemCopy.total = Number(item.price * item.count).toFixed(2);
                  cartCopy.push(itemCopy)
            }
            return cartCopy;
      }
      return obj;
})();

$('.add-to-cart').click(function (event) {
      event.preventDefault();
      var name = $(this).data('name');
      var price = Number($(this).data('price'));
      var img = $(this).data('img');
      shoppingCart.addItemToCart(name, price, 1, img);
      alert("Successfully added item "+name+" to cart")
      displayCart();
});

$('.clear-cart').click(function () {
      shoppingCart.clearCart();
      displayCart();
});


function displayCart() {
      var cartArray = shoppingCart.listCart();
      var output = "";
      for (var i in cartArray) {            
        
            output += "<tr>"
                  + "<td><img src='"+ cartArray[i].img + "' width='60px' style='border-radius:20px;' alt=''></td>"            
                  + "<td style='width: 150px;overflow-wrap: anywhere;'>" + cartArray[i].name + "</td>"
                  + "<td>ksh " + cartArray[i].price + "</td>"
                  + "<td><div class='input-group'><div class='minus-item' data-name=" + cartArray[i].name + ">-</div>"
                  + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
                  + "<div class='plus-item' data-name=" + cartArray[i].name + ">+</div></div></td>"
                  + "<td><span class='delete-item close' data-name=" + cartArray[i].name +">&#10005;</span>"                                    
                  + "<td>ksh " + cartArray[i].total + "</td>"
                  + "</tr>";
      }
      $('.show-cart').html(output);
      $('.total-cart').html(shoppingCart.totalCart());
      $('.total-count').html(shoppingCart.totalCount());
      if(shoppingCart.totalCart()==0){
            $('.order').hide()
      }
      else{
            $('.order').show()
      }
      displayItems();
};

function displayItems(){
      var cartArray = shoppingCart.listCart();
      var output = "";
      for (var i in cartArray) {
            output += "<tr>"
                  + "<td class='border-0'><img src='"+ cartArray[i].img + "' width='60px' style='border-radius:20px;' alt=''></td>"            
                  + "<td class='border-0'>" + cartArray[i].name + "</td>"                  
                  + "<td class='border-0'>" + cartArray[i].count + "</td>"                                    
                  + "<td class='border-0'>" + cartArray[i].total + "</td>"                                                      
                  + "</tr>";
      }
      var final_total=0
      if(shoppingCart.totalCart()>0){
            final_total=5000+shoppingCart.totalCart()
      }
      $('.ordered-items').html(output);
      $('.total-cart').html("ksh "+shoppingCart.totalCart());
      $('.total-order').html("ksh "+final_total)
      $('.total-count').html(shoppingCart.totalCount());

}

$('.show-cart').on("click", ".delete-item", function (event) {
      var name = $(this).data('name')            
      shoppingCart.removeItemFromCartAll(name);
      displayCart();
})

$('.show-cart').on("click", ".minus-item", function (event) {
      var name = $(this).data('name')
      shoppingCart.removeItemFromCart(name);
      displayCart();
})

$('.show-cart').on("click", ".plus-item", function (event) {
      var name = $(this).data('name')
      shoppingCart.addItemToCart(name);
      displayCart();
})

$('.show-cart').on("change", ".item-count", function (event) {
      var name = $(this).data('name');
      var count = Number($(this).val());
      shoppingCart.setCountForItem(name, count);
      displayCart();
});

displayCart();
displayItems();

$('.submit').on("click", function (event){
      event.preventDefault();
      var name=$('#name').val()
      var email=$('#email').val()
      var subject=$('#subject').val()
      var message=$('#message').val()
      if (name.length==0 || email.length==0 || subject.length==0 || message.length==0){
            alert("Please fill in all the required field")
            return
      }
      alert("Successfully submitted your response. We will get back to you later.")
})

$('.pay').on('click', function (event){
      event.preventDefault()
      alert("Successfully made a purchase. We shall get back to you soon")
      shoppingCart.clearCart();
      displayCart();            
      window.location.href = "https://petermirithu.github.io/Emporium-motors";
})
