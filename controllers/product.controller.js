const { response } = require('express');
const Product = require('../models/product.model');


const obtProducts = async(req, res = response ) => {

    const { limit = 5, to = 0 } = req.query;
    const query = { estado: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip( Number( to ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        products
    });
}

const obtProduct = async(req, res = response ) => {

    const { id } = req.params;
    const product = await Product.findById( id )
                            .populate('user', 'name')
                            .populate('category', 'name');

    res.json( product );

}

const createProduct = async(req, res = response ) => {

    const {user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.nombre });

    if ( productDB ) {
        return res.status(400).json({
            msg: `The product ${ productDB.nombre }, already exist`
        });
    }

    
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Producto( data );

    
    await product.save();

    res.status(201).json(product);

}

const updateProduct = async( req, res = response ) => {

    const { id } = req.params;
    const {  usuario, ...data } = req.body;

    if( data.name ) {
        data.name  = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json( product );

}

const deleteProduct = async(req, res = response ) => {

    const { id } = req.params;
    const product_del = await Product.findByIdAndDelete(id);

    res.json( product_del );
}




module.exports = {
    createProduct,
    obtProducts,
    obtProduct,
    updateProduct,
    deleteProduct
}