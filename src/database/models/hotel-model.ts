import mongoose, { model, models } from 'mongoose';



const hotelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    hotelCover: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    hotelUrl: {
        type: String,
        required: true
    },
    emails: {
        type: [String] || String,
        required: true
    }

}, {
    timestamps: true
});

const Hotel = models?.hotel || model('hotel', hotelSchema);

export default Hotel;
