import mongoose from "mongoose"

const Movie = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    releaseDate:{
        type:Date,
        require:true
    },
    actors:[{
        type:String
    }],
    description:{
        type: String,
        require:true
    },
    posterUrl:{
        type:String,
        require:true
    },
    director:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean
    },
    price:{
        type:Number,
        // required:true
    },
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
        require:true
    }
})

export default mongoose.model("Movie", Movie);