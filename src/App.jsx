
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Essential Black Tee",
    price: 799,
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    id: 2,
    name: "Classic White Tee",
    price: 699,
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600",
  },
  {
    id: 3,
    name: "Streetwear Hoodie",
    price: 1499,
    category: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  },
  {
    id: 4,
    name: "Everyday Sweatshirt",
    price: 1299,
    category: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463011f3",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function changeQuantity(id, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="brand">
          MANSCRIPT<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
        </div>

        <button
          className="cart-btn"
          onClick={() => setShowCart(!showCart)}
        >
          Cart ({cartCount})
        </button>
      </nav>

      {/* Hero section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">NEW COLLECTION 2026</p>

          <h1>
            WEAR YOUR
            <br />
            OWN STORY.
          </h1>

          <p className="hero-description">
            Everyday essentials. Uncompromising style.
          </p>

          <a className="shop-btn" href="#shop">
            SHOP COLLECTION →
          </a>
        </div>
      </section>

      {/* Product section */}
      <section className="shop" id="shop">
        <p className="tagline">MADE FOR EVERYDAY</p>
        <h2>Our Collection</h2>

        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="filters">
          {["All", "T-Shirts", "Hoodies"].map((item) => (
            <button
              key={item}
              className={
                category === item ? "active-filter" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="products">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>
              <p>₹{product.price.toLocaleString("en-IN")}</p>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="no-products">
            No products found. Try another search.
          </p>
        )}
      </section>

      {/* Shopping cart */}
      {showCart && (
        <section className="cart-section" id="cart">
          <div className="cart-heading">
            <h2>Your Shopping Cart</h2>

            <button
              className="close-cart"
              onClick={() => setShowCart(false)}
            >
              Close ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty. Explore our collection!
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-details">
                    <strong>{item.name}</strong>

                    <p>
                      ₹{item.price.toLocaleString("en-IN")} ×{" "}
                      {item.quantity}
                    </p>

                    <p className="item-subtotal">
                      Subtotal: ₹
                      {(item.price * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => changeQuantity(item.id, -1)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => changeQuantity(item.id, 1)}
                    >
                      +
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-summary">
                <h3>
                  Total: ₹{totalPrice.toLocaleString("en-IN")}
                </h3>

                <button className="clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* Footer */}
      <footer id="about">
        <h2>MANSCRIPT.</h2>
        <p>Simple clothing. Individual style.</p>
        <p>© 2026 MANSCRIPT. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
