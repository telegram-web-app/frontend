// Массив с товарами
const products = [
    {
      title: "Burger",
      image: "/images/burger.png",
      description: "Cool burger",
      price: 50,
      quantity: 0
    },
    {
      title: "Doner",
      image: "/images/doner.png",
      description: "Awesome doner",
      price: 80,
      quantity: 0
    },
    {
      title: "Fries",
      image: "/images/fries.png",
      description: "Tasty fries",
      price: 80,
      quantity: 0
    },
  ];
  
  // Массив для хранения выбранных товаров
  const selectedProducts = [];
  
  // Функция для создания HTML-кода карточки товара без кнопок "+" и "-"
  function createProductCard(product) {
    return `
      <div class="card w-96 bg-base-100 my-2 shadow-xl">
        <figure><img src="${product.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${product.title}</h2>
          <p>${product.description}</p>
          <p>$ ${product.price}</p>
          <div class="card-actions items-center justify-end">
            <button class="btn btn-primary btn-buy">Buy Now</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Получаем ссылку на элемент "items"
  const itemsContainer = document.getElementById("items");
  
  // Генерация карточек для каждого товара и добавление их в элемент "items"
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productCard = createProductCard(product);
    itemsContainer.innerHTML += productCard;
  }
  
  // Ссылка на кнопку "Оформить заказ"
  let orderButton = null;
  
  // Обработчик события для кнопки "Buy Now"
  itemsContainer.addEventListener("click", (event) => {
    const target = event.target;
  
    if (target.classList.contains("btn-buy")) {
      const parent = target.closest(".card");
  
      const quantityElement = document.createElement("span");
      quantityElement.classList.add("quantity");
      quantityElement.textContent = "1"; // Значение по умолчанию - 1
  
      const incrementButton = document.createElement("button");
      incrementButton.classList.add("btn", "btn-increment");
      incrementButton.textContent = "+";
  
      const decrementButton = document.createElement("button");
      decrementButton.classList.add("btn", "btn-decrement");
      decrementButton.textContent = "-";
  
      const cardActions = parent.querySelector(".card-actions");
      cardActions.appendChild(incrementButton);
      cardActions.appendChild(quantityElement);
      cardActions.appendChild(decrementButton);
  
      target.disabled = true;
  
      const cardTitle = parent.querySelector(".card-title").textContent;
      const product = products.find((p) => p.title === cardTitle);
      product.quantity = 1; // Значение по умолчанию - 1
      selectedProducts.push(product); // Добавляем выбранный товар в массив selectedProducts
  
      // Проверяем, если кнопка "Оформить заказ" еще не существует
      if (!orderButton) {
        orderButton = document.createElement("button");
        orderButton.classList.add("btn", "btn-order");
        orderButton.textContent = "Оформить заказ";
        itemsContainer.appendChild(orderButton);
      }
  
      // Проверяем, есть ли товары с количеством равным 0
      const productsWithZeroQuantity = selectedProducts.filter(
        (product) => product.quantity === 0
      );
  
      if (productsWithZeroQuantity.length > 0) {
        orderButton.style.display = "none";
      } else {
        orderButton.style.display = "block";
      }
    }
  });
  
  // Обработчик события для кнопок "+" и "-"
  itemsContainer.addEventListener("click", (event) => {
    const target = event.target;
  
    if (target.classList.contains("btn-increment")) {
      const quantityElement = target.parentNode.querySelector(".quantity");
      const cardTitle = target.closest(".card").querySelector(".card-title").textContent;
  
      const product = products.find((p) => p.title === cardTitle);
      product.quantity += 1;
      quantityElement.textContent = product.quantity;
  
      if (product.quantity > 0) {
        orderButton.style.display = "block";
      }
    } else if (target.classList.contains("btn-decrement")) {
      const quantityElement = target.parentNode.querySelector(".quantity");
      const cardTitle = target.closest(".card").querySelector(".card-title").textContent;
  
      const product = products.find((p) => p.title === cardTitle);
      if (product.quantity > 0) {
        product.quantity -= 1;
        quantityElement.textContent = product.quantity;
      }
  
      if (product.quantity === 0) {
        const productsWithNonZeroQuantity = selectedProducts.filter(
          (product) => product.quantity > 0
        );
  
        if (productsWithNonZeroQuantity.length === 0) {
          orderButton.style.display = "none";
        }
      }
    }
  });
  
  // Обработчик события для кнопки "Оформить заказ"
  itemsContainer.addEventListener("click", (event) => {
    const target = event.target;
  
    if (target.classList.contains("btn-order")) {
      if (selectedProducts.length > 0) {
        displaySelectedProducts();
      }
    }
  });
  
  // Функция для преобразования массива выбранных товаров в JSON и вывода в консоль
  function displaySelectedProducts() {
    const json = JSON.stringify(selectedProducts, null, 2);
    console.log(json);
  }
  
  // Функция для очистки выбранных товаров
  function clearSelectedProducts() {
    selectedProducts.length = 0;
    if (orderButton) {
      orderButton.style.display = "none";
    }
  }
  
  // Обновленная функция для отображения выбранных товаров в консоли
  function updateSelectedProducts() {
    if (selectedProducts.length > 0) {
      console.log("Выбранные товары:");
      displaySelectedProducts();
    } else {
      console.log("Нет выбранных товаров.");
    }
  }
  
  // Вызов функции для отображения выбранных товаров в консоли
  updateSelectedProducts();
  