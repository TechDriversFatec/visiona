import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name='did33wj6e',
    api_key='586894584935272',
    api_secret='juv7Iw5NWW4VyjDf5vFB7VfJvrA')

def uploadImg(file):
    # file = request.files['picture']

    upload_data = cloudinary.uploader.upload(file)
    return {
        'status': 1,
        'url': upload_data.data.secure_url,
    }
