import { Kafka } from "kafkajs";
import { randomUUID } from 'node:crypto'

async function bootstrap(){
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['tidy-turkey-12851-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'dGlkeS10dXJrZXktMTI4NTEk7aH63eboMBDhAvC_XlbzfT8waQizwpUKTMsoqNU',
          password:
            'Rmz3xWroAF10B2vOT34jIGDsfHqo064vLInGTlcbmP5VrhzbOK0WcMrfDiU-BMzw7_lH9g==',
        },
        ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!(KAFKA)',
          category: 'social',
          recipientId: randomUUID()
        })
      }
    ]
  })

  await producer.disconnect()
}

bootstrap()