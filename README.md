# Bookie: Book Store

### Features
- Authentication: using JWT
- Authorization: Protected routes for access to resources.
- Global Error Handling
- Rate Limited APIs


### POSTMAN API DOCUMENTATION: [here](https://documenter.getpostman.com/view/24068251/2s9YXiY1rx)

### AWS EC2 VM API Endpoint: [https://bookie.devalan.tech/](https://bookie.devalan.tech/)

## RUNNING THE SERVER


1. Clone the repository:

```CMD
git clone https://github.com/alanansari/bookie.git
```
To run the server, you need to have NodeJS installed on your machine. If you don't have it installed, you can follow the instructions [here](https://nodejs.org/en//) to install it.



2. Install the dependencies: 

```CMD
npm install
```


3. Setup .env file in base directory:

```
PORT = '<port on which to run server>'
DB_URI = '<mongodb uri>'

JWT_ACCESS_KEY = '<key for json web tokens>'

# For sending otp mails
MAIL_ID = "<email id for sending mails>" 
MAIL_PASS = "<given password for email id>"
```


4. Run the backend server on localhost:

```CMD
npm start
```

5. Run on localhost:[PORT] (default: 3000)

