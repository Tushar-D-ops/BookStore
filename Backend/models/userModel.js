import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // address:{
    //     type:String,
    //     required:true,
    // },
    // avatar:{
    //     type:String,
    //     default:"https://tse2.mm.bing.net/th?id=OIP.9Z2S4SF6GJ0-owYa-L77PwHaHa&pid=Api&P=0&h=180"
    //  },
    //  role:{
    //     type:String,
    //     enum:["user","admin"],
    //     default:"user",
    //  },
    //  favourites:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"books",
    //     }
    //  ],
     cartData:
        {
            type:Object,
            default:{}
        },
    //  orders:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"order",
    //     }
    //  ],
},
{
    minimize:false,
}
);
const UserModel = mongoose.model("user",userSchema);
export default UserModel