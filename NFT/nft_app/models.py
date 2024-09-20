from django.db import models

class NFT(models.Model):
    token_id = models.IntegerField(unique=True)
    uri = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    is_listed = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"NFT {self.token_id} - {self.owner}"

