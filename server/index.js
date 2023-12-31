import express from "express"
import cors from "cors"
import { api_key, api_secret } from "./secrets/apisecret";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

const serverClient = new StreamChat.getInstance(api_key, api_secret);

//signop route

app.post("/signup", async (req, res)=> {
    try{
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId); // ei token ta socketio theke ashbe not jwt
    res.json({token, userId, firstName, lastName, username, hashedPassword});
    }catch(err){
        res.json(err);
    }
});


//login rout


app.listen(3001, ()=>{
    console.log("Server is running on 3001");
})