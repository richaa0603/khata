import { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

export default function ProductPage() {
  const navigate = useNavigate();
  const { buyerId } = useParams();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    loadProducts();
  }, [buyerId]);

  const loadProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5228/api/pricing/buyer/${buyerId}/all-products`
      );

      const formattedProducts =
        response.data.map((product) => ({
          id: product.id,
          name: product.productName,
          price: product.price,
          quantity: 0,
          category: product.category || "",
        }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error(
        "Failed to load buyer pricing:",
        error
      );
    }
  };

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
        product.category ===
          selectedCategory) &&
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const selectedProducts = products.filter(
    (product) => product.quantity > 0
  );

  const totalItems = selectedProducts.reduce(
    (sum, product) =>
      sum + product.quantity,
    0
  );

  const estimatedTotal =
    selectedProducts.reduce(
      (sum, product) =>
        sum +
        product.quantity *
          Number(product.price),
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
        onChange={(e) =>
          setSearch(e.target.value)
        }
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
          <div
            className="product-card"
            key={product.id}
          >
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

              <span>
                {product.quantity}
              </span>

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

        <h3>
          Total Items : {totalItems}
        </h3>

        <h3>
          Estimated Total : ₹{" "}
          {estimatedTotal}
        </h3>

        {selectedProducts.map((product) => (
          <p key={product.id}>
            {product.name} ×{" "}
            {product.quantity}
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
                  buyerId,
                  products:
                    selectedProducts,
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