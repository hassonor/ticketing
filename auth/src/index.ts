import express from 'express';
import {json} from 'body-parser';


const app = express();
app.use(json());

app.get('/api/users/currentuser',(req,res)=>{
    res.send('Hi there');
})

app.listen(4000, ()=>{
    console.log('Listening on port 4000');
});