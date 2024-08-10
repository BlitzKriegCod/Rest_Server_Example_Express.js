const { query } = require('express');
const Catg = require('../models/categories.model')

module.exports.getCategories = async(req, res) => {


  const { limit = 10, from = 0 } = req.query;

  const l = Number(limit);
  const f = Number(from);
  if (l.toString() === "NaN" || f.toString() === "NaN") {
    res
      .status(400)
      .json({ Query_Params: { limit, from }, msg: "must be numbers" });
  } else {
    const data = await Catg.find().skip(f).limit(l);
    const total = await Catg.countDocuments();
    res.json({ data, total });
  }
}
module.exports.getCategoriesById = async(req ,res)=>{
	const {id} = req.params
	const catg = await Catg.findById({id})
	if(!catg)return res.status(400).json({
		msg:`catg don't exist`
	})
 return res.status().json(catg)
}
module.exports.createCatg = async function (req, res) {
    const {name} = req.body;
    const user = req.user
    const catg = new Catg({
      name,
      user:user.id
    
    });
    await catg.save();
  
    res.json(catg);
  };

module.exports.deleteCatg = async(req,res) =>{
  const {id} = req.params 

  const catgDel = await Catg.findByIdAndDelete({id})

  res.status(200).json({
    msg:'catg delete'
    ,catgDel})

}
module.exports.updateCatg= async(req,res)=>{
  const {id} = req.params
  const {userId,...categ} = req.body
  
  
  const a = await Catg.findOne(categ.name)

  if(a !== null){
    return res.status(400).json({
      msg:'this catg already exist'
    })
  }
if(userId){
  categ.user = userId
}

  const catg = await Catg.findByIdAndUpdate(id,categ)
  


  res.json({msg:'catg update',catg})
}
