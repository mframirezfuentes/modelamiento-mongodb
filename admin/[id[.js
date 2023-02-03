import mongoConnect from '../../../utils/db/mongodb/conn'
import UsersModel from '../../../utils/user_model'
import { getToken } from "next-auth/jwt"
import { ObjectId } from 'bson'



export default async function handler(req, res) {

    const token = await getToken({ req })
    //if (!token)        return res.status(401).send({ message: 'Unauthorized request' })

    await mongoConnect();
    const { id } = req.query
    console.log("id:",id);

    if (req.method === 'GET') {

        try {
          const response = await UsersModel.findById({_id: ObjectId(id)})

          return res.status(200).json({ success: true, data: response })
        } catch (error) {
          console.log(error);
          return res.status(500).json({ success: false, error })
        }

      }

    if (req.method === 'PUT') {
        const  {role } =req.body
        try {
            if (!id) return "invalid id"

            const response = await UsersModel.updateOne(
                //   //query
                { _id: "63da90a1a75b0ccf3ef447d9" },

                //modificación al campo rol
                {
                    $set: {
                        role: role,
                    }
                })
            return res.status(202).json({data:response});
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error })
        }
    }

    if (req.method === 'DELETE') {

        try {
            const response = await UsersModel.deleteOne({ _id: id })
            res.status(200).json({ success: true, data:response })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, error })
        }

    }

};



