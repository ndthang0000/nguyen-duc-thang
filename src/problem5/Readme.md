# Configuration and Running the Application
## Description

This is a CRUD backend service. It was written by Typescript and use SQL Lite to store data (I pushed stories.db in a root folder)
User can create new story, view all, paginate with basic filter, update by PATCH or PUT method and delete the story base on the id

## Prerequisite

Before you begin, ensure you have met the following requirements:

1. **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
2. **npm**: Node.js installation includes npm. Verify the installation by running:
  ```sh
  npm -v
  ```
3. **Git**: Install Git from [git-scm.com](https://git-scm.com/).


## Configuration

1. **Clone the repository**:
  ```sh
  git clone https://github.com/ndthang0000/nguyen-duc-thang
  ```

2. **Install dependencies**:
  ```sh
  npm install
  ```

3. **Set up environment variables**:
  Create a `.env` file in the root directory and add the necessary environment variables(you can copy from `.env.example`):
  ```env
  PORT=4000
  ```

## Running the Application

1. **Start the application**:
  ```sh
  npm run problem5
  ```


3. **Build the application**:
  ```sh
  npm run build
  ```

4. **Lint the code**:
  ```sh
  npm run lint
  ```

Make sure to replace placeholders with your actual configuration values.