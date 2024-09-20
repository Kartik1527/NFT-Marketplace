from django.http import JsonResponse
from .web3_helper import mint_nft, list_nft, purchase_nft
from .models import NFT
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@csrf_exempt
def mint_nft_view(request):
    if request.method == 'POST':
        user_address = request.POST.get('address')
        uri = request.POST.get('uri')

        if not user_address or not uri:
            return JsonResponse({'error': 'Missing address or uri'}, status=400)

        tx_hash = mint_nft(user_address, uri)
        return JsonResponse({'transaction_hash': tx_hash})

def list_nft_view(request):
    if request.method == 'POST':
        nft_id = request.POST['nft_id']
        price = request.POST['price']
        tx_hash = list_nft(nft_id, price)
        return JsonResponse({'transaction_hash': tx_hash})

def purchase_nft_view(request):
    if request.method == 'POST':
        user_address = request.POST['address']
        nft_id = request.POST['nft_id']
        private_key_user = request.POST['private_key']
        value = request.POST['value']
        tx_hash = purchase_nft(user_address, private_key_user, nft_id, value)
        return JsonResponse({'transaction_hash': tx_hash})

def user_nfts_view(request, user_address):
    nfts = NFT.objects.filter(owner=user_address)
    nfts_data = [{'token_id': nft.token_id, 'uri': nft.uri, 'price': nft.price} for nft in nfts]
    return JsonResponse({'nfts': nfts_data})

def available_nfts_view(request):
    nfts = NFT.objects.filter(is_listed=True)  # Assuming `is_listed` is a field indicating if the NFT is for sale
    nfts_data = [{'token_id': nft.token_id, 'uri': nft.uri, 'price': nft.price, 'owner': nft.owner} for nft in nfts]
    return JsonResponse({'nfts': nfts_data})
