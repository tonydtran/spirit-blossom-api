# spirit-blossom-api

> Funny side project to create an Accounting app. Also a good opportuny for me to discover Feathers.js.
> Admin GUI will be built in React, it will come later in a separate repo.
> Client app will be built by @WendyJL in React/TypeScript.

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [yarn](https://yarnpkg.com/) installed.
2. Install your dependencies

    ```
    cd spirit-blossom-api
    yarn
    ```

3. From `/config`, duplicate the `default.json` file and rename it as `development.json`.

4. Replace `authentication.secret` by something stronger.

5. Create an account and a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). It should take few minutes.

6. Once the cluster ready, connect it by using **application** method. Create a user for the cluster, then select `Node.js` as **Driver** and `3.6 or later` as **version**.

7. Copy the generated link into your `development.json` file in `mongodb` key as new value and replace `<password>` by the password you've just created few seconds ago and `<dbname>` by `spirit_blossom_dev`.

8. Get to **Network Access** on the left menu of MongoDB Atlas and add an IP address. Enter `0.0.0.0` as **Whitelist Entry** and confirm.

9. Start the server

    ```
    yarn dev
    ```

10. Server is running on `localhost:3030`.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ yarn global add @feathersjs/cli         # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
