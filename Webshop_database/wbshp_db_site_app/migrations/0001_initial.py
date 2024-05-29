# Generated by Django 4.0.4 on 2022-05-26 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.IntegerField(db_column='Product_id', primary_key=True, serialize=False)),
                ('product_title', models.CharField(db_column='Product_title', max_length=255)),
                ('product_type', models.CharField(db_column='Product_type', max_length=255)),
                ('product_price', models.IntegerField(db_column='Product_price')),
                ('product_amount_instock', models.IntegerField(db_column='Product_amount_instock')),
            ],
            options={
                'db_table': 'product',
                'managed': True,
            },
        ),
    ]
