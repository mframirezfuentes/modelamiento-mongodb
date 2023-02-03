import mongoConnect from '../../../utils/db/mongodb/conn'
import UsersModel from '../../../utils/user_model'
import { getToken } from "next-auth/jwt"


export default async function handler(req, res) {
  await mongoConnect();
  if (req.method === 'GET') {

    try {
      const response = await UsersModel.find()
      //const response = await UsersModel.find()
      return res.status(200).json({ success: true, data: response })
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error })
    }

  }

  const token = await getToken({ req })
  if (!token)
    return res.status(401).send({ message: 'Unauthorized request' })



  // if (req.method === 'POST') {
  //   const response = await UsersModel.insertMany
  //   return res.status(201).json(response)
  // }


};
