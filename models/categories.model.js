const {Schema,model} = require('mongoose')

const categoriesSchema = new Schema({
	name:{
		type:String,
		required:[true,'Name is required'],
	},
	user:{
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
	}

})
categoriesSchema.methods.toJSON = function () {
	const { __v,_id,...catg } = this.toObject();
	catg.id = _id
	return catg;
  };
module.exports = model('categorie',categoriesSchema)