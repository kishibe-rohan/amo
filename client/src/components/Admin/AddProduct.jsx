import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { clearErrors,createProduct } from '../../actions/productAction'
import { getCategories } from '../../actions/categoryAction'
import { useAlert } from 'react-alert'

import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'
import Sidebar from './Sidebar'

import {AccountTree,Description,Storage,Spellcheck,AttachMoney} from '@material-ui/icons'
import styled from 'styled-components'

const Container = styled.div`
width:100vw;
max-width:100%;
display:grid;
grid-template-columns:1fr 5fr;
position:absolute;
`

const AddProductContainer = styled.div`
width:100%;
box-sizing:border-box;
background-color: rgb(221,221,221);
border-left: 1px solid rgba(0,0,0,0.158);
display:flex;
flex-direction:column;
height:100vh;
`

const AddProductForm = styled.form`
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

const AddProductFormItem = styled.form`
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
}`

const AddProductHeading = styled.h1`color:rgba(0,0,0,0.733);
font:300 2rem;
text-align:center;`

const AddProductFormFile = styled.div`
display: flex;
width: 100%;
align-items: center;
>input{
  display:flex;
  padding:0%;
}`

const AddProductFormImage = styled.div`
display: flex;
align-items: center;
width: 100%;
overflow: auto;
>img{
  width:3vmax;
  margin:0 0.5vmax;
}`

const AddProductButton = styled.button`border: none;
background-color: tomato;
color: white;
font: 300 0.9vmax;
width: 100%;
padding: 0.8vmax;
cursor: pointer;
transition: all 0.5s;
border-radius: 4px;
outline: none;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219)
`


const AddProduct = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading,error,success} = useSelector((state) => state.newProduct)
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const {categories} = useSelector((state) => state.categories)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    dispatch(getCategories());
  },[dispatch,alert,error,history,success])

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images",image)
    })

    dispatch(createProduct(myForm))
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2)
        {
          setImagesPreview((old) => [...old,reader.result]);
          setImages((old) => [...old,reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
   <>
   <MetaData title="Create Product - Admin"/>
   <Header/>
   <Container>
     <Sidebar/>
     <AddProductContainer>
       <AddProductForm encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
         <AddProductHeading>Create Product</AddProductHeading>
         <AddProductFormItem>
           <Spellcheck/>
           <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
         </AddProductFormItem>
         <AddProductFormItem>
           <AttachMoney/>
           <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
         </AddProductFormItem>
         <AddProductFormItem>
           <Description/>
           <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
         </AddProductFormItem>
         <AddProductFormItem>
           <AccountTree/>
           <select onChange={(e) => setCategory(e.target.value)}>
             <option value="">Choose Category</option>
             {categories.map((cat) => (
               <option key={cat.cat} value={cat.cat}>
                 {cat.title}
               </option>
             ))}
           </select>
         </AddProductFormItem>
         <AddProductFormItem>
           <Storage/>
           <input type="number" placeholder="Stock" required onChange={(e) => setStock(e.target.value)}/>
         </AddProductFormItem>
         <AddProductFormFile>
           <input type="file" name="avatar" accept="image/*" onChange={createProductImagesChange} multiple/>
         </AddProductFormFile>
         <AddProductFormImage>
           {imagesPreview.map((image,index) => (
             <img key={index} src={image} alt="Product Preview"/>
           ))}
         </AddProductFormImage>
         <AddProductButton type="submit" disabled={loading?true:false}>
           Create
         </AddProductButton>
       </AddProductForm>
     </AddProductContainer>
   </Container>
   </>
  )
}

export default AddProduct
