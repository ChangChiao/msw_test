// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from "@faker-js/faker";

const postData = [
  {
    _id: "1",
    userPhoto: faker.internet.avatar(),
    userName: "邊緣小杰",
    userPage: "/",
    // createdAt: "2022/1/10 12:00",
    content: "外面看起來就超冷.... \n我決定回被窩繼續睡....>.<",
    // imageUrl: faker.image.nature(1200, 400),
  },
];

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        message: "login success",
      })
    );
  }),

  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // If authenticated, return a mocked user details
    const cart = [];
    for (let i = 0; i < 20; i++) {
      const item = {
        prouctName: faker.commerce.productName(),
        price: faker.commerce.price(100, 1000, 0),
      };
      cart.push(item);
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: "jason",
        cart,
      })
    );
  }),
  rest.get("/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "success",
        posts: postData,
      })
    );
  }),

  rest.post("/posts", async (req, res, ctx) => {
    const { userName, userPhoto, content } = req.body;
    if (
      userName === undefined ||
      userPhoto === undefined ||
      content === undefined
    ) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(400),
        ctx.json({
          message: "參數有缺",
        })
      );
    }

    const fileReader = () => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(userPhoto);
        reader.onerror = (error) => {
          reject(error);
        };
      });
    };

    let avatar = "";
    try {
      avatar = await fileReader();
    } catch (error) {
      console.log(error);
    }

    console.log("userPhoto", userPhoto);

    const newPost = {
      _id: Date.now(),
      userName,
      userPhoto: avatar,
      content,
    };

    postData.push(newPost);

    return res(
      ctx.status(200),
      ctx.json({
        message: "success",
        post: newPost,
      })
    );
  }),
];
