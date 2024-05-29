# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Product(models.Model):
    product_id = models.IntegerField(db_column='Product_id', primary_key=True)  # Field name made lowercase.
    product_title = models.CharField(db_column='Product_title', max_length=255)  # Field name made lowercase.
    product_type = models.CharField(db_column='Product_type', max_length=255)  # Field name made lowercase.
    product_price = models.IntegerField(db_column='Product_price')  # Field name made lowercase.
    product_amount_instock = models.IntegerField(db_column='Product_amount_instock')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'product'
