import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import * as request from "supertest"
import { INestApplication } from '@nestjs/common'
import { accountProviders } from './account.providers'
import { databaseProviders } from '../database/database.providers'

const user = { email: "test@test.com", password: "Password1!", confirm: "Password1!", firstName: "FirstName", lastName: "LastName" }

describe('AccountController', () => {
  let app: INestApplication;
  let controller: AccountController;
  let service: AccountService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AccountController],
      providers: [AccountService, ...databaseProviders, ...accountProviders]
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService)
    app = module.createNestApplication();
    await app.init();
  });

  // Unit Tests
  it('should be able to register', async () => {
    const returnedUser = await service.registerUser("test@test.com", "Password1!", "FirstName", "LastName")
    expect(returnedUser.email).toBe("test@test.com")
    expect(returnedUser.firstName).toBe("FirstName")
    expect(returnedUser.lastName).toBe("LastName")
  })

  it('should be able to login', async () => {
    const returnedUser = await service.loginUser("test@test.com", "Password1!")
    expect(returnedUser.email).toBe("test@test.com")
    expect(returnedUser.firstName).toBe("FirstName")
    expect(returnedUser.lastName).toBe("LastName")
  })

  it('should be able to logout', async () => {
    expect(await service.logout()).toBe(true)
  })

  it('should be able to delete account', async () => {
    expect(await service.deleteUser()).toBe(true)
  })

  // Integration Tests
  it("should return 201 after a successful registration of a user", async () => {
    const response = await request(app.getHttpServer()).post('/account/register').send(user)

    expect(response.status).toBe(201)
  })

  it("should return 400 after a bad registration of a user", async () => {
    const badUser = user
    delete badUser.email
    const response = await request(app.getHttpServer()).post('/account/register').send(badUser)

    expect(response.status).toBe(400)
  })

  it("should return true after a successful login", async () => {
    const response = await request(app.getHttpServer()).post('/account/login').send(user)

    expect(response.status).toBe(201)
  })

  it("should return true after a successful logout", async () => {
    const response = await request(app.getHttpServer()).put('/account/')

    expect(response.status).toBe(200)
    expect(response.text).toEqual("true")
  })

  it("should return true after successfully deleting the user", async () => {
    const response = await request(app.getHttpServer()).delete('/account/')
    
    expect(response.status).toBe(200)
    expect(response.text).toEqual("true")
  })
});
