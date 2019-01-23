# politico
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

- Start the application. 

`npm run start`

---

## Documentation

This application will be deployed on heroku where the following endpoints will be accessible

|Method|Functionality|Endpoint|
|--|--|--|
|POST */parties*|Create a political party|`api/v1/parties`|
|GET */parties/\<party-id\>*| Fetch a specific political party record| `api/v1/parties/:id`
|GET */parties/* | Fetch all political parties records| `api/v1/parties/`
|PATCH */parties/\<party-id\>/name* | Edit the name of a specific political party| `api/v1/parties/:id`
|DELETE */parties/\<party-id\>* | Delete a specific political party | `api/v1/parties/:id`
|POST */offices* | Create a political office| `api/v1/offices`
|GET */offices* | Fetch all political offices record | `api/v1/offices` 
| GET */offices/\<office-id\>* | Fetch a particular political office | `api/v1/offices/:id`
| POST */auth/signup* | Create a user account | `api/v1/auth/signup`
| POST */auth/login* | Login a user | `api/v1/auth/login`
| POST */office/\<user-id\>/register* | Register a user as a candidate running for a political office. Accessible by the admin alone. | `api/v1/office/:id/register`
|POST */votes/* | Vote for a candidate | `api/v1/votes` 
| POST */office/\<office-id\>/result* | Collate and fetch the result of specific office following a concluded election.| `api/v1/office/:id/result`
| POST */auth/reset* | Reset user password| `api/v1/auth/reset`
| POST */petitions/* |Create petitions challenging the outcome of a concluded election.| `api/v1/petitions` 

### Response Specifications

#### POST */parties*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“id” : Integer , // id of newly created party
		“name” : String ,
	} ]
}
```

#### GET */parties/\<party-id\>*
Response spec:
```JSON
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
```JSON
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
#### PATCH */parties/\<party-id\>/name*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“id”: Integer , // political party unique id
		“name” : String , // the new name of the political party
	} ]
}
```

#### DELETE */parties/\<party-id\>*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“message” : String
	} ]
}
```

#### POST */offices*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“id” : Integer , // id of newly created office
		“type” : String , // type of office
		“name” : String , // name of office
	} ]
}
```

#### GET */offices*
Response spec:
```json
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

#### GET */offices/\<office-id\>*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“id” : Integer , // office record unique id
		“type” : String , // type of office
		“name” : String // name of office
	} ]
}
```

#### POST */auth/signup*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“token” : “45erkjherht45495783”,
		“user” : {....} // the user object
	} ]
}
```

#### POST */auth/login*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“token” : “45erkjherht45495783”,
		“user” : {....} // the user object
	} ]
}
```

#### POST */office/\<user-id\>/register*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“office” : Integer , // office unique id
		“user” : Integer // candidate unique id
	} ]
}
```

#### POST */votes/*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“office” : Integer , // office unique id
		“candidate” : Integer , // politician unique id
		“voter” : Integer // voter unique id
	} ]
}
```

#### POST */office/\<office-id\>/result*
Response spec:
```json
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
#### POST */auth/reset*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“message” : `Check your email for password reset link`,
		“email” : String // email specified by user
	} ]
}
```
#### POST */petitions/*
Response spec:
```json
{
	“status” : Integer ,
	“data” : [ {
		“id” : Integer , // petition unique id
		“office” : Integer , // office unique id
		“createdBy” : Integer , // unique id of user who created the petition
		“text” : String ,
		“evidence” : [String, String, ....] , //imageUrl, videoUrl
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

- In the terminal start the application with  `npm run start`

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
