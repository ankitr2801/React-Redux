import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useValue } from "../../Context/Product.Context";
import { useNavigate } from "react-router-dom";

function Home() {
  const {
    products,
    handleAddtoCart,
    setProducts,
    priceFilter,
    handlePriceChange,
    checkboxes,
    handleCheckboxChange,
  } = useValue();

  const navigate = useNavigate();

  // console.log(checkboxes);

  useEffect(() => {
    fetchProducts();
  }, [priceFilter, checkboxes]);

  const fetchProducts = async () => {
    let apiUrl = "https://fakestoreapi.com/products";

    const selectedCategories = Object.keys(checkboxes).filter(
      (key) => key !== "SelectAll" && checkboxes[key]
    );

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      let filteredProducts = data;
      if (selectedCategories.length > 0) {
        filteredProducts = data.filter(
          (product) =>
            selectedCategories.includes(product.category.toLowerCase()) ||
            (product.category.toLowerCase() === "men's clothing" &&
              checkboxes.men) ||
            (product.category.toLowerCase() === "women's clothing" &&
              checkboxes.women)
        );
      }
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= priceFilter
      );
      console.log(filteredProducts);

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCart = async (product) => {
    console.log(product);
    const status = await handleAddtoCart(product);
    console.log(status);
    if (status) {
      navigate("/");
    } else {
      navigate("/SignIn");
    }
  };

  return (
    <div className={styles.Container}>
      <aside>
        <div className={styles.aside_Container}>
          <h1 className={styles.filter_icon}>
            <i className="fa-solid fa-filter"></i>
            <span>Filter</span>
          </h1>
          <h2>Price : {priceFilter}</h2>
          <input
            type="range"
            className={styles.range}
            value={priceFilter}
            onChange={handlePriceChange}
            min="0"
            max="2000"
          />
          <h3>Category</h3>
          <div className={styles.filter_colthes}>
            <div className={styles.inputs}>
              <input
                type="checkbox"
                className={styles.checkBox}
                name="SelectAll"
                checked={checkboxes.SelectAll}
                onChange={handleCheckboxChange}
              />
              <label className={styles.filterTitle}> Select All </label>
            </div>
            <div className={styles.inputs}>
              <input
                type="checkbox"
                className={styles.checkBox}
                name="men"
                checked={checkboxes.men}
                onChange={handleCheckboxChange}
              />
              <label className={styles.filterTitle}>Men's Clothing </label>
            </div>
            <div className={styles.inputs}>
              <input
                type="checkbox"
                className={styles.checkBox}
                name="women"
                checked={checkboxes.women}
                onChange={handleCheckboxChange}
              />
              <label className={styles.filterTitle}>Women's Clothing </label>
            </div>
            <div className={styles.inputs}>
              <input
                type="checkbox"
                className={styles.checkBox}
                name="jewelery"
                checked={checkboxes.jewelery}
                onChange={handleCheckboxChange}
              />
              <label className={styles.filterTitle}>Jewelery</label>
            </div>
            <div className={styles.inputs}>
              <input
                type="checkbox"
                className={styles.checkBox}
                name="electronics"
                checked={checkboxes.electronics}
                onChange={handleCheckboxChange}
              />
              <label className={styles.filterTitle}>Electronics</label>
            </div>
          </div>
        </div>
      </aside>
      <main>
        <div className={styles.main_Container}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img
                src={product.image}
                alt={product.title}
                className={styles.img}
              />
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.price}>&#8377; {product.price}</p>
              <button
                className={styles.addbutton}
                onClick={() => handleCart(product)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
