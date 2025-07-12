const request = require("supertest");
const server = require("../../index");

describe("API REST - AkusCommerce Tests", () => {

    // Test de Registro de Usuario Exitoso
    it("Debería registrar un usuario exitosamente", async () => {
        const response = await request(server)
            .post("/register")
            .send({
                idUsuario: "testuser001",
                nombre_completo: "Usuario Test",
                telefono: 12345679,
                e_mail: "testuser001@example.com",
                password: "123456",
                url_avatar: "https://example.com/test.jpg"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Usuario registrado exitosamente.");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user).toHaveProperty("e_mail");
    });

    // Test de Acceso al perfil sin token (debe fallar)
    it("Debería bloquear acceso a perfil sin token", async () => {
        const response = await request(server).get("/profile");

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error", "Invalid or expired token.");
    });
});