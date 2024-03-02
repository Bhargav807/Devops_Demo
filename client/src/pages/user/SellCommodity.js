import React, { useState, useContext } from 'react';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import { Radio } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import AuthContext from '../../context/AuthContext';



const SellCommodity = () => {

  const navigate = useNavigate();


  const [photo, setPhoto] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [organic, setOrganic] = useState("")
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("")


  const [auth] = useContext(AuthContext);




  const handleCreate = async (e) => {



    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("shipping", shipping);
      productData.append("sellerId", auth.user._id)
      productData.append("availableDate", availableDate)
      productData.append("organic", organic)
      productData.append("quantityUnit", quantityUnit)


      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/create-product`, productData);

      if (data?.success) {

        toast.success("Product created successfully");

        navigate("/dashboard/user/listings-posted");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Error occurred while creating product hrere");
    }
  }

  return (
    <>

      <Header />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 text-center m-1" style={{ minHeight: "50vh" }}>
            <h3>Fill Product details</h3>
            <div className="m-1">

              {/* Photo Upload */}
              <div className="mb-3">
                <label className='btn btn-primary btn-prinary'>
                  {photo ? photo.name : "Upload photo"}
                  <input type="file" name="photo" id="" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              {photo && (
                <div className="mb-3 text-center">
                  <img src={URL.createObjectURL(photo)} alt="Product " height={"200px"} className="img img-responsive" />
                </div>
              )}
              {/* Form Inputs */}
              <div className="mb-3">
                <input type="text" value={name} placeholder='Enter name' className='form-control' onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder='Rs. Price ' className='form-control' onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={description} placeholder='Enter description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mb-3 d-flex align-items-center">
                <input type="number" value={quantity} placeholder='Enter quantity' className='form-control me-2' onChange={(e) => setQuantity(e.target.value)} />
                <span className='m-3' style={{ fontWeight: "600" }}>per</span>
                <Radio.Group onChange={(e) => setQuantityUnit(e.target.value)} value={quantityUnit} className="d-flex align-items-center">
                  <Radio value={"ton"} className="me-3">ton</Radio>
                  <Radio value={"box"} className="me-3">box</Radio>
                  <Radio value={"quintal"} className="me-3">quintal</Radio>
                  <Radio value={"dozen"} className="me-3">dozen</Radio>
                  <Radio value={"kg"}>kg</Radio>
                </Radio.Group>
              </div>



              <div className="m-4 d-flex align-items-center">
                <label htmlFor="" className="m-0 me-3 text-dark" style={{ fontWeight: "600" }}>Available by :</label>
                <div className="dater">
                  <input type="date" value={availableDate} placeholder='Available date' className='form-control' onChange={(e) => setAvailableDate(e.target.value)} />
                </div>
                <div className="data">
                  <label htmlFor="" className='m-4 text-dark' style={{ fontWeight: "600" }}>Is shipping available?</label>
                  <Radio.Group onChange={(e) => setShipping(e.target.value)} value={shipping}>
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>

                  <label htmlFor="" className='m-4 text-dark' style={{ fontWeight: "600" }}>Organic</label>
                  <Radio.Group onChange={(e) => setOrganic(e.target.value)} value={organic}>
                    <Radio value={1}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>
                </div>
              </div>



              <div className="mb-3">
                <button onClick={handleCreate} className='btn btn-primary'>Create Commodity</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />



    </>
  )
}

export default SellCommodity;