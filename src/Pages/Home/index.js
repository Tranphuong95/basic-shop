import React from 'react';
import CardProduct from './../../Component/CardProduct/CardProduct';

const Home = (props) => {
    const onOpenModal = () => {
        document.getElementById('checkout-cart').style.display = "block";
    }
    return (
        <div>
            <section className="main-content">
                <div className="quan-ao">
                    <h1>Quần áo</h1>
                    <CardProduct onOpenModal={onOpenModal} />
                </div>
                <div className="giay-dep">

                </div>
                <div className="phu-kien">

                </div>
            </section>
        </div>
    );
}

export default Home;