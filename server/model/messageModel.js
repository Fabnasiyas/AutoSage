import mongoose from "mongoose";
const msgSchema = new mongoose.Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    text: {
        type: String,
    },
},
    {
        timestamps: true
    }
);
const msgModel = mongoose.model('message', msgSchema)
export default msgModel