document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const addStockBtn = document.getElementById('add-stock-btn');
    const addStockForm = document.getElementById('add-stock-form');
    const closeFormBtn = document.getElementById('close-form-btn');
    const stockForm = document.getElementById('stock-form');
  
    let products = [];
  
    // Fetch initial products
    fetchProducts();
  
    function fetchProducts() {
      fetch('products.json')
        .then(response => response.json())
        .then(data => {
          products = data;
          renderProducts();
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  
    function renderProducts() {
      productList.innerHTML = '';
      products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div>${product.name}</div>
          <div>Quantity: ${product.quantity}</div>
          <div>Price: $${product.price}</div>
          <button class="sell-btn" data-id="${product.id}" ${product.quantity === 0 ? 'disabled' : ''}>Sell</button>
          ${product.quantity === 0 ? '<div class="out-of-stock">Out of Stock</div>' : ''}
        `;
        productList.appendChild(productItem);
      });
    }
  
    addStockBtn.addEventListener('click', function() {
      addStockForm.classList.remove('hidden');
    });
  
    closeFormBtn.addEventListener('click', function() {
      addStockForm.classList.add('hidden');
    });
  
    stockForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const image = document.getElementById('image').value;
      const quantity = parseInt(document.getElementById('quantity').value);
      const price = parseFloat(document.getElementById('price').value);
  
      const newProduct = {
        id: products.length + 1,
        name,
        image,
        quantity,
        price
      };
  
      products.push(newProduct);
      renderProducts();
      addStockForm.classList.add('hidden');
    });
  
    productList.addEventListener('click', function(event) {
      if (event.target.classList.contains('sell-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const productIndex = products.findIndex(product => product.id === productId);
        if (productIndex !== -1 && products[productIndex].quantity > 0) {
          products[productIndex].quantity -= 1;
          renderProducts();
          alert('Product sold successfully!');
        }
      }
    });
  });