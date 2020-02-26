# imageCarousel

## How to run
1) npm run seed
2) npm run build
3) npm run start

## Endpoints

### Switching between databases
#### MongoDB
- Uncomment mongoose, GallerySchema, and module.exports in server/db/index.js
- Use the legacy routes for queries

#### Elasticsearch
- Uncomment Client, esclient, and module.exports in server/db/index.js
- Uncomment esmodels in controllers.js and comment mdbmodels
- Uncomment Elasticsearch data transformation in controllers.getAll

#### MariaDB
- Uncomment mdbmodels in controllers.js and comment esmodels
- Comment Elasticsearch data transformation in controllers.getAll

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
			order: Number,
      space_type: String,
      is_main: Boolean
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
  order: Number,
  space_type: String,
  is_main: Boolean
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
>Can have any of the following optional properties
```sh
{
  photo_url_path: String,
  caption: String,
  order: Number,
  space_type: String,
  is_main: Boolean
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
