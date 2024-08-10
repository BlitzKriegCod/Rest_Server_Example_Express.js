const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    description: { type: String },
    available: { type: Boolean, default: true },
});


ProductSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'product', ProductSchema );
