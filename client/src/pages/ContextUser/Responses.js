import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "../user/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";

const Responses = () => {
    const params = useParams();
    const [proposal, setProposal] = useState([]);
    const [buyer, setbuyer] = useState("");
    const [product, setProduct] = useState("");

    const pid = params.pid;

    const handleLeads = () => {
        // Add logic for handling leads
    };

    const handleResponses = () => {
        // Add logic for handling responses
    };

    const getProductData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${pid}`);
            if (data?.success) {
                const proposalsReceived = data.product?.sellerId?.proposalsReceived?.[pid] || [];
                setProduct(data?.product);
                
                setProposal(proposalsReceived);
            } else {
                console.log("data success is failed");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to get product data responses");
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <>
            <Header />
            <div className="container-fluid">
    <div className="row">
        <div className="col-md-3 p-2 m-2">
            <UserMenu />
        </div>
        <div className="col-md-8" style={{ minHeight: "50vh" }}>
            <div className="titler">
                <div className="topper p-3">
                    <div style={{ flexDirection: "column" }}>
                        <p>
                            <span className="text-primary m-2" style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                                {product.name}
                            </span>{" "}
                            <span className="text-warning bg-dark">Rs.{product.price}/-</span> per ton{" "}
                            <span className="bg-warning">{product.quantity} tons</span> Lot id:{" "}
                            <span className="text-warning">{product.createdAt}</span>{" "}
                        </p>
                        <div className="buttons">
                            <button className="btn btn-lg btn-warning m-1" style={{ width: "49%" }} onClick={handleResponses}>
                                Buyer Responses
                            </button>
                            <button className="btn btn-lg btn-warning m-1" style={{ width: "49%" }} onClick={handleLeads}>
                                Potential Leads
                            </button>
                        </div>
                        <h1 className="text-center">Responses</h1>
                        {proposal.map((p, index) => (
                            <div key={index} className="each card p-2 mb-4">
                                <div className="row">
                                    <div className="col-sm-8 mx-3">
                                        <div className="d-flex justify-content-between my-2">
                                            <span className="btn btn-sm btn-secondary">tag</span>{" "}
                                            <span className="text-dark" style={{ fontSize: "1.5rem" }}>
                                                title
                                            </span>{" "}
                                            <span>
                                                <i className="fa-regular fa-clock"></i> 13d
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Amount offered: Rs.{p.price}/-</span>{" "}
                                            <span>Quantity : {p.quantity}tons</span>
                                            <span> Destination required</span>
                                        </div>
                                    </div>
                                    <div className="card col-sm-3 mx-4">
                                        <div className="d-flex justify-content-evenly">
                                            <i className="fa-solid fa-circle-user fa-2x p-2"></i>
                                            <div className="name">
                                                <span style={{ fontSize: "0.7rem" }}>{p}</span> <br />
                                                Buyer
                                            </div>
                                        </div>
                                        <button className="btn btn-sm btn-primary my-1">review offer</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


            <Footer />
        </>
    );
};

export default Responses;
