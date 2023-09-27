import React from 'react'
import { useState, useEffect } from 'react';
import './ProductList.css'

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      description: '',
      quantity: '',
    });
    const [editingIndex, setEditingIndex] = useState(-1);
  
    useEffect(() => {
      // Load products from localStorage when the component mounts.
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      setProducts(savedProducts);
    }, []);
  
    useEffect(() => {
      // Save products to localStorage whenever products change.
      localStorage.setItem('products', JSON.stringify(products));
    }, [products]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const addProduct = () => {
      if (editingIndex === -1) {
        const newProduct = { ...formData };
        setProducts([...products, newProduct]);
      } else {
        // Update an existing product
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = { ...formData };
        setProducts(updatedProducts);
        setEditingIndex(-1); // Reset editing index
      }
  
      // Clear the form data
      setFormData({
        name: '',
        price: '',
        description: '',
        quantity: '',
      });
    };
  
    const deleteProduct = (index) => {
      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
    };
  
    const editProduct = (index) => {
      const productToEdit = products[index];
      setFormData({ ...productToEdit });
      setEditingIndex(index);
    };
  
    return <>
      <div className='container'>
        <h1 className='d-flex justify-content-center align-items-center py-3 fs-1'>CRUD SYSTEM</h1>
        <table className='table-striped'>
          <thead >
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <button className=' btn btn-outline-danger  m-auto' onClick={() => deleteProduct(index)}><span>
                  <i class="fa-solid fa-trash-can px-1"></i>
                  Delete
                    </span></button>
                </td>
                <td>
                <button className=' btn  btn-outline-warning m-auto ' onClick={() => editProduct(index)}><span>
                <i class="fa-solid fa-pencil px-1"></i>
                Edit
                  </span> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>{editingIndex === -1 ? 'Add Product' : 'Edit Product'}</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <button type="button" className='btn  btn-outline-success ' onClick={addProduct}>
            {editingIndex === -1 ? 'Add' : 'Update'}
          </button>
        </form>
      </div>
      </>
}
