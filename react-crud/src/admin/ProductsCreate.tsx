import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from './Wrapper';

const ProductsCreate = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(title, image)

    await fetch('http://localhost:8000/api/products', {
      method: 'POST',
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
            onChange={e => setTitle(e.target.value)}
          ></input>
        </div>
        <div className='form-group'>
          <label>Image</label>
          <input type="text" className="form-control" name="image"
            onChange={e => setImage(e.target.value)}
          ></input>
        </div>
        <button className="button button-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
}

export default ProductsCreate;