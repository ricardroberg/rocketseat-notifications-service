import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['tidy-turkey-12851-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'dGlkeS10dXJrZXktMTI4NTEk7aH63eboMBDhAvC_XlbzfT8waQizwpUKTMsoqNU',
          password:
            'Rmz3xWroAF10B2vOT34jIGDsfHqo064vLInGTlcbmP5VrhzbOK0WcMrfDiU-BMzw7_lH9g==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
