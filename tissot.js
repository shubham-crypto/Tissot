const express=require("express");

const bodyParser= require("body-parser");

const app=express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

const item={email: String , password: String}

const review={email: String , password: String , Date: String};

var check=false

let RegisteredCustomers= [{email:"sh@", password:"hsh"}];

let  SubCustomers=[{}]

let Reviewscus=[
    {
    email : "jay@gmail.com",
    password: "Before Christmas I bought a Tissot mans watch on line.unfortunately I didn’t realise how big the watch-face was and, it was not satisfactory, and we wanted to send it back. I found a telephone number, spoke to a very nice and efficient lady, who told me to send the watch back - I did this, and received all the money back very quickly. I only wish I could have found another watch with a smaller face, from Tissot. This sort of good service is hard to find.",
    Date: "22/5/2023"
},
   { 
    email : "veronica@gmail.com",
    password : "I traded a very nice Breitling quarts for an automatic Tissot. Why? I loved the Breitling, but hated having to get batteries replaced. However, I could not be happier with the Tissot. I note others' bad experiences; but that's certainly not mine. It's a well made and beautiful watch; and I'm more than happy with the trade.",
    Date: "12/3/2022"
}

]

app.get("/",function(req,res){
    res.render("home.ejs")
})

app.get("/discover",function(req,res){
    res.render("discover")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/Register",function(req,res){
    res.render("Register")
})

app.get("/Men", function(req,res){
    res.render("Men")
})

app.get("/Women", function(req,res){
    res.render("Women")
})

app.get("/privacy", function(req,res){
    res.render("privacy")
})

app.get("/Help", function(req,res){
    res.render("Help")
})

app.get("/about", function(req,res){
    res.render("about")
})

app.get("/contactus", function(req,res){
    res.render("contactus")
})

app.get("/impressum", function(req,res){
    res.render("impressum")
})

app.get("/Newsletter", function(req,res){
    res.render("Newsletter")
})

app.get("/privacynotice", function(req,res){
    res.render("privacynotice")
})

app.get("/services", function(req,res){
    res.render("services")
})

app.get("/termsofservice", function(req,res){
    res.render("termsofservice")
})

app.get("/News", function(req,res){
    res.render("News")
})

app.get("/Brand", function(req,res){
    res.render("Brand")
})

app.get("/payment", function(req,res){
    res.render("payment")
})

app.get("/Reviews", function(req,res){
    res.render("Reviews",{listitem : Reviewscus})
})


app.post("/login",function(req,res){
    const input=req.body.email;
    if(input!==undefined){
        const check=RegisteredCustomers.find(e=>e.email===input);
        if(check!==undefined){
            res.redirect("/");
        }
        else{
            res.render("failure",{status :"Oops! not registered" , route :"Go to ", link: "/register", content: "Register"})
        }
        
    }
    else{
        res.redirect("Register")
    }
})

app.post("/register",function(req,res){
    const input=req.body.email;
    const password=req.body.password
    //console.log(input,password)
    RegisteredCustomers.forEach(item=>{
        if(item.email===input){
            res.render("failure",{status : "Already Registered" , route :"Go to " , link: "/login", content:"Signin"})
        }
        else{
            item.email=input;
            item.password=password;
            RegisteredCustomers.push(item)
            res.render("regdone")
        }
    })
    
})

app.post("/",function(req,res){
    res.redirect("discover")

})

app.post("/home1", function(req,res){
    res.redirect("Men")
})

app.post("/home2", function(req,res){
    res.redirect("Women")
})

app.post("/home3", function(req,res){
    res.redirect("Reviews")
})

app.post("/home4", function(req,res){
    res.redirect("Newsletter")
})

app.post("/home5", function(req,res){
    res.redirect("Brand")
})

app.post("/service1", function(req,res){
    res.redirect("about")
})


app.post("/service2", function(req,res){
    res.redirect("contactus")
})

app.post("/Newsletter", function(req,res){
    
    res.render("failure",{status : "Congratulations" , route:"Thank you for signing up " , link: "/Newsletter", content:"Newsletter"})
})

app.post("/Reviews", function(req,res){
    const input=req.body.email;
    const paragraph=req.body.textarea;
    var d = new Date();
    var date = d.getUTCDate();
    var month = d.getUTCMonth() + 1; 
    var year = d.getUTCFullYear();
    var fulldate= date + "/" + month + "/" + year;
    review.email=input;
    review.password=paragraph;
    review.Date=fulldate;
    Reviewscus.push(review);
    res.redirect("/Reviews");
})

app.post("/footreg", function(req,res){
    const input=req.body.email;
    const password=req.body.password
    SubCustomers.forEach(item=>{
        if(item.email===input){
            res.render("failure",{status : "Already Subscribed" , route :"Go to " , link: "/", content:"Home"})
        }
        else{
            item.email=input;
            item.password=password;
            SubCustomers.push(item)
            res.redirect("/")
        }
    })
})

app.post("/pay", function(req,res){
    res.render("failure",{status : "Your item will be delivered" , route :"Go to " , link: "/", content:"Home"})
})

app.post("/contact", function(req,res){
    res.render("failure",{status : "We will contact you asap" , route :"Go to " , link: "/", content:"Home"})
})



app.listen(3000,function(){
    console.log("server started on port 3000");
})