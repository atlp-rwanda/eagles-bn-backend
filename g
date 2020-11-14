{
  "swagger": "2.0",
  "info": {
      "version": "1.0.0.",
      "title": "BeareFoot Nomad",
      "description": "BeareFoot nomad is web Application will it solve the problems bearefoot nomad they are facing",
      "license": {
          "name": "Bearefoot Nomad",
          "url": "https://opensource.org/license/NIT"
      }
  },
  "basePath": "/api",
  "tags": [{
          "name": "Users",
          "description": "Documentation of of BeareFoot User's operations"
      },
      {
          "name": "Trips",
          "description": "Documentation of of BeareFoot Trips's operations"
      },
      {
          "name": "Social Auth",
          "description": ""
      }
  ],
  "schemes": ["http", "https"],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "paths": {
      "/user/auth/google": {
          "get": {
              "tags": ["Social Auth"],
              "summary": "Login with google. Please you need to run this in it's own tab",
              "responses": {
                  "200": {
                      "description": "Ok"
                  },
                  "500": {
                      "description": "Server error"
                  }
              }
          }
      },
      "/user/forgetPassword": {
          "post": {
              "tags": ["users"],
              "summary": "Forgot Password",
              "parameters": [{
                  "name": "body",
                  "in": "body",
                  "required": true,
                  "schema": {
                      "$ref": "#/definitions/users"
                  }
              }],
              "produces": ["application/json"],
              "responses": {
                  "200": {
                      "description": "ok"
                  },
                  "400": {
                      "description": "failed to send email."
                  }
              }
          }
      },
      "/user/auth/facebook": {
          "get": {
              "tags": ["Social Auth"],
              "summary": "Login with facebook. Please you need to run this in it's own tab",
              "responses": {
                  "500": {
                      "description": "Server error"
                  }
              }
          }
      },
      "/user/signup": {
          "post": {
              "tags": ["Users"],
              "summary": "user signup",
              "description": "",
              "consumes": ["application/x-www-form-urlencoded"],
              "produces": ["application/json"],
              "parameters": [{
                      "in": "formData",
                      "name": "first_name",
                      "type": "string",
                      "required": true
                  },
                  {
                      "in": "formData",
                      "name": "last_name",
                      "type": "string",
                      "required": true
                  },
                  {
                      "in": "formData",
                      "name": "email",
                      "type": "string",
                      "required": true
                  },
                  {
                      "in": "formData",
                      "name": "password",
                      "type": "string",
                      "required": true
                  },
                  {
                      "in": "formData",
                      "name": "confirmPassword",
                      "type": "string",
                      "required": true
                  }
              ],
              "responses": {
                  "201": {
                      "description": "User created successfully",
                      "schema": {
                          "$ref": "#/definitions/Users"
                      }
                  },
                  "400": {
                      "description": "Bad Request"
                  }
              }
          }
      },
      "/user/login": {
          "post": {
              "tags": ["Users"],
              "summary": "user login",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [{
                  "in": "body",
                  "name": "body",
                  "schema": { "$ref": "#/definitions/login" },
                  "required": true
              }],
              "responses": {
                  "201": {
                      "description": "User logged in successfully"
                  },
                  "400": {
                      "description": "Bad Request"
                  }
              }
          }
      },
      "/user/roles/{id}": {
          "put": {
              "tags": ["Users"],
              "summary": "update user role",
              "description": "updating user role if logged in as super admin",
              "consumes": ["multipart/form-data"],
              "produces": ["application/json"],
              "parameters": [
                  {
                  "name": "auth-token",
                  "in": "header",
                  "required": true,
                  "type": "string"
                  }, 
                  {
                  "name": "id",
                  "in": "path",
                  "required": true,
                  "type": "string"
                  },
                  {
                  "name": "role",
                  "in": "formData",
                  "required": false,
                  "type": "string"
                  }
              ],
              "responses": {
                  "200": {
                      "description": "User role updated successfully"
                  },
                  "400": {
                      "description": "Bad entry"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },
                  "403": {
                      "description": "Not Allowed"
                  },
                  "500": {
                      "description": "Internal Server Error"
                  }
              }
          }
      },
      "/user/resetPassword/{token}/{email}": {
          "put": {
              "tags": ["users"],
              "summary": "reset Password",
              "parameters": [{
                  "name": "token",
                  "in": "path",
                  "required": true,
                  "type": "string"
              }],
              "400": {
                  "description": "Bad Request"
              }
          }
      },
      "/user/logout": {
          "post": {
              "tags": ["Users"],
              "summary": "logging out existing user",
              "description": "logging out user if exist in our database and is currently logged in",
              "consumes": ["multipart/form-data"],
              "produces": ["application/json"],
              "parameters": [{
                  "name": "auth-token",
                  "in": "header",
                  "required": true,
                  "type": "string"
              }],
              "responses": {
                  "200": {
                      "description": "User logged out successfully"
                  },
                  "400": {
                      "description": "Not refresh token provided"
                  },
                  "401": {
                      "description": "Unauthorized"
                  },

                  "500": {
                      "description": "Internal Server Error"
                  }
              }
          }
      },
      "/user/email-verification/{emailVerificationToken}": {
          "put": {
              "tags": ["Users"],
              "summary": "Verify user ",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [{
                  "in": "path",
                  "name": "emailVerificationToken",
                  "type": "string",
                  "required": true
              }],
              "responses": {
                  "200": {
                      "description": "User confirmed Successfully!"
                  },
                  "401": {
                      "description": "Invalid token"
                  },
                  "404": {
                      "description": "user  account doesn't exist"
                  }
              }
          }
      },
      "/trips": {
          "get": {
              "tags": ["Trips"],
              "summary": "Get all trips",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [{
                  "in": "header",
                  "name": "auth-token",
                  "type": "string",
                  "required": true
              }],
              "responses": {
                  "200": {
                      "description": "User confirmed Successfully!"
                  },
                  "401": {
                      "description": "Invalid token"
                  }
              }
          },
          "post": {
              "tags": ["Trips"],
              "summary": "Create a trip",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [{
                  "in": "body",
                  "name": "body",
                  "schema": {
                      "$ref": "#/definitions/Trip"
                  },
                  "required": true
              }],
              "responses": {
                  "201": {
                      "description": "Trip successfully created!"
                  },
                  "401": {
                      "description": "Invalid token"
                  }
              }
          }
      },
      "/trips/{tripId}": {
          "patch": {
              "tags": ["Trips"],
              "summary": "Update a trip",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [{
                      "in": "path",
                      "name": "tripId",
                      "type": "string",
                      "required": true
                  },
                  {
                      "in": "body",
                      "name": "body",
                      "schema": { "$ref": "#/definitions/Trip" },
                      "required": true
                  },
                  {
                      "in": "header",
                      "name": "auth-token",
                      "type": "string",
                      "required": true
                  }
              ],
              "responses": {
                  "200": {
                      "description": "Trip updated Successfully!"
                  },
                  "401": {
                      "description": "Invalid token"
                  }
              }
          },
          "get": {
              "tags": ["Trips"],
              "summary": "Get a single trip",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [{
                      "in": "path",
                      "name": "tripId",
                      "type": "string",
                      "required": true
                  },
                  {
                      "in": "header",
                      "name": "auth-token",
                      "type": "string",
                      "required": true
                  }
              ],
              "responses": {
                  "200": {
                      "description": "Trip updated Successfully!"
                  },
                  "401": {
                      "description": "Invalid token"
                  }
              }
          }
      },
      "/accommodations": {
          "post": {
              "security": [{
                  "AuthToken": []
              }],
              "tags": [
                  "Accommodations"
              ],
              "summary": "Create a new accommodation",
              "consumes": [
                  "multipart/form-data"
              ],
              "produces": [
                  "application/json"
              ],
              "parameters": [{
                      "in": "formData",
                      "name": "name",
                      "description": "Accommodation request title",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "description",
                      "description": "Accommodation request description",
                      "type": "string"
                  },
                  {
                      "name": "images",
                      "in": "formData",
                      "type": "file"
                  },
                  {
                      "in": "formData",
                      "name": "lat",
                      "description": "latitude",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "long",
                      "description": "Longitude",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "services",
                      "description": "Ex: [\" Cooking \"]",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "amenities",
                      "description": "Ex: [\" Sleep \"]",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "location_id",
                      "description": "Location ID",
                      "type": "integer"
                  }
              ],
              "responses": {
                  "201": {
                      "description": "Accommodation created successfully!"
                  },
                  "400": {
                      "description": "Validation fails"
                  }
              }
          },
          "get": {
              "summary": "Returns a list of accommodations.",
              "description": "This will list all created accommodations.",
              "tags": [
                  "Accommodations"
              ],
              "produces": [
                  "application/json"
              ],
              "responses": {
                  "200": {
                      "description": "OK"
                  },
                  "500": {
                      "description": "Server error"
                  }
              }
          }
      },
      "/accommodations/{id}": {
          "get": {
              "tags": [
                  "Accommodations"
              ],
              "summary": "Find accommodation by ID",
              "description": "Returns a single accommodation",
              "produces": [
                  "application/json"
              ],
              "parameters": [{
                  "name": "id",
                  "in": "path",
                  "description": "ID of accommodation to return",
                  "required": true,
                  "type": "integer"
              }],
              "responses": {
                  "200": {
                      "description": "successful operation",
                      "schema": {
                          "$ref": "#/definitions/accommodation"
                      }
                  },
                  "404": {
                      "description": "Accommodation not found"
                  }
              }
          },
          "put": {
              "security": [{
                  "AuthToken": []
              }],
              "tags": [
                  "Accommodations"
              ],
              "summary": "Updates an accommodation",
              "description": "Update the accommodation",
              "consumes": [
                  "multipart/form-data"
              ],
              "produces": [
                  "application/json"
              ],
              "parameters": [{
                      "name": "id",
                      "in": "path",
                      "description": "ID of accommodation that needs to be updated",
                      "required": true,
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "name",
                      "description": "Accommodation request title",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "description",
                      "description": "Accommodation request description",
                      "type": "string"
                  },
                  {
                      "name": "images",
                      "in": "formData",
                      "type": "file"
                  },
                  {
                      "in": "formData",
                      "name": "lat",
                      "description": "latitude",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "long",
                      "description": "Longitude",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "services",
                      "description": "Ex: [\" Cooking \"]",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "amenities",
                      "description": "Ex: [\" Sleep \"]",
                      "type": "string"
                  },
                  {
                      "in": "formData",
                      "name": "location_id",
                      "description": "Location ID",
                      "type": "integer"
                  }
              ],
              "responses": {
                  "400": {
                      "description": "Invalid input"
                  },
                  "401": {
                      "description": "Unauthorized"
                  }
              }
          },
          "delete": {
              "security": [{
                  "AuthToken": []
              }],
              "tags": [
                  "Accommodations"
              ],
              "summary": "Deletes an accommodation",
              "description": "Delete a single accommodation",
              "produces": [
                  "application/json"
              ],
              "parameters": [{
                  "name": "id",
                  "in": "path",
                  "description": "Accommodation id to delete",
                  "required": true,
                  "type": "string"
              }],
              "responses": {
                  "404": {
                      "description": "Accommodation not found"
                  }
              }
          }
      },
      "/accommodation/{accommodationID}/rooms": {
          "parameters": [{
              "name": "accommodationID",
              "in": "path",
              "description": "ID of accommodation",
              "required": true,
              "type": "integer"
          }],
          "post": {
              "security": [{
                  "AuthToken": []
              }],
              "tags": [
                  "Rooms"
              ],
              "summary": "Create a new room",
              "consumes": [
                  "multipart/form-data"
              ],
              "produces": [
                  "application/json"
              ],
              "parameters": [{
                      "in": "formData",
                      "name": "price",
                      "description": "Room price",
                      "type": "integer"
                  },
                  {
                      "in": "formData",
                      "name": "details",
                      "description": "Room request details",
                      "type": "string"
                  },
                  {
                      "name": "images",
                      "in": "formData",
                      "type": "file"
                  }
              ],
              "responses": {
                  "201": {
                      "description": "Room created successfully!"
                  },
                  "400": {
                      "description": "Validation fails"
                  }
              }
          },
          "get": {
              "summary": "Returns a list of rooms.",
              "description": "This will list all created rooms.",
              "tags": [
                  "Rooms"
              ],
              "produces": [
                  "application/json"
              ],
              "responses": {
                  "200": {
                      "description": "OK"
                  },
                  "500": {
                      "description": "Server error"
                  }
              }
          }
      },
      "/accommodation/{accommodationID}/rooms/{roomID}": {
          "parameters": [{
                  "name": "accommodationID",
                  "in": "path",
                  "description": "ID of accommodation",
                  "required": true,
                  "type": "integer"
              },
              {
                  "name": "roomID",
                  "in": "path",
                  "description": "ID of room",
                  "required": true,
                  "type": "integer"
              }
          ],
          "get": {
              "tags": [
                  "Rooms"
              ],
              "summary": "Find room by ID",
              "description": "Returns a single room",
              "produces": [
                  "application/json"
              ],

              "responses": {
                  "200": {
                      "description": "successful operation",
                      "schema": {
                          "$ref": "#/definitions/room"
                      }
                  },
                  "404": {
                      "description": "Room not found"
                  }
              }
          },
          "put": {
              "security": [{
                  "AuthToken": []
              }],
              "tags": [
                  "Rooms"
              ],
              "summary": "Updates an room",
              "description": "Update the room",
              "consumes": [
                  "multipart/form-data"
              ],
              "produces": [
                  "application/json"
              ],
              "parameters": [{
                      "in": "formData",
                      "name": "price",
                      "description": "Room price",
                      "type": "integer"
                  },
                  {
                      "in": "formData",
                      "name": "details",
                      "description": "Room request details",
                      "type": "string"
                  },
                  {
                      "name": "images",
                      "in": "formData",
                      "type": "file"
                  }
              ],
              "responses": {
                  "400": {
                      "description": "Invalid input"
                  },
                  "401": {
                      "description": "Unauthorized"
                  }
              }
          },
          "delete": {
              "security": [{
                  "AuthToken": []
              }],
              "tags": [
                  "Rooms"
              ],
              "summary": "Deletes room",
              "description": "Delete a single room",
              "produces": [
                  "application/json"
              ],
              "responses": {
                  "404": {
                      "description": "Room not found"
                  }
              }
          }
      },
      "/trips/{id}/comment": {
          "post": {
              "tags": ["Trips"],
              "summary": "Create a comment on trip request ",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
      
              "parameters": [
              {
                  "in": "header",
                  "name": "auth-token",
                  "type": "string",
                  "required": true,
                  "description": "from logIn endpoint"
              },
      
              {
                  "in": "path",
                  "name": "id",
                  "type": "integer",
                  "required": true,
                  "description": "get it from trip table"
              },
              {
                  "in": "body",
                  "name": "body",
                  "schema": { "$ref": "#/definitions/comment" },
                  "required": true
              }
              ],
              "responses": {
                  "201": {
                      "description": "You created a comment Successfully!"
                  },
                  "400": {
                      "description": "TripId you provided doesn't exist!"
                  },
                  "500": {
                      "description": "Internal  error!"
                  }
              }
          }
      },
    
      "/trips/{tripId}/comments/{id}": {
        "delete": {
              "tags": ["Trips"],
              "summary": "Deleting a comment on trip request ",
              "description": "",
              "consumes": ["application/json"],
              "produces": ["application/json"],
              "parameters": [
              {
                  "in": "header",
                  "name": "auth-token",
                  "type": "string",
                  "required": true,
                  "description": "from logIn endpoint"
              },
              {
                  "in": "path",
                  "name": "tripId",
                  "required": true,
                  "description": "Get it from trip table"
              },
      
              {
                  "in": "path",
                  "name": "id",
                  "type": "string",
                  "required": true,
                  "description": "Get it from Comment table"
              }
              ],
              "responses": {
                  "200": {
                      "description": "You Successfully Deleted comment!"
                  },
                  "404": {
                      "description": "You can't delete such comment. Maybe Not Found in our Database!"
                  },
                  "500": {
                      "description": "Internal  error!"
                  }
              }
          }
        
      },
      "/accommodations/{accommodation_id}/ratings":{
        "get": {
          "tags": ["Ratings"],
          "summary": "Retrieving Rating",
          "description":"user retrieve Rating if he/she logged in and has been in that accommodation",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "name": "accommodation_id",
              "in": "path",
              "required": true,
              "type": "string"
        },
            {
            "name": "auth-token",
            "in": "header",
            "required": true,
            "type": "string"
        }
      ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/accommodations/{accommodation_id}/rating":{
        "post": {
          "tags": ["Ratings"],
          "summary": "creating Rating",
          "description":"user creating Rating if he/she logged in and has been in that accommodation",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "name": "accommodation_id",
              "in": "path",
              "required": true,
              "type": "string"
        },
            {
            "name": "auth-token",
            "in": "header",
            "required": true,
            "type": "string"
        },
              {
                "in": "body",
                "name": "body",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/Ratings"
                }
              }
      ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/accommodations/ratings/{id}":{
        "delete": {
          "tags": ["Ratings"],
          "summary": "Delete Rating",
          "description":"Delete Rating",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
        },
            {
            "name": "auth-token",
            "in": "header",
            "required": true,
            "type": "string"
        }
      ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/rooms/{room_id}/booking/":{
        "post": {
          "tags": ["Bookings"],
          "summary": "creating booking",
          "description":"user creating booking if he/she logged in",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "name": "room_id",
              "in": "path",
              "required": true,
              "type": "string"
        },
            {
            "name": "auth-token",
            "in": "header",
            "required": true,
            "type": "string"
        },
              {
                "in": "body",
                "name": "body",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/Bookings"
                }
              }
      ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/rooms/{room_id}/bookings/":{
        "get": {
          "tags": ["Bookings"],
          "summary": "getting all bookings",
          "parameters": [
            {
              "name": "room_id",
              "in": "path",
              "required": true,
              "type": "string"
        },
            {
            "name": "auth-token",
            "in": "header",
            "required": true,
            "type": "string"
        }],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
      "/rooms/bookings/{id}":{
        "patch": {
          "tags": ["Bookings"],
          "summary": "Update booking",
          "description":"user creating booking if he/she logged in",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "type": "string"
        },
            {
            "name": "auth-token",
            "in": "header",
            "required": true,
            "type": "string"
        },
              {
                "in": "body",
                "name": "body",
                "required": true,
                "schema": {
                  "$ref": "#/definitions/Bookings"
                }
              }
      ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      } ,
      "/rooms/booking/{id}":{
        "delete": {
          "tags": ["Bookings"],
          "summary": "Delete booking",
          "description":"user creating booking if he/she logged in",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
        {
          "name": "id",
          "in": "path",
          "required": true,
          "type": "string"
      },
      {
      "name": "auth-token",
      "in": "header",
      "required": true,
      "type": "string"
      }
      ],
          "responses": {
            "200": {
              "description": "Ok"
            },
            "500": {
              "description": "Server error"
            }
          }
        }
      },
    
      "/trips/{id}/comments/{tripId}": {
        "get": {
          "tags": ["Trips"],
          "summary": "Get a comment on trip request ",
          "description": "",
          "consumes": ["application/json"],
          "produces": ["application/json"],
          "parameters": [
            {
              "in": "header",
              "name": "auth-token",
              "type": "string",
              "required": true,
              "description": "from logIn endpoint"
            },
            {
              "in": "path",
              "name": "id",
              "required": true,
              "description": "get it from trip table"
            },
    
            {
              "in": "path",
              "name": "tripId",
              "type": "string",
              "required": true,
              "description": "get it from comment table"
            }
          ],
          "responses": {
            "200": {
              "description": "Here's the comment you are looking for!"
            },
    
            "404": {
              "description": "You can't get such comment. Maybe Not Found in our Database!"
            },
            "500": {
              "description": "Internal  error!"
            }
          }
        }
      }
  },
  "securityDefinitions": {
      "AuthToken": {
          "type": "apiKey",
          "name": "auth-token",
          "in": "header"
      }
  },
  "definitions": {
      "id": {
          "properties": {
              "uuid": {
                  "type": "string"
              }
          }
      },
      "comment":{
          
          "required": ["comment"],
          "properties": {
              "comment": {
                  "type": "string"
              }
          }
      },
      "user": {
          "type": "object",
          "properties": {
              "password": {
                  "type": "string"
              }
          }
      },
      "users": {
          "type": "object",
          "properties": {
              "email": {
                  "type": "string"
              }
          }
      },
      "Users": {
          "type": "object",
          "required": [
              "first_name",
              "last_name",
              "email",
              "role",
              "manager",
              "password",
              "confirmPassword"
          ],
          "properties": {
              "first_name": {
                  "type": "string"
              },
              "last_name": {
                  "type": "string"
              },
              "email": {
                  "type": "string"
              },
              "role": {
                  "type": "string"
              },
              "manager": {
                  "type": "string"
              },
              "password": {
                  "type": "string"
              },
              "confirmPassword": {
                  "type": "string"
              }
          }
      },
      "Trip": {
          "type": "object",
          "required": ["from", "to"],
          "properties": {
              "to": {
                  "type": "array",
                  "xml": {
                      "wrapped": true
                  },
                  "items": {
                      "type": "integer",
                      "xml": {
                          "name": "locationId"
                      }
                  }
              },
              "from": {
                  "type": "integer"
              },
              "departure_date": {
                  "type": "string"
              },
              "return_date": {
                  "type": "string"
              },
              "reasons": {
                  "type": "string"
              },
              "accommodation_id": {
                  "type": "integer"
              },
              "trip_type": {
                  "type": "string"
              }
          }
      },
      "emailVerification": {
          "properties": {
              "isConfirmed": { "type": "Boolean" }
          }
      },
      "login": {
          "type": "object",
          "properties": {
              "email": {
                  "type": "string"
              },
              "password": {
                  "type": "string"
              }
          }
      },
      "accommodation": {
          "type": "object",
          "required": [
              "name",
              "description",
              "images",
              "location_id",
              "host_id",
              "services",
              "amenities",
              "lat",
              "long"
          ],
          "properties": {
              "id": {
                  "type": "integer",
                  "example": 1
              },
              "name": {
                  "type": "string",
                  "example": "This is an accommodation"
              },
              "description": {
                  "type": "string",
                  "example": "These are some description"
              },
              "images": {
                  "type": "array"
              },
              "location_id": {
                  "type": "integer"
              },
              "host_id": {
                  "type": "integer"
              },
              "services": {
                  "type": "array"
              },
              "amenities": {
                  "type": "array"
              }
          }
      },
     "Bookings":{
       "type": "object",
       "properties": {
         "check_in_date":{
           "type": "string"
         },
         "check_out_date":{
           "type": "string"
         }
     
     }
   },
   "Ratings":{
    "type": "object",
    "properties": {
      "service_rate":{
        "type": "string"
            }
  
        }
    },
      "room": {
          "type": "object",
          "required": [
              "price",
              "accommodation_id"
          ],
          "properties": {
              "id": {
                  "type": "integer",
                  "example": 1
              },
              "price": {
                  "type": "integer",
                  "example": 5000
              },
              "details": {
                  "type": "string"
              },
              "images": {
                  "type": "array"
              }
          }
      }
  }

}








