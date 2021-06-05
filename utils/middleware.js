



const unknownEndPoint = (req,res)=>{
    res.status(404).send("Unknown endpoint")
}

const errorHandler = (error,req,res,next) =>{
    console.log(error.message);
}

module.exports = {
    unknownEndPoint,
    errorHandler
}