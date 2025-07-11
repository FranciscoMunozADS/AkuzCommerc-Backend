const request = require("supertest");
const server = require("./../../index.js");
const { secretKey } = require("./../utils/utils.js");

describe("Operaciones StatusCode en AkuzCommerce", () => {
  it("Se obtiene un status code 200 como respuesta de la ruta POST /login", async () => {
    const objUser = {
      e_mail: "pedrogonzales@example.com",
      password: "secreta123",
    };

    const response = await request(server).post("/login").send(objUser);

    expect(response.statusCode).toBe(200);
  });

  it("Se obtiene un status code 200 como respuesta de la ruta GET /product", async () => {
    const response = await request(server).get("/products").send();

    expect(response.statusCode).toBe(200);
  });

  it("Se obtiene un status code 200 como respuesta de la ruta GET /cart", async () => {
    const response = await request(server).get("/cart").send();

    expect(response.statusCode).toBe(200);
  });

  it("Se obtiene un status code 200 como respuesta de la ruta GET /orders", async () => {
    const token = `Bearer ${secretKey}`;

    const response = await request(server)
      .get("/orders")
      .set("Authorization", token)
      .send();

    expect(response.statusCode).toBe(200);
  });
});
