// src/mocks/handlers.js
import { rest } from "msw";
import { faker } from "@faker-js/faker";

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
];
