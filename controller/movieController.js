import Movies from "../models/Movies.js";

class MoviesCtrl {
    getAllMovies = async (req, res, next) => {
        let movies;
        try {
            movies = await Movies.find()
        }
        catch (err) {
            return res.status(400).json({ message: err })
        }
        if (!movies) {
            return res.status(500).send({ message: "No any Movies found" })
        }
        return res.status(200).json({ movies })
    }

    createMovie = async(req,res,next)=>{
        try{
            const { title,actors,featured,price,description,director,releaseDate} = req.body
            
            const posterUrl = req.file ? req.file.filename : ""
            await Movies.create({
                title, actors, posterUrl, description, director, releaseDate, featured, price, adminId: req.admin._id
            })

            res.status(201).json({message: "Movie created succesfully"})
        }
        catch(err){
            next({
                message: "Movie not created",
                status:400
            })
        }
    }
    // destroy = async (req, res, next) => {
    //     try {
    //         const article = await Article.findById(req.params.id)

    //         if (article.image.length) {
    //             unlinkSync(`images/${article.image}`)
    //         }

    //         await Article.findByIdAndDelete(req.params.id)

    //         res.json({
    //             success: 'Article removed.'
    //         })
    //     } catch(err) {
    //         showError(err, next)
    //     }
    // }
    deleteMovie = async(req,res,next)=>{
        const id = req.params.id;
        let movie
        try{
            movie = await Movies.findByIdAndDelete(id)        
        }catch(err){
            return res.status(400).json({error:"Error occured by this id"})
        }
        if(!movie){
            return res.status(404).json({message:"No movie found"})
        }
        return res.status(500).json({message:"Deleted Successfully"})
    }
}
export default new MoviesCtrl