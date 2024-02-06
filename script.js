document.addEventListener("DOMContentLoaded", function () {
  let currentCategory = "Men";

  function showProducts(category) {
    currentCategory = category;
    document
      .querySelectorAll(".tab")
      .forEach((tab) => tab.classList.remove("active"));
    document
      .getElementById(`${category.toLowerCase()}Tab`)
      .classList.add("active");
    fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const products = data.categories.find(
          (cat) => cat.category_name === category
        ).category_products;
        const productCardsContainer = document.querySelector(".productCards");
        productCardsContainer.innerHTML = "";
        products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("productCard");
          const image = document.createElement("img");
          image.src = product.image;
          const badge = document.createElement("div");
          badge.classList.add("badge");
          badge.innerText = product.badge_text;
          const productDetails = document.createElement("div");
          productDetails.classList.add("productDetails");
          productDetails.innerHTML = `
                        <p class="productTitle" >${product.title}</p>
                        <p class="productvendor">    ${
                          product.vendor
                        }             </p>
                        <p>Price: ${product.price}</p>
                        <pclass="real-price">real-price${
                          product.compare_at_price
                        }</pclass=>
                        <p class="discount">Discount: ${calculateDiscount(
                          product.price,
                          product.compare_at_price
                        )}%</p>
                        <button class="addToCartButton">Add to Cart</button>
                    `;
          productCard.appendChild(image);
          productCard.appendChild(badge);
          productCard.appendChild(productDetails);
          productCardsContainer.appendChild(productCard);
        });
      });
  }

  function calculateDiscount(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
  }

  showProducts(currentCategory);

  document
    .getElementById("menTab")
    .addEventListener("click", () => showProducts("Men"));
  document
    .getElementById("womenTab")
    .addEventListener("click", () => showProducts("Women"));
  document
    .getElementById("kidsTab")
    .addEventListener("click", () => showProducts("Kids"));
});
