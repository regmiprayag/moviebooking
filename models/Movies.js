import mongoose, { Schema } from "mongoose"

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
    },
    director:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean
    },
    genre:[{
        type: String,
        required:true
    }],
    adminId:{
        type: Schema.Types.ObjectId,
        ref:'Admin',
        required:true
    },
    movieStatus:{
        type: String,
        enum: ['available', 'unavailable'],
    }
})

export default mongoose.model("Movie", Movie);