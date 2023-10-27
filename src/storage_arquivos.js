const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE)
const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }

})

const uploadImagem = async (path, buffer, mimetype) => {
    const imagem = await s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise()

    return {
        path: imagem.Key,
        url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${imagem.Key}`
    }
}

// const upload = async (req, res) => {
//     const user = req.usuario.id;
//     const { file } = req;
//     try {
//         const uploadImagem = await s3.upload({
//             Bucket: process.env.BUCKET_NAME,
//             Key: `produtos/${user}/${file.originalname}`,
//             Body: file.buffer,
//             ContentType: file.mimetype

//         }).promise()
//         console.log('aqui')
//         return res.status(200).json({
//             url: uploadImagem.Location,
//             path: uploadImagem.Key
//         })

//     } catch (error) {

//     }

// }

// const file = async (req, res) => {

//     try {
//         const arquivo = await s3.listObjects({
//             Bucket: process.env.BUCKET_NAME,
//         }).promise()

//         const arquivos = arquivo.Contents.map((elemento) => {
//             return {
//                 url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/${imagem.Key}/${file.Key}`,
//                 path: file.Key
//             }

//         })
//         return res.json(arquivos)

//     }
//     catch (error) {
//         console.error(error.message)
//     }

// }

module.exports = {
    uploadImagem
}