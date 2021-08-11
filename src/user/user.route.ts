import { Router } from "express";
import { userModelClass } from "./user.model";
import { userInterface } from "../generalInterfaces/user.interfaces";
export function userRouter() {
  const route = Router();
  const model = new userModelClass();

  route.get("/", (req, res) => {
    model
      .getListOfUsers()
      .then((a: any) => {
        if (a) {
          res.status(200).json({
            success: 1,
            data: a,
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          success: 0,
          data: e.message,
        });
      });
  });

  route.get("/getUserById", (req, res) => {
    const id = req.query.id as string;
    if (typeof id !== "undefined") {
      model
        .getUserDetailsById(id)
        .then((a) => {
          res.status(200).json({
            success: 1,
            data: a,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: 0,
            data: err.message,
          });
        });
    }
  });

  route.get("/getUserByData", (req, res) => {
    const userData: userInterface = req.query;
    if (typeof userData !== "undefined") {
      model
        .getUserDetailsByData(userData)
        .then((a:any) => {
          if(a.length === 1)
          {

            res.status(200).json({
              success: 1,
              data: a,
            });
          }else 
          
          {
            res.status(400).json({
              success: 0,
              data:"Invalid User!",
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            success: 0,
            data: err.message,
          });
        });
    } else {
      res.status(400).json({
        success: 0,
        data: "Not valid object",
      });
    }
  });

  route.post("/insertUser", (req, res) => {
    const userData: userInterface = req.body;
    if (userData) {
      model
        .insertOneUser(userData)
        .then((a) => {          
          res.status(200).json({
            success: 1,
            data: a,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: 0,
            data: err.message,
          });
        });
    } else {
      res.status(400).json({
        success: 0,
        data: "Not valid object",
      });
    }
  });
  return route;
}
