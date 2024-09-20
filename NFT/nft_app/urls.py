from django.urls import path
from .views import mint_nft_view, list_nft_view, purchase_nft_view, user_nfts_view, available_nfts_view

urlpatterns = [
    path('mint_nft/', mint_nft_view, name='mint_nft'),
    path('list_nft/', list_nft_view, name='list_nft'),
    path('purchase_nft/', purchase_nft_view, name='purchase_nft'),
    path('user_nfts/<str:user_address>/', user_nfts_view, name='user_nfts'),
    path('available_nfts/', available_nfts_view, name='available_nfts'),
]