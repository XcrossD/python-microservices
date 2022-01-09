import pika

params = pika.URLParameters('amqps://fpirdcnu:f7tQVuLEYK7MlJNkYJJn_cDoegId2e_q@shrimp.rmq.cloudamqp.com/fpirdcnu')

connection = pika.BlockingConnection(params)

channel = connection.channel()

def publish():
    channel.basic_publish(exchange='', routing_key='admin', body='hello')