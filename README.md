# URL Shortener
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

This application allows to use a code and a link to create a shortened url and
track metrics, ranking links by their click accesses.

## What's new I've learned

- How to perform ranking with **redis** and understand more about the tool.

## How to run

### Backend
1. In the project directory go inside backend and run `docker compose up -d`
2. In the project directory go insde backend and run `npm run setup` to create database schema.
2. In the project directory go inside backend and run `npm i` and then `npm run dev`

## API *Endpoints*

**GET LINK**
```bash
    GET /:code
```
Replace **:code** with the code you created to be redirected to the original link.

**GET LINKS**
```bash
    GET /api/links
```
To list all codes and links created, ordered by creation date.

**POST LINK**
```bash
    PÓST /api/links
```
```bash

{
    "code": "wiki",
    "url": "https://www.wikipedia.org/"
}
```
To create a shortened link associated with a specified code.

**GET METRICS**
```bash
    GET /api/metrics
```
To list the top 50 links by the number of accesses.