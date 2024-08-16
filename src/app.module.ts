import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { FirebaseModule } from 'nestjs-firebase'

@Module({
  imports: [AccountModule,
    FirebaseModule.forRoot({
      googleApplicationCredential: "./firebase/config.json",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
