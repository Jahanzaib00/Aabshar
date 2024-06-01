# Aabshar

## Overview

Aabshar is an application designed to log daily water intake and provide a history of water consumption. The project includes a backend built with Node.js and Express, and a frontend built with React Native.

## Table of Contents

1. [Backend](#backend)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [API Endpoints](#api-endpoints)
    - [Running the Server](#running-the-server)
2. [Frontend](#frontend)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the App](#running-the-app)
    - [Screens](#screens)

## Backend

### Installation

1. **Clone the repository:**
    ```sh
    git clone <repository_url>
    cd <repository_name>/backend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

### Configuration

1. **Create a `.env` file in the `backend` directory with the following content:**
    ```env
    PORT=3000
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ```

### API Endpoints

| Endpoint                    | Method | Description                               |
|-----------------------------|--------|-------------------------------------------|
| `/intake/getIntake`         | GET    | Get today's sum of water logs for a user  |
| `/intake/logIntake`         | POST   | Create a new water log                    |
| `/intake/getLogs`           | GET    | Get all logs of user for current day      |
| `/intake/deleteLog`         | DELETE | Delete a log for user                     |
| `/intake/updateLog`         | PUT    | Update a log for user                     |
| `/intake/getIntakeHistory`  | GET    | Get history of water For current day      |
| `/goal/getGoal`             | GET    | Get goal of a user for current day        |
| `/goal/setGoal`             | SET    | Set water intake goal for a user          |

### Running the Server

1. **Start the server:**
    ```sh
    npm start
    ```

## Frontend

### Installation

1. **Clone the repository:**
    ```sh
    git clone <repository_url>
    cd <repository_name>/frontend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

### Configuration

1. **Create a `config.js` file in the `frontend` directory with the following content:**
    ```js
    export const API_URL = 'http://your_backend_server:3000';
    ```

### Running the App

1. **Start the app:**
    ```sh
    npx react-native run-android   # For Android
    npx react-native run-ios       # For iOS
    ```

### Screens

- **Logs Screen:**
    - Displays today's water logs with options to edit or delete logs.
    - Includes a button to navigate to the Intake History screen.
    - Includes a modal for editing logs.

- **Intake History Screen:**
    - Displays the history of daily water intake.
