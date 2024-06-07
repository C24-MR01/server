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


#### request

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

#### response

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


#### request

```javascript
  {
    "email" : "test@gmail.com",
    "password" : "abcdefg",
}
```

#### response

```javascript
  {
    "token" : "euy"
  }  
```
