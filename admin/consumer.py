import pika

params = pika.URLParameters('amqps://fpirdcnu:f7tQVuLEYK7MlJNkYJJn_cDoegId2e_q@shrimp.rmq.cloudamqp.com/fpirdcnu')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='admin')

def callback(ch, methods, property, body):
    print('Received in admin')
    print(body)

channel.basic_consume(queue='admin', on_message_callback=callback)

print('Started consuming')

channel.start_consuming()

channel.close()