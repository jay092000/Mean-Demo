import * as express from "express";
import { connect } from "mongoose";
import * as cors from 'cors';
import { userRouter } from "./user/user.route";
const app = express();
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connect(
  "mongodb+srv://jp:0909@cluster0.gst9v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { dbName: "demo", useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error in db connection", err);
  });

app.use("/users", userRouter());

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(3001, () => {
  console.log(`server started at http://localhost:${3001}`);
});
