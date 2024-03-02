import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";


const ProposalsSent = () => {


    const [auth] = useContext(AuthContext);

    const [proposedlist, setProposedlist] = useState([])

    const [products, setProducts] = useState([])

    //get proposed products list
    // Get proposed products list
    const getProposedList = async () => {
        try {
            const userid = auth?.user._id;
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/proposedlist`, { userid });
            if (data?.success) {
                setProposedlist(data?.proposedList);
            }
        } catch (error) {
            console.error("Error fetching proposed list:", error); // Proper error handling
        }
    };

    useEffect(() => {
        getProposedList();
        // eslint-disable-next-line
    }, []);

    //get all handle propose

    const handlepropose = async (pid, sellerid) => {
        try {
            const userid = auth?.user._id;
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/propose`, { userid, pid, sellerid });
            if (data?.success) {
                toast.success("Offer proposed!");
                // Add the proposed product ID to the proposedlist
                setProposedlist([...proposedlist, pid]);
            }
        } catch (error) {
            console.log(error);
            toast.error("Propose failed");
        }
    };



    const handleDecline = async (pid) => {
        try {
            const userid = auth?.user._id;
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/decline`, { userid, pid });
            if (data?.success) {
                toast.success("Offer declined!");
                // Remove the declined product ID from the proposedlist
                setProposedlist(proposedlist.filter(id => id !== pid));
            }
        } catch (error) {
            console.log(error);
            toast.error("Decline failed!");
        }
    };




    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-all-products`)
            if (data?.success) {
                setProducts(data?.products)


            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong in getting all products!")
        }
    }


    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <>
            <Header />

            <div className="row m-3">
                <div className="col-md-3">
                    {auth.user.role === "0" ? <AdminMenu /> : <UserMenu />}
                </div>
                <div className="col-md-9 text-center" style={{ minHeight: "50vh" }}>
                    <h3>All Products</h3>

                <div className="row flex-wrap">
            
                {products
                    .filter(p => proposedlist.includes(p._id)) // Filter products based on proposedlist
                    .map(p => (
                        <div className="col-lg-3 col-md-3 col-sm-6 m-4" key={p._id}>
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} style={{ height: "30vh", objectFit: "cover" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}<br />{p.description}</h5>
                                    <p className="card-text"><span className='text-dark bg-warning'> Rs.{p.price}/-</span></p>
                                    <button className={`btn m-2 btn-${proposedlist.includes(p._id) ? "danger" : "primary"} btn-sm`} onClick={() => {
                                        if (proposedlist.includes(p._id)) {
                                            handleDecline(p._id); // Call handleDecline if p._id is in proposedlist
                                        } else {
                                            handlepropose(p._id, p.sellerId); // Otherwise, call handlePropose
                                        }
                                    }}>
                                        {proposedlist.includes(p._id) ? (
                                            <>Decline Offer</>
                                        ) : (
                                            <>Propose Offer</>
                                        )}
                                    </button>
                                    <button className="btn btn-sm btn-success m-2" onClick={() => handlepropose(p._id, p.sellerId)}>Contact</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            </div>
            </div>


            <Footer /></>
    )
}

export default ProposalsSent