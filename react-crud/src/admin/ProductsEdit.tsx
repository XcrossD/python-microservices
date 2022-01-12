import React, { PropsWithRef, SyntheticEvent, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Product } from '../interfaces/Product';
import Wrapper from './Wrapper';

const ProductsEdit = (props: PropsWithRef<any>) => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [redirect, setRedirect] = useState(false)
  const params = useParams();

  useEffect(() => {
    (
     async () => {
       const response = await fetch(`http://localhost:8000/api/products/${params.id}`)
       const product: Product = await response.json()
       console.log(product)
       setTitle(product.title)
       setImage(product.image)
     }
    )();
  }, [])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(title, image)

    await fetch(`http://localhost:8000/api/products/${params.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title,
        image,
      })
    })

    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to='/admin/products' />
  }
  
  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className='form-group'>
          <label>Title</label>
          <input type="text" className="form-control" name="title"
            defaultValue={title}
            onChange={e => setTitle(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label>Image</label>
          <input type="text" className="form-control" name="image"
            defaultValue={image}
            onChange={e => setImage(e.target.value)}
          ></input>
        </div>
        <button className="button button-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
}

export default ProductsEdit;