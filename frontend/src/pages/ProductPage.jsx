import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";

export default function ProductPage() {
  const navigate = useNavigate();

  const productData = [
    {
      id: 1,
      name: "Chrome Tap",
      category: "Taps",
      price: 450,
      quantity: 0,
    },
    {
      id: 2,
      name: "Premium Steel Tap",
      category: "Taps",
      price: 650,
      quantity: 0,
    },
    {
      id: 3,
      name: "Rain Shower",
      category: "Showers",
      price: 1200,
      quantity: 0,
    },
    {
      id: 4,
      name: "Ultra Shower",
      category: "Showers",
      price: 1800,
      quantity: 0,
    },
    {
      id: 5,
      name: "Classic Basin",
      category: "Wash Basins",
      price: 2200,
      quantity: 0,
    },
    {
      id: 6,
      name: "Premium Basin",
      category: "Wash Basins",
      price: 3200,
      quantity: 0,
    },
    {
      id: 7,
      name: "Steel Drain Cover",
      category: "Drain Covers",
      price: 250,
      quantity: 0,
    },
    {
      id: 8,
      name: "Brass Drain Cover",
      price: 450,
      category: "Drain Covers",
      quantity: 0,
    },
  ];

  const [products, setProducts] = useState(productData);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    "Taps",
    "Showers",
    "Wash Basins",
    "Drain Covers",
  ];

  const increaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                product.quantity > 0
                  ? product.quantity - 1
                  : 0,
            }
          : product
      )
    );
  };

  const clearSelection = () => {
    setProducts((prev) =>
      prev.map((product) => ({
        ...product,
        quantity: 0,
      }))
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" ||
        product.category === selectedCategory) &&
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const selectedProducts = products.filter(
    (product) => product.quantity > 0
  );

  const totalItems = selectedProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const estimatedTotal = selectedProducts.reduce(
    (sum, product) =>
      sum + product.quantity * product.price,
    0
  );

  return (
    <div className="product-page">
      <h1>Select Products</h1>

      <input
        type="text"
        placeholder="Search Products..."
        className="buyer-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-btn active"
                : "category-btn"
            }
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <p className="product-price">
              ₹ {product.price}
            </p>

            <div className="quantity-controls">
              <button
                onClick={() =>
                  decreaseQuantity(product.id)
                }
              >
                -
              </button>

              <span>{product.quantity}</span>

              <button
                onClick={() =>
                  increaseQuantity(product.id)
                }
              >
                +
              </button>
            </div>

            <div className="product-actions">
              <button>History</button>
              <button>Manage</button>
            </div>
          </div>
        ))}

        <div className="product-card add-card">
          <h2>+</h2>
          <p>Add Product</p>

          <button>Add New</button>
        </div>
      </div>

      <div className="cart-summary">
        <h2>Selected Products</h2>

        <h3>Total Items : {totalItems}</h3>

        <h3>
          Estimated Total : ₹ {estimatedTotal}
        </h3>

        {selectedProducts.map((product) => (
          <p key={product.id}>
            {product.name} × {product.quantity}
          </p>
        ))}

        <div className="cart-actions">
          <button
            className="clear-btn"
            onClick={clearSelection}
          >
            Clear Selection
          </button>

          <button
            className="generate-btn"
            onClick={() =>
              navigate("/invoice", {
                state: {
                  products: selectedProducts,
                },
              })
            }
          >
            Generate Bill
          </button>
        </div>
      </div>
    </div>
  );
}