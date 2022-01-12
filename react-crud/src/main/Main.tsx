import React, { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product';

const Main = () => {
  const [products, setProducts] = useState([] as Product[])

  useEffect(() => {
    (
     async () => {
       const response = await fetch('http://localhost:8000/api/products');
       const data = await response.json();
       setProducts(data)
     }
    )();
  }, [])

  const like = async (id: number) => {
    const response = await fetch(`http://localhost:8001/api/products/${id}/like`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })
    const status = await response.status
    if (status != 400) {
      setProducts(products.map((p: Product) => {
        if (p.id == id) {
          p.likes += 1;
        }
        return p
      }))
    } else {
      alert('You have already liked this product!')
    }
  };
  
  return (
    <main>
      <div className="album py-5 bg-light">
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {products.map((p: Product) => {
              return (
                <div className="col" key={p.id}>
                  <div className="card shadow-sm">
                    <img src={p.image} height="180" />
                    <div className="card-body">
                      <p className="card-text">{p.title}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary"
                            onClick={() => {like(p.id)}}
                          >Like</button>
                        </div>
                        <small className="text-muted">{p.likes + ` ${p.likes > 1 ? 'likes' : 'like'}`}</small>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </main>
  );
}

export default Main;