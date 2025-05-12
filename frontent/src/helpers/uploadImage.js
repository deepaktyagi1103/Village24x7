//const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

//you have give the wrong name of REACT_APP_CLOUDINARY_CLOUD_NAME  => REACT_APP_CLOUD_NAME_CLOUDINARY
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage  = async(image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mest_product")
    

    const dataResponse = await fetch(url,{  
        method : "post",
        body : formData
    })
    const data = await dataResponse.json() //here you have direct return this 
    return data
}

export default uploadImage 