# NBS - Movie Recommendation System

## RESTful APIs


## API Reference

#### Register

```http
  POST /api/v1/register
```

| Parameter | Type     |           
| :-------- | :------- |
| `username` | `string` | 
| `email` | `string` | 
| `password` | `string` |
| `birth` | `Date (YYYY-MM-DD)`|
| `gender` | `int` | 
| `name` | `string` | 


##### Request

```javascript
  {
    "username" : "abc",
    "password" : "abcde",
    "email" : "abcd@gmail.com",
    "birth": "2000-01-01",
    "gender" : 0,
    "name" : "mencoba tes"
}
```

##### Response

```javascript
  {
    "status" : 201,
    "message" : "account created"
  }  
```

#### Login

```http
  POST /api/v1/login
```

| Parameter | Type     |           
| :-------- | :------- |
| `email` | `string` | 
| `password` | `string` |


##### Request

```javascript
  {
    "email" : "test@gmail.com",
    "password" : "abcdefg",
}
```

##### Response

```javascript
  {
    "token" : "${token}"
  }  
```

#### Search Movies

```http
  GET /api/v1/movie?name=kungfu
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Movie name |
| `include_adult` | `boolean` | Including adult movie |
| `language` | `string` | Language of the movie |
| `page` | `string` | Page of the movie list |

##### Request
```javascript
{

}
```
##### Response
```javascript
{
    page: 1,
    results: [
        {
            adult: false,
            backdrop_path: "/7d8OQyL43PVhhsnyBij6pN1y39A.jpg",
            genre_ids: [
                18
            ],
            id: 299848,
            original_language: "pl",
            original_title: "Kung-fu",
            overview: "A well-regarded engineer in a big enterprise is hounded by trumped up attacks on his integrity when he delves too deeply into how bonuses are handled by the management. He gets into an argument with the guard, is arrested and subsequently fired. An old friend, a journalist, tries to sort things out but the victim's stubbornness and past problems with his wife lead to lossess by both.",
            popularity: 8.05,
            poster_path: "/8lbhGDqavuV5SL2qPKQ04AVNt0x.jpg",
            release_date: "1980-03-17",
            title: "Kung-fu",
            video: false,
            vote_average: 6.3,
            vote_count: 3
        }
    ]
}
```
#### Get Movie with List of Ids

```http
  POST /api/v1/movie/id
```

##### Request
```javascript
{
   "movieIds": ["654", "655"]
}
```
##### Response
```javascript
{
    "movies": [
        {
            "adult": false,
            "backdrop_path": "/pxkQAIhC7LXN5s5B23lnvCMgva5.jpg",
            "belongs_to_collection": null,
            "budget": 910000,
            "id": 654,
            .....
        },
        {
            "adult": false,
            "backdrop_path": "/moTOuNKnM2phZCYPF49Y1Hb7WJj.jpg",
            "belongs_to_collection": null,
            "budget": 1750000,
            "id": 655,
            .....
        }
    ]
}
```

#### Get Movies by Genre

```http
  GET /api/v1/movie/genre?genre=action
