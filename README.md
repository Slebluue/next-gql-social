## Overview
This app is designed as a take-home interview project, showcasing the use of Next.js and GraphQL for building a simple web application. The focus was on creating a functional and visually appealing interface while experimenting with technologies that could support both web and mobile applications.

## Features
* **Styled Components**: Implemented styled-components to create a modular and reusable styling approach, simulating the functionality of a UI library.
* **NextJS** Leveraged Next.js for server-side rendering (SSR)
* **GraphQL** Utilized GraphQL for data fetching. You can explore the GraphQL queries at http://localhost:3000/api/graphql. Currently this only queries on client components.

## Getting Started

Clone the repo:

```bash
git clone https://github.com/Slebluue/next-gql-social.git
cd next-gql-social
```

Install dependencies (I used yarn, but you can use whatever you would like)
```
yarn install
```

Run the dev server
```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Development Notes
* The decision to use GraphQL was made to better understand how it can serve as a robust data-fetching solution for future applications, particularly those that might include both web and mobile platforms.

* While some Next.js SSR features may not be fully utilized in this app, this project serves as a foundational learning experience.

## Future Improvements
The below were skipped/limited due to time constraints

* **Error Boundaries**: Implementing error boundaries to handle UI errors gracefully.
* **Testing**: Adding unit and integration tests to ensure code reliability and maintainability.
* **Enhanced UI/UX**: Further refinement of the user interface and experience.