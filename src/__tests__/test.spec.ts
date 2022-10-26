import { it, expect, describe, beforeAll } from "@jest/globals"
import { AppDataSource } from "../data-source"
import request from "supertest"
import app from "../app"

describe("User routes", () => {
  beforeAll( async () => {
    await AppDataSource.initialize()
  })

  const userData = {
    email: "test@test.com",
    name:"test",
    age: 20
  }

  it("should return a bad request when getting users with empty database", async () => {
    const response = await request(app).get("/users").send(userData)
  
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  it("creating a user", async () => {
    const response = await request(app).post("/users").send(userData)
  
    expect(response.status).toBe(201)
  })

  it("should return a bad request when creating a already existet user.", async () => {
    const response = await request(app).post("/users").send(userData)
  
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  it("should return a bad request when creating a user with age < 18.", async () => {
    const response = await request(app).post("/users").send(userData)
    
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  it("should return a list with all users", async () => {
    const response = await request(app).get("/users").send(userData)
  
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("forEach")
    expect(response.body).toHaveLength(1)
  })
})