```

| Query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `genre` | `string` | **Required**. Genre of the movie|
| `page` | `string` | Page of the movie list |

##### Request
```javascript
{

}
```
##### Response

```javascript
{
    page: 1,
    results: [
        {
        adult: false,
        backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
        genre_ids: [
            878,
            12,
            28
        ],
        id: 653346,
        original_language: "en",
        original_title: "Kingdom of the Planet of the Apes",
        overview: "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
        popularity: 5180.717,
        poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
        release_date: "2024-05-08",
        title: "Kingdom of the Planet of the Apes",
        video: false,
        vote_average: 6.895,
        vote_count: 906
        }
    ]
}
```

#### Get Movie

```http
  GET /api/v1/movie/id/:movieId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movieId` | `string` | **Required**. ID of the movie|

##### Request
```javascript
{

}
```
##### Response

```javascript
{
    adult: false,
    backdrop_path: "/3d8Y4q172YFp2obUdfMjyErB7eU.jpg",
    belongs_to_collection: {
        id: 389767,
        name: "My Big Fat Greek Wedding Collection",
        poster_path: "/oalS0sTGzk2mgiAyOQ5iVR4juJC.jpg",
        backdrop_path: "/UzzUEBULGUuk695tZhLO9xShxV.jpg"
    },
    budget: 5000000,
    genres: [
        {
            id: 35,
            name: "Comedy"
        },
        {
            id: 18,
            name: "Drama"
        },
        {
            id: 10749,
            name: "Romance"
        }
    ],
    homepage: "",
    id: 8346,
    imdb_id: "tt0259446",
    origin_country: [
        "CA",
        "US"
    ],
    original_language: "en",
    original_title: "My Big Fat Greek Wedding",
    overview: "A young Greek woman falls in love with a non-Greek and struggles to get her family to accept him while she comes to terms with her heritage and cultural identity.",
    popularity: 15.387,
    poster_path: "/ztc05ym0T3stnBpRHdxEs3Zwsmp.jpg",
    production_companies: [
        {
            id: 12026,
            logo_path: "/l1Y8SRH3EaElU2niZQLT3I8tOFp.png",
            name: "Gold Circle Films",
            origin_country: "US"
        },
        {
            id: 3268,
            logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png",
            name: "HBO",
            origin_country: "US"
        },
        {
            id: 95018,
            logo_path: null,
            name: "MPH Entertainment Productions",
            origin_country: ""
        },
        {
            id: 4171,
            logo_path: "/ip8rzankhLLhJGGkvfCirfUM26d.png",
            name: "Playtone",
            origin_country: "US"
        }
    ],
    production_countries: [
        {
            iso_3166_1: "CA",
            name: "Canada"
        },
        {
            iso_3166_1: "US",
            name: "United States of America"
        }
    ],
    release_date: "2002-04-19",
    revenue: 368744044,
    runtime: 95,
    spoken_languages: [
        {
            english_name: "Greek",
            iso_639_1: "el",
            name: "ελληνικά"
        },
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English"
        }
    ],
    status: "Released",
    tagline: "Love is here to stay... so is her family.",
    title: "My Big Fat Greek Wedding",
    video: false,
    vote_average: 6.493,
    vote_count: 2055,
    trailerUrl: "https://www.youtube.com/watch?v=O2mecmDFE-Q"
}
```

#### Like Movie

```http
  POST /api/v1/movie/id/:movieId/like
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movieId` | `string` | **Required**. ID of the movie|

##### Request
```javascript
{

}
```
##### Response

```javascript
{
    "message": "Movie liked successfully",
    "movie": "8346"
}
```

#### Unlike Movie

```http
  DELETE /api/v1/movie/id/:movieId/like
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movieId` | `string` | **Required**. ID of the movie|

##### Request
```javascript
{

}
```
##### Response

```javascript
{
    "message": "Movie unliked successfully",
    "movie": "8346"
}
```

#### Get Movie Rating from C24-MR01 User

```http
  GET /api/v1/movie/id/:movieId/rate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movieId` | `string` | **Required**. ID of the movie|

##### Request
```javascript
{

}
```
##### Response

```javascript
{
    "ratings": {
        "${userId}": ${rating},
        "0rkTo09ySX": 80
    }
}
```

#### Rate Movie

```http
  POST /api/v1/movie/id/:movieId/rate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movieId` | `string` | **Required**. ID of the movie|

##### Request
```javascript
{
    "rating": 75
}
```
##### Response

```javascript
{
    "message": "Rating updated successfully",
    "movie": "8234464"
}
```

#### Update Movie's Rate

```http
  PUT /api/v1/movie/id/:movieId/rate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movieId` | `string` | **Required**. ID of the movie|

##### Request
```javascript
{
    "rating": 75
}
```
##### Response

```javascript
{
    "message": "Rating updated successfully!",
    "movie": "8234464"
}
```
