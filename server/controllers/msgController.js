import msgModel from "../model/messageModel.js";


export const addMessage=async(req,res)=>{
    const {chatId,senderId,text}=req.body;
    console.log(req.body);
    const message=new msgModel({
        chatId,senderId,text
    });
    try {
        const result=await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
};
export const getMessages=async(req,res)=>{
    const {chatId}=req.params;
    console.log(chatId);
    try {
     const result= await msgModel.find({chatId}) 
     console.log(result);
     res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error) 
    }
}