# politico

[![Build Status](https://travis-ci.com/haywhyze/politico.svg?branch=ch-setup-ci-%23163504828)](https://travis-ci.com/haywhyze/politico)
[![Coverage Status](https://coveralls.io/repos/github/haywhyze/politico/badge.svg?branch=ch-setup-ci-%23163504828)](https://coveralls.io/github/haywhyze/politico?branch=ch-setup-ci-%23163504828)
[![Maintainability](https://api.codeclimate.com/v1/badges/b493c2924608712dbcf3/maintainability)](https://codeclimate.com/github/haywhyze/politico/maintainability)

Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.

## Motivation

The general elections in my country is just around the corner, hence, politics is a major talking points in the country right now. In a way to get in the mood of the season, it would make sense to help build a platform which both the politicians and the citizens can use.

## Expected Features

- Users can sign up.
- Users can login.
- Admin (electoral body) can create political parties.
- Admin (electoral body) can delete a political party.
- Admin (electoral body) can create different political offices .
- Users can vote for only one politician per political office .
- Users can see the results of election.
- User can reset password.
- A politician can create a petition against a concluded political office election.

---

## Prerequisites

[NodeJS](https://nodejs.org/) (>10.14.2) and [NPM](https://www.npmjs.com/) (>6.4.1) will be required to run this application.

---

## Installation

**Note:**

> As at the time of writing this, the application is still in development and the following commands might not behave as expected. This docs will be updated as soon as the application can be installed.

- Clone this repository and navigate into it.

`git clone https://github.com/haywhyze/politico.git && cd politico`

- Install dependencies.

`npm install`

- Edit .env.sample file to add a cloudinary url string and a google API key to have access to upload images to cloudinary and to use the google places API to autogenerate addresses. respectively. After that rename the file to `.env`

- Start the application.

`npm run start`

---

## Documentation

This application will be deployed on heroku where the following endpoints will be accessible

| Method                              | Functionality                                                                                 | Endpoint                     |
| ----------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------- |
| POST _/parties_                     | Create a political party                                                                      | `api/v1/parties`             |
| GET _/parties/\<party-id\>_         | Fetch a specific political party record                                                       | `api/v1/parties/:id`         |
| GET _/parties/_                     | Fetch all political parties records                                                           | `api/v1/parties/`            |
| PATCH _/parties/\<party-id\>/name_  | Edit the name of a specific political party                                                   | `api/v1/parties/:id`         |
| DELETE _/parties/\<party-id\>_      | Delete a specific political party                                                             | `api/v1/parties/:id`         |
| POST _/offices_                     | Create a political office                                                                     | `api/v1/offices`             |
| GET _/offices_                      | Fetch all political offices record                                                            | `api/v1/offices`             |
| GET _/offices/\<office-id\>_        | Fetch a particular political office                                                           | `api/v1/offices/:id`         |
| POST _/auth/signup_                 | Create a user account                                                                         | `api/v1/auth/signup`         |
| POST _/auth/login_                  | Login a user                                                                                  | `api/v1/auth/login`          |
| POST _/office/\<user-id\>/register_ | Register a user as a candidate running for a political office. Accessible by the admin alone. | `api/v1/office/:id/register` |
| POST _/votes/_                      | Vote for a candidate                                                                          | `api/v1/votes`               |
| POST _/office/\<office-id\>/result_ | Collate and fetch the result of specific office following a concluded election.               | `api/v1/office/:id/result`   |
| POST _/auth/reset_                  | Reset user password                                                                           | `api/v1/auth/reset`          |
| POST _/petitions/_                  | Create petitions challenging the outcome of a concluded election.                             | `api/v1/petitions`           |

### Response Specifications

#### POST _/parties_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ 
    {
      “id” : Integer , // id of newly created party
      “name” : String ,
    } 
  ]
}
```

#### GET _/parties/\<party-id\>_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “id” : Integer , // political party unique id
    “name” : String ,
    “logoUrl” : String ,
  } ]
}
```

#### GET /parties/

Response spec:

```javascript
{
  {
    “status” : Integer ,
    “data” : [
      {
        “id” : Integer , // political party unique id
        “name” : String ,
        “logoUrl” : String ,
      } , {
        “id” : Integer , // political party unique id
        “name” : String ,
        “logoUrl” : String ,
      } , {
        “id” : Integer , // political party unique id
        “name” : String ,
        “logoUrl” : String ,
      } , {
        “id” : Integer , // political party unique id
        “name” : String ,
        “logoUrl” : String ,
      }
    ]
}
```

#### PATCH _/parties/\<party-id\>/name_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “id”: Integer , // political party unique id
    “name” : String , // the new name of the political party
  } ]
}
```

#### DELETE _/parties/\<party-id\>_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “message” : String
  } ]
}
```

#### POST _/offices_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “id” : Integer , // id of newly created office
    “type” : String , // type of office
    “name” : String , // name of office
  } ]
}
```

#### GET _/offices_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [
    {
      “id” : Integer , // office record unique id
      “type” : String , // type of office
      “name” : String // name of office
    }, {
      “id” : Integer , // office record unique id
      “type” : String , // type of office
      “name” : String // name of office
    }, {
      “id” : Integer , // office record unique id
      “type” : String , // type of office
      “name” : String // name of office
    }
  ]
}
```

#### GET _/offices/\<office-id\>_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “id” : Integer , // office record unique id
    “type” : String , // type of office
    “name” : String // name of office
  } ]
}
```

#### POST _/auth/signup_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “token” : `45erkjherht45495783`,
    “user” : {....} // the user object
  } ]
}
```

#### POST _/auth/login_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “token” : `45erkjherht45495783`,
    “user” : {....} // the user object
  } ]
}
```

#### POST _/office/\<user-id\>/register_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “office” : Integer , // office unique id
    “user” : Integer // candidate unique id
  } ]
}
```

#### POST _/votes/_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “office” : Integer , // office unique id
    “candidate” : Integer , // politician unique id
    “voter” : Integer // voter unique id
  } ]
}
```

#### POST _/office/\<office-id\>/result_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [
    {
      “office” : Integer , // office unique id
      “candidate” : Integer , // candidate unique id
      “result” : Integer // total vote for the candidate
    }, {
      “office” : Integer , // office id
      “candidate” : Integer , // candidate unique id
      “result” : Integer // total vote for the candidate
    }, {
      “office” : Integer , // office primary key
      “candidate” : Integer , // politician primary key
      “result” : Integer // total vote for the candidate
    }
  ]
}
```

#### POST _/auth/reset_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “message” : `Check your email for password reset link`,
    “email” : String // email specified by user
  } ]
}
```

#### POST _/petitions/_

Response spec:

```javascript
{
  “status” : Integer ,
  “data” : [ {
    “id” : Integer , // petition unique id
    “office” : Integer , // office unique id
    “createdBy” : Integer , // unique id of user who created the petition
    “text” : String ,
    evidence : [String, String, ....] , //imageUrl, videoUrl
  } ]
}
```

---

## Testing the Application Locally

**Note:**

> As at the time of writing this, the application is still in development and the following commands might not behave as expected. This docs will be updated as soon as the application can be installed.

If the project has been cloned and navigated into as specified [above](#installation), you can run tests...

### Using POSTMAN

If you do not have POSTMAN installed, download [here](https://www.getpostman.com/)

- In the terminal start the application with `npm run start`

- On POSTMAN navigate to `localhost:3000/` and use the documentation [above](#documentation) as guide to access the endpoints.

### Using MOCHA

If you do not have mocha installed, you can install using npm with:
`npm -i mocha -g`
then you can run tests with:  
`npm run test`

---

## Technologies to be Used

- [NodeJS](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [Babel](https://babeljs.io/)

- [ESLint](https://eslint.org/)

- [Mocha](https://mochajs.org/) + [Chai](https://www.chaijs.com/)

---

## Acknowledgements

[Andela](https://andela.com/)

---

## Author

[Yusuf Ayo Abdulkarim](https://twitter.com/haywhyze)
