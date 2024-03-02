import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import axios from "axios"
import toast from "react-hot-toast";

import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ProposalsRecieved = () => {

    const [auth] = useContext(AuthContext)
    const [data, setData] = useState(null);

    


   






    useEffect(() => {
        if (auth && auth.user) {
            setData(auth.user.proposalsRecieved);

        }
    }, [auth]);



    const [products, setProducts] = useState([])

    //get all products

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-products`)
            if (data?.success) {
                setProducts(data?.products)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong in getting products!")
        }
    }


    useEffect(() => {
        getAllProducts();
    }, [])



    return (

        <>
            <Header />
            <div className="container-fluid m-3 p-1">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8 text-center" style={{ minHeight: "50vh" }}>
                        <h1>Responses</h1>
                        <div className="row flex-wrap">
                            {products?.filter(p => data[p._id]).map(p => (
                                <div className="col-lg-5 col-md-6 col-sm-6 mb-4" key={p._id}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: "30vh", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name} &nbsp; {p.quality}<i className='fa fa-star fa-sm text-warning'></i><br />{p.description}</h5>
                                            <p className="card-text"><span className='text-dark bg-warning'> Rs.{p.price}/-</span></p>
                                            <p className="card-text"><span style={{ fontSize: "0.7rem" }}> product id: {p._id}</span></p>
                                        </div>

                                        <div>
                                            <div>
                                                <Link to={`/dashboard/user/responses/${p._id}`}>
                                                    <div className="card" style={{ display: "inline-block", margin: "0.2rem" }}>
                                                        <i className="fa-solid fa-user p-2"></i>
                                                        <span style={{ fontSize: "0.9rem", fontWeight: "600" }} className="p-2">{data[p._id].length} Responses Received!</span>
                                                    </div>
                                                    <button className="btn btn-sm btn-success m-2">Click to view responses!</button>
                                                </Link>


                                              
                                            </div>
                                        </div>




                                    </div>
                                </div>
                            ))}


                        </div>




                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default ProposalsRecieved






