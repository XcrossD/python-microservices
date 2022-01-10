import pika, json

from main import Product, db

params = pika.URLParameters('amqps://fpirdcnu:f7tQVuLEYK7MlJNkYJJn_cDoegId2e_q@shrimp.rmq.cloudamqp.com/fpirdcnu')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='main')

def callback(ch, methods, properties, body):
    print('Received in main')
    data = json.loads(body)
    print(data)

    if properties.content_type == 'product_created':
        product = Product(id=data['id'], title=data['title'], image=data['image'])
        db.session.add(product)
        db.session.commit()
        print(f"Product {data['id']} created")
    elif properties.content_type == 'product_updated':
        product = Product.query.get(data['id'])
        product.title = data['title']
        product.image = data['image']
        db.session.commit()
        print(f"Product {data['id']} updated")
    elif properties.content_type == 'product_deleted':
        product = Product.query.get(data)
        db.session.delete(product)
        db.session.commit()
        print(f'Product {data} deleted')

channel.basic_consume(queue='main', on_message_callback=callback, auto_ack=True)

print('Started consuming')

channel.start_consuming()

channel.close()