import productModel from "../models/productModel.js";
import fs from 'fs'
import slugify from "slugify";
export const createProductController = async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !price:
                return res.status(500).send({error:'Price is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is Required'})
            case photo && photo.size > 1000000:
                return res
                .status(500)
                .send({error:'photo is Required and should be less then 1mb'});
        }

        const products = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message: "Product Created Successfully ",
            products,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in creating product',
        });
    }
}

export const getProductController = async (req,res) =>{
    try{
        const products = await productModel
        .find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1});
    res.status(200).send({
        success:true,
        countTotal : products.length,
        message:"All Products ",
        products,
    });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting product',
        });
    }
}



export const getSingleProductController = async (req,res) =>{
    try{
       
       // Retrieve product from the database based on the slug
       const product = await productModel
       .findOne({ slug :req.params.slug})
       .select("-photo")
       .populate("category");

       // If product is not found, send a 404 response
       if (!product) {
           return res.status(404).send({
               success: false,
               message: 'Product not found',
           });
       }

       // If product is found, send a success response with the product data
       res.status(200).send({
           success: true,
           message: 'Single Product Fetched successfully',
           product,
       });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting single product',
        });
    }
}

export const productPhotoController = async (req, res) => {
    try {

        // Retrieve product from the database based on the slug
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }

    } catch (error) {
        // Handle errors
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting product photo',
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {

        // Delete the product from the database
        await productModel
                    .findByIdAndDelete(req.params.pid)
                    .select("-photo");

        // Send a success response
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        // Handle errors
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in deleting product',
        });
    }
};

// //update product
// export const updateProductController = async(req,res) =>{
//     try{
//         const {name,slug,description,price,category,quantity,shipping} = req.fields;
//         const {photo} = req.files;
//         //validation
//         switch(true){
//             case !name:
//                 return res.status(500).send({error:'Name is Required'})
//             case !description:
//                 return res.status(500).send({error:'Description is Required'})
//             case !price:
//                 return res.status(500).send({error:'Price is Required'})
//             case !category:
//                 return res.status(500).send({error:'Category is Required'})
//             case !quantity:
//                 return res.status(500).send({error:'Quantity is Required'})
//             case photo && photo.size > 1000000:
//                 return res
//                 .status(500)
//                 .send({error:'photo is Required and should be less then 1mb'});
//         }

//         const products = await productModel.findByIdAndUpdate(
//             req.params.pid,
//             {...req.fields, slug: slugify(name)},
//             {new:true}
//         );
//         if(photo){
//             products.photo.data = fs.readFileSync(photo.path)
//             products.photo.contentType = photo.type
//         }
//         await products.save();
//         res.status(201).send({
//             success:true,
//             message: "Product Updated Successfully ",
//             products,
//         })
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: 'Error in updating product',
//         });
//     }
// };

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch(true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' });
            case !description:
                return res.status(500).send({ error: 'Description is Required' });
            case !price:
                return res.status(500).send({ error: 'Price is Required' });
            case !category:
                return res.status(500).send({ error: 'Category is Required' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Photo is Required and should be less than 1mb' });
        }

        // Find the product by ID
        let product = await productModel.findById(req.params.pid);

        // Check if product exists
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        // If photo is provided, update product's photo data
        if (photo) {
            // Delete old photo if exists
            if (product.photo && product.photo.data) {
                fs.unlinkSync(product.photo.path); // Delete old photo file
            }

            // Update product's photo data
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        // Update other fields
        product.name = name;
        product.slug = slugify(name);
        product.description = description;
        product.price = price;
        product.category = category;
        product.quantity = quantity;
        product.shipping = shipping;

        // Save the updated product
        product = await product.save();

        // Send success response
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            product,
        });
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in updating product',
        });
    }
};