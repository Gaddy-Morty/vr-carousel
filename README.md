# imageCarousel

## How to run
1) npm run seed
2) npm run build
3) npm run start

### Endpoints
#### GET /listings/:listingId/photos/
>req.params
```sh
{
  listingId: 5643a1f9766bcf0fc0b26f14
}
```

>Response (Content-Type: application/json)
```sh
{
  photos: [
		{
			photo_url_path: String,
			caption: String,
			order: Number
		},
		...
	]
}
```

#### POST /listings/:id/photos/
>req.params
```sh
{
  listingId: 5643a1f9766bcf0fc0b26f14
}
```

>Body (Content-Type: application/json)
```sh
{
  photo_url_path: String,
  caption: String,
  order: Number
}
```

#### PATCH /listings/:id/photos/:id/
>req.params
```sh
{
  listingId: 5643a1f9766bcf0fc0b26f14,
  photoId: 56439adc766bcf49a0639992
}
```

>Body (Content-Type: application/json)
```sh
{
  photo_url_path: String,
  caption: String,
  order: Number
}
```

#### DELETE /listings/:id/photos/:id/
>req.params
```sh
{
  listingId: 5643a1f9766bcf0fc0b26f14,
  photoId: 56439adc766bcf49a0639992
}
```