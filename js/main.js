const cartWrapper = document.querySelector(".cart-wrapper");

function calTotal(){
  const cadItem = document.querySelectorAll(".cart-item")
  const totalPrice = document.querySelector(".total-price")
  
  totalPrice.innerHTML = "0"
  const deliverCost = document.querySelector(".delivery-cost")
  const deliveryBox = document.querySelector(".deliveryBox")
  const alert = document.querySelector(".alert-secondary")

  const dataCartEmpty = document.querySelector("[data-cart-empty]")

  let total = 0

  cadItem.forEach((item) => {
    let count = item.querySelector("[data-counter]")
    let price = item.querySelector(".price__currency")

    let priceTotal = parseInt(count.innerHTML) * parseInt(price.innerHTML)

    total = total + priceTotal
    console.log(priceTotal);
  });

  totalPrice.innerHTML = total

  if (totalPrice.innerHTML > 0) {
    alert.classList.add("none")
  } else {
    alert.classList.remove("none")
  }

  if (total<= 0) {
    deliveryBox.classList.add("none")
    dataCartEmpty.classList.remove("none")
  } else {
    dataCartEmpty.classList.add("none")
    deliveryBox.classList.remove("none")
  }

  if (total < 600) {
    deliverCost.innerHTML = "150 ₽"
    deliverCost.classList.remove("free")
  } else {
    deliverCost.innerHTML = "бесплатно"
    deliverCost.classList.add("free")
  }
}

window.addEventListener("click", (e) => {
  // console.log(e.target.dataset.action );

  //   counter start
  if (e.target.dataset.action == "plus") {
    let counterWrapper = e.target.closest(".counter-wrapper");

    let counter = counterWrapper.querySelector("[data-counter]");

    counter.innerHTML = ++counter.innerHTML;
    calTotal()
  }

  if (e.target.dataset.action == "minus") {
    let counterWrapper = e.target.closest(".counter-wrapper");

    let counter = counterWrapper.querySelector("[data-counter]");

    if (parseInt(counter.innerHTML) > 1) {
      counter.innerHTML = --counter.innerHTML;
    } else if(
      e.target.closest(".cart-wrapper") && 
      parseInt(counter.innerHTML) === 1
    ) {
      e.target.closest(".cart-item").remove()
    }
    calTotal()
  }

  //   counter end

  if (e.target.hasAttribute("data-cart")) {
    console.log("salom");

    let card = e.target.closest(".card");

    console.log(card);

    let productInfo = {
      id: card.dataset.id,
      img: card.querySelector("img").getAttribute("src"),
      title: card.querySelector("h4").innerHTML,
      dataInBox: card.querySelector("[data-items-in-box]").innerHTML,
      price: card.querySelector(".price__currency").innerHTML,
      weight: card.querySelector(".price__weight").innerHTML,
      count: card.querySelector("[data-counter]").innerHTML,
    };

    let iteIncard = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

    if (iteIncard) {
      let itemCound = iteIncard.querySelector("[data-counter]");
      itemCound.innerHTML =
        parseInt(itemCound.innerHTML) + parseInt(productInfo.count);
    } else {
      let htmlElem = `
       <div class="cart-item" data-id=${productInfo.id}>
      <div class="cart-item__top">
          <div class="cart-item__img">
              <img src=${productInfo.img} alt="" />
          </div>
          <div class="cart-item__desc">
              <div class="cart-item__title">${productInfo.title}</div>
              <div class="cart-item__weight">${productInfo.dataInBox} / ${productInfo.weight}</div>
              <div class="cart-item__details">
                  <div class="items items--small counter-wrapper">
                      <div class="items__control" data-action="minus"> - </div>
                        <div class="items__current" data-counter="">${productInfo.count}</div>
                        <div class="items__control" data-action="plus">+</div>
                      </div>
                      <div class="price">
                        <div class="price__currency">${productInfo.price}</div>
                      </div>
                    </div>
                    <!-- // cart-item__details -->
                  </div>
                </div>
              </div>
              `;
      cartWrapper.insertAdjacentHTML("beforeend", htmlElem);
    }

    card.querySelector("[data-counter]").innerHTML = "1";
    calTotal()
  }
   
  
});
