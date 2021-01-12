## Introduction
Completed Phone book challenge according to coding challenge guidelines.

### Technology stack used
  - JavaScript, ES6+
  - TypeScript (with TSLint)
  - ExpressJS
  - Knex (SQL query builder)
  - Json web token (JWT)
  - Express validator
  
## Accessing the hosted environment
  - The application is hosted on Heroku, on the following link:
    - https://chalkboard-phonebook-challenge.herokuapp.com
  
## Start server locally
Install the dependencies and start the server.

```
npm install
npm run build || npm run build-ts || npm run watch-ts
npm start
```

## Database
PostgreSQL is used as the application database which is **hosted on herouku**, the credentials to access the DB are in the **.env file** (located at the root of application)

## Json web token (JWT)

To get **access token** for a user, you have to Login by the verified account which is **already created** for you (see the request payload below). 

`POST https://chalkboard-phonebook-challenge.herokuapp.com/api/user/login`

| Request Header      | Value   | 
|:--------------|:----------------------------------|
| `Content-Type`      | **application/json** |

#### Request
	{
		"email":"muhammadumairkhanyz@gmail.com",
		"password":"abc123"
	}

#### Response

	{
		"status": 200,
		"name": "Success",
		"message": "logged in successfully",
		"data": {
			"user": {
				"id": "a550c251-9410-4c1e-a19b-07f832713596",
				"email": "muhammadumairkhanyz@gmail.com"
			},
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp..."
		}
	}

> The  **accessToken** will be used to access **Contact APIs**.


## Contact APIs
Put the **access token** in the request headers as **Authorization**, then use the following APIs to get required results.

### Contact List
It will list out all the contacts as per request params.

`GET https://chalkboard-phonebook-challenge.herokuapp.com/api/contact/all?sortField=creation_stamp&sortOrder=desc&offset=0&limit=20`

| Request Headers      | Values   | 
|:--------------|:----------------------------------|
| `Authorization`      | **accessToken** |
| `Content-Type`      | **application/json** |

> If the params are not provided in the URL then the default param values will be considered.

| Request Params      | Options                       | Defaults |
|:--------------|:----------------------------------|
| `sortField`      | name, work_phone, home_phone, other_phone, creation_stamp, modification_stamp | creation_stamp |
| `sortOrder`    | asc, desc | desc |
| `offset` | any number required for pagination | 0 |
| `limit`      | any number required for pagination | 50 | |

#### Response

	{
    "status": 200,
    "name": "Success",
    "message": "contacts retrieved successfully",
    "data": [
        {
            "id": "bc9213f8-a1f0-47fe-96c7-13e7031c5537",
            "name": "Allison Travis",
            "work_phone": "612-393-0029",
            "home_phone": "612-321-0047",
            "other_phone": "912-927-1215",
            "email": "AEA@anet.com",
            "mailing_address": "Cecilia Chapman 711-2880 Nulla St.Mankato Mississippi 96522",
            "creation_stamp": "2021-01-12T03:50:59.083Z",
            "modification_stamp": null
         } ...
	  ]
	}

------------


###Create Contact
To create a contact, its mandontary to add **name, email, work_phone, home_phone and mailing_address**.

`POST https://chalkboard-phonebook-challenge.herokuapp.com/api/contact/create`

| Request Header      | Value    | 
|:--------------|:----------------------------------|
| `Authorization`      | **accessToken** |
| `Content-Type`      | **application/json** |

#### Request

	{
    "name": "Rowan Lloyd",
    "email": "phizntrg@verizon.net",
    "work_phone": "1 496 0999",
    "other_phone": "1 496 0999",
    "home_phone": "131 496 0999",
    "mailing_address": "East 143 Railway Street ARMAGH BT61 7HT"
	}

#### Response

	{
    "status": 200,
    "name": "Success",
    "message": "contact created successfully",
    "data": {
        "id": "5acf33c7-55a2-4ee7-9dbd-b3ad1d67a189"
   	 }
	}

------------


### Update Contact
You may update any field of a contact, just pass in the field name you want to update.

`PUT https://chalkboard-phonebook-challenge.herokuapp.com/api/contact/update/:id`

| Request Header      | Value    | 
|:--------------|:----------------------------------|
| `Authorization`      | **accessToken** |
| `Content-Type`      | **application/json** |

| Request Param   | Values                       |
|:--------------|:----------------------------------|
| `:id`      | Contact id of the user | |

#### Request

        {
        "name": "Allison Travis"
        }
> In this case it is only updating the contact name.

#### Response

        {
        "status": 200,
        "name": "Success",
        "message": "contact updated successfully",
        "data": {
            "id": {
                "id": "bc9213f8-a1f0-47fe-96c7-13e7031c5537",
                "name": "Allison Travis",
                "work_phone": "612-393-0029",
                "home_phone": "612-321-0047",
                "other_phone": "912-927-1215",
                "email": "AEA@anet.com",
                "mailing_address": "Cecilia Chapman 711-2880 Nulla St.Mankato Mississippi 96522",
                "creation_stamp": "2021-01-12T03:50:59.083Z",
                "modification_stamp": null
            }
        }
        }
> It will return the contact which is effected by the update.

------------


### Delete Contact
To delete a contact just pass in the contact id to be deleted

`DELETE https://chalkboard-phonebook-challenge.herokuapp.com/api/contact/delete/:id`

| Request Header      | Value    | 
|:--------------|:----------------------------------|
| `Authorization`      | **accessToken** |

| Request Param   | Values                       |
|:--------------|:----------------------------------|
| `:id`      | Contact id of the user | |

#### Response
        {
        "status": 200,
        "name": "Success",
        "message": "contact deleted successfully",
        "data": {
            "id": "bc9213f8-a1f0-47fe-96c7-13e7031c5537"
            }
        }

------------


## Express Validator
[express validator ](https://express-validator.github.io/docs/) is used to validate the request data. It is a very useful library that help you validate the request data.
Initializing express validator in server.ts file:
```sh
this.app.use(expressValidator());
```
Example:
You can check the userController.ts file for example:

	 req.checkBody({
        email: {
          notEmpty: true,
          errorMessage: "Email is required",
        },
        password: {
          notEmpty: true,
          errorMessage: "Password is required",
        },
      });

      const validateResults: any = await req.getValidationResult().catch(next);

      if (validateResults.array().length > 0) {
        return next(new BadRequest(validateResults.array()[0].msg));
      }

