# Store page

View demo: [deployed version](https://auqpiro.github.io/jewelry-store/)

## Description

The test task involved developing a web application using the provided API to create a page that displays a list of products. For each product should be displayed id, name, price and brand .
### Requirements:
- display 50 products per page with the possibility of pagination (pagination) in both directions.
- ability to filter results using the provided API by name, price and brand
- output is only the first one product, even if other fields are different, in case when the API returns duplicates by id.
- output the error identifier to the console if the API returns an error and repeat the request.

### Technical details:
- Front-end development in ReactJS using modern practices and libraries.
- [API for interaction](https://github.com/ValantisJewelry/TestTaskValantis) between frontend and backend provided by the creators of the task
- The completed task is posted on github pages

## Features

### Setup

```bash
https://github.com/Auqpiro/jewelry-store.git
cd jewelry-store
make install
```

### Use case in development

Running EsLint

```bash
make lint
```

Running build

```bash
make build
```

Launch backend server with hot reload

```bash
make start
```

### Use case in deploy

Project uses variables environment. Set this in your deployment.

```bash
VITE_API_URL
VITE_SHIFT_FROM_UTC
```
