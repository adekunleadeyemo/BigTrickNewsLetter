const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public")); 

app.use(bodyParser.urlencoded({extended:true}))



    app.get("/",(req, res)=>{
        res.sendFile(__dirname + "/index.html");
    });
   
    app.post("/",(req,res)=>{
        const fname = req.body.fname;
        const lname = req.body.lname;
        const email = req.body.email;
        var data = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: fname,
                        LNAME: lname
                    }
    
                }
            ]
        };       
    
        const url = "https://us10.api.mailchimp.com/3.0/lists/eaac78a0be";
        const options= {
            method: 'POST',
            auth: "adekunle:c2c66a2c32cc686b0e8b5ace64215b2a-us10"
        };
        const jsonData = JSON.stringify(data);
        const request =  https.request(url,options,(response)=>{
            response.on('data',(data)=>{
                console.log(JSON.parse(data));
                if(response.statusCode == 200){
                    res.sendFile(__dirname + "/success.html")
                }
                else{
                    res.sendFile(__dirname + "/failure.html")
                }

            });

        
        });
        request.write(jsonData);
        request.end()
        
    });



app.listen(process.env.PORT||3000,()=>{
    console.log("port is running at 300");
});




//Api_key
//c2c66a2c32cc686b0e8b5ace64215b2a-us10
//listid
//eaac78a0be