import { Test, TestingModule } from '@nestjs/testing';
import { BankingController } from './transaction.controller';
import { BankingService } from './transaction.service'
import { INestApplication } from '@nestjs/common'
import * as request from "supertest"

const transaction = { amount: 5, date: Date.now(), note: "Test", type: "deposit" }

describe('BankingController', () => {
  let app: INestApplication;
  let controller: BankingController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankingController],
      providers: [BankingService]
    }).compile();

    controller = module.get<BankingController>(BankingController);
    app = module.createNestApplication();
    await app.init();
  });
  
  it("should return all transactions on a successful request", async () => {
    const response = await request(app.getHttpServer()).get('/banking/')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.any(Array))
  })

  it("should return true when a transaction was added successfully", async () => {
    const response = await request(app.getHttpServer())
    .post('/banking/')
    .send(transaction)
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*')

    expect(response.status).toBe(201)
    expect(response.text).toEqual("true")
  })
});
