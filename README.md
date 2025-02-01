## 🚀 About Me

Hi there I'm Abdullatif a full stack developer with Experties in Reactjs, TypeScript, Nodejs, MongoDB

# Through My Eyes - MERN Blog WebApp

"Through My Eyes" is a MERN stack blog app where React with TypeScript is used for the frontend, Node.js for the backend, and MongoDB for the database. Admins can create blogs, while users can read, like, and comment on them, creating an interactive and engaging platform for sharing and discussing content.

- Website Link :- https://through-my-eyes.vercel.app/

- Admin Account :- you have to create an account and manually change "isAdmin = true" in your database.

## Tech Stack

**Client:** React, TypeScript, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB, Mongoose

## Optimizations

- In this project i am using React with TypeScript, React Form Hook and React Query(TanStack Query).

- Now days in React, React Hook Form simplifies form handling and validation , reducing boilerplate code.

- React Query streamlines data fetching and caching, optimizing network requests. Together, they enhance development efficiency and improve application performance, providing a seamless user experience in React applications.

## Run Locally

Clone the project

```bash
  git clone https://github.com/latifniz/mern-blog-app.git
```

Go to the project directory

```bash
  cd mern-blog-app
```

Go to the Client directory

```bash
  cd client
```

Install Client dependencies

```bash
  npm install
```

Start the Client App

```bash
  npm run dev
```

Go to the Server directory

```bash
  cd server
```

Install Server dependencies

```bash
  npm install
```

Start the Server

```bash
  npm run dev
```

## Environment Variables

1. Create .env file in both client and server folders
   To run this project, you will need to add the following environment variables to your .env file

Frontend ENV:

`VITE_API_BASE_URL`

`VITE_STRIPE_PUB_KEY`

`VITE_FIREBASE_API_KEY`

`VITE_FIREBASE_AUTH_DOMAIN`

`VITE_FIREBASE_PROJECT_ID`

`VITE_FIREBASE_STORAGE_BUCKET`

`VITE_FIREBASE_MESSAGING_SENDER_ID`

`VITE_FIREBASE_APP_ID`

`VITE_CLOUDINARY_CLOUD_NAME`

`VITE_CLOUDINARY_UPLOAD_PRESET`

Server ENV:

`NODE_ENV` (for production or development)

`FRONDEND_LINK` (where the requests will come from? to the server?)

`DATABASE_URL ` (your mongoDB Server Url)

`ACCESS_TOKEN_SECRET` (your jwt secret)

`ACCESS_TOKEN_EXPIRY` (jwt token expiry. example "1d")

`REFRESH_TOKEN_SECRET` (your jwt secret for a refresh token)

`REFRESH_TOKEN_EXPIRY` (jwt token expiry. example "30d")

`CLOUDINARY_CLOUD_NAME` ( you have to create this in cloudinary dashboard)

`CLOUDINARY_API_KEY` (you will get this after registration at cloudinary)

`CLOUDINARY_API_SECRET` (you will get this after registration at cloudinary)

# Note

You have to create accounts on firebase and cloudinary to get these variables.
firebase bucket storage is not free so we will use cloudinary for image storage.

## 🔗 Social Media Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdullatif-nizamani-8537731b6)

## Authors

- [@latifniz](https://www.github.com/latifniz)
