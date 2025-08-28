import { useState } from 'react';
import './Shop.css';
import Ferrari_jacket from '../../assets/Ferrari_jacket.png';
import Purple_sweat_shirt from '../../assets/Purple_sweat_shirt.png';
import jOCK from '../../assets/jOCK.png';
import Orange_front from '../../assets/Orange_front.png';
import Sweat_hoodie from '../../assets/Sweat_hoodie.png';
import CH from '../../assets/CH.png';
import js from '../../assets/js.png';
import CL from '../../assets/CL.png';
import CH_Beanie from '../../assets/CH_Beanie.png';

const products = [
    { id: 1, name: 'Ferrari Jacket', price: 74, image: `${Ferrari_jacket}` },
    { id: 2, name: 'Sweat Shirt', price: 74, image: `${Purple_sweat_shirt}` },
    { id: 3, name: 'College Jacket', price: 70, image: `${jOCK}` },
    { id: 4, name: 'Old School Long Sleeve', price: 74, image: `${Orange_front}` },
    { id: 5, name: 'Sweater', price: 84, image: `${Sweat_hoodie}` },
    { id: 6, name: 'Thrifts Hoodie', price: 65, image: `${CH}` },
    { id: 7, name: 'Old Money Jacket', price: 90, image: `${js}` },
    { id: 8, name: 'Luxury Bag', price: 120, image: `${CL}` },
    { id: 9, name: 'Trendy Sunglasses', price: 40, image: `${CH_Beanie}` },
];

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="shop-container">
            <aside className='filters-sidebar'>
                <div className="filter-group">
                    <h3>Categories</h3>
                    <div className="filter-option"><label><input type="checkbox" /> Thrifts</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Old Money</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Labels</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Sports Gear</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Shoes</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Jewelry</label></div>
                </div>

                <div className="filter-group">
                    <h3>Brand</h3>
                    <div className="filter-option"><label><input type="checkbox" /> Chrome Hearts</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Nike</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Polo</label></div>
                    <div className="filter-option"><label><input type="checkbox" /> Adidas</label></div>
                </div>
            </aside>

            <main className="main-content">
                <section className='products-grid'>
                    {currentProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h4>{product.name}</h4>
                                <p>KSH {product.price}.00</p>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Shop;