import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useAlert } from 'react-alert'

import {getCategories} from '../../actions/categoryAction'
import {clearErrors,updateProduct,getProductDetails} from '../../actions/productAction'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'

import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'

import styled from 'styled-components'
import { Button } from '@material-ui/core'
import {AccountTree,Description,Storage,Spellcheck,AttachMoney} from '@material-ui/icons'


const Container = styled.div` 
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
position:absolute;
`

const UpdateProductContainer = styled.div` 
width:100%;
box-sizing:border-box;
background-color: rgb(221,221,221);
border-left: 1px solid rgba(0,0,0,0.158);
display:flex;
flex-direction:column;
height:100vh;
`

const UpdateProductForm = styled.form` 
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 3vmax;
  justify-content: space-evenly;
  height: 70%;
  width: 40vh;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.267);
`

const UpdateProductFormItem = styled.div`
display: flex;
width: 100%;
align-items: center;

>input,>select,>textarea{
  padding:1vmax 4vmax;
  padding-right:1vmax;
  width:100%;
  box-sizing:border-box;
  border:1px solid rgba(0,0,0,0.267);
  border-radius:4px;
  font:300 0.9vmax;
  outline:none;
};

>svg{
  position: absolute;
  transform: translateX(1vmax);
  font-size: 1.6vmax;
  color: rgba(0, 0, 0, 0.623);
}
`

const UpdateProductFormHeader = styled.h1`color:rgba(0,0,0,0.733);
font:300 2rem;
text-align:center;`

const UpdateProductFormFile = styled.div`
display: flex;
width: 100%;
align-items: center;
>input{
  display:flex;
  padding:0%;
}
`

const UpdateProductFormImage = styled.div`
display: flex;
align-items: center;
width: 100%;
overflow: auto;
>img{
  width:3vmax;
  margin:0 0.5vmax;
}
`

const FormButton = styled.button` 
  border: none;
  background-color: tomato;
  color: white;
  font: 300 0.9vmax;
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 4px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
`

const UpdateProduct = ({history,match}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error,product} = useSelector((state) => state.productDetails)
  const {loading,error:updateError,isUpdated} = useSelector((state) => state.product)

  const [name,setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const {categories} = useSelector((state) => state.categories);

  const productId = match.params.id;

  useEffect(() => {
    if(product && product._id !== productId)
    {
      dispatch(getProductDetails(productId))
    }else{
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if(error)
    {
      alert.error(error);
      dispatch(clearErrors())
    }

    if(updateError)
    {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if(isUpdated)
    {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    dispatch(getCategories());
  },[dispatch,error,alert,history,isUpdated,productId,product,updateError])


  const updateProductHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images",image)
    })

    dispatch(updateProduct(productId,myForm))
  }

  const updateProductImages = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2)
        {
          setImagesPreview((old) => [...old,reader.result]);
          setImages((old) => [...old,reader.result])
        }
      }

      reader.readAsDataURL(file);
    })
  }

  return (
    <>
    <MetaData title={`Update Product - Admin`}/>
    <Header/>
    
    <Container>
      <Sidebar/>
      <UpdateProductContainer>
        <UpdateProductForm encType="multipart/form-data" onSubmit={updateProductHandler}>
         <UpdateProductFormHeader>Update Product</UpdateProductFormHeader>
         <UpdateProductFormItem>
           <Spellcheck/>
           <input type="text" placeholder="Product Name" required value={name} onChange={(e) => setName(e.target.value)}/>
         </UpdateProductFormItem>
         <UpdateProductFormItem>
           <AttachMoney/>
           <input type="number" placeholder="Price" required value={price} onChange={(e) => setPrice(e.target.value)}/>
         </UpdateProductFormItem>
         <UpdateProductFormItem>
           <Description/>
           <textarea type="text" placeholder="Product Description" required value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="1"/>
         </UpdateProductFormItem>
         <UpdateProductFormItem>
           <AccountTree/>
           <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {
                categories.map((cat) => (
                  <option key={cat.cat} value={cat.cat}>
                    {cat.title}
                  </option>
                ))
              }
           </select>
         </UpdateProductFormItem>
         <UpdateProductFormItem>
         <Storage/>
              <input
                type="number"
                placeholder="stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
         </UpdateProductFormItem>
         <UpdateProductFormFile>
          <input type="file" name="avatar" accept="image/*" onChange={updateProductImages} multiple/>
         </UpdateProductFormFile>
         <UpdateProductFormImage>
          {oldImages && oldImages.map((image,index) => (
            <img key={index} src={image.url} alt="Product Old Image Preview"/>
          ))}
         </UpdateProductFormImage>
         <UpdateProductFormImage>
{
  imagesPreview.map((image,index) => (<img key={index} src={image} alt="Product Preview"/>))
}
         </UpdateProductFormImage>
         <FormButton type="submit" disabled={loading?true:false}>
           Update 
         </FormButton>
         </UpdateProductForm>
      </UpdateProductContainer>
     
    </Container>
   
    </>
  )
}

export default UpdateProduct
