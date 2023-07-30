import ChatModel from "../model/chatModel.js";
import vendorModel from '../model/vendorModel.js'
export const createChat = async (req, res) => {
  console.log(req.body);
  const {vendorId,userId}=req.body
  const newChat = new ChatModel({
    members: [req.body.userId, req.body.vendorId],
  });
  try {
    const result = await newChat.save();
    res.json({ success: true, result }); 
    
    
  } catch (error) {
    res.status(500).json(error);
  }
};
// export const getData=async(req,res)=>{
// const vendorId=req.params
// try {
//   const vendorData = await vendorModel.findOne({ vendorId });
//   res.json(vendorData);
// } catch (error) {
//   console.log(error);
// }
// };
export const userChats=async(req,res)=>{
try {
   const chat=await ChatModel.find({
    members:{$in:[req.params.userId]}
   })
   res.status(200).json(chat)
} catch (error) {
    res.status(500).json(error) 
}
};
export const findChat=async(req,res)=>{
    try {
      const chat= await ChatModel.findOne({
        members:{
            $all:[rew.params.firstId,req.params.secondId]
        }
      })
      res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)   
    }
}