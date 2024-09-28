# Content Curation dApp UI

## Table of Contents
1. About
2. Prerequisites
3. Installation
4. Project Structure
5. Development
6. Styling
7. Testing
8. Building for Production
9. Deployment
10. Contributing

## About

This is the user interface for the Content Curation decentralized application (dApp) built on the Stacks blockchain. It provides a front-end for users to interact with the Content Curation smart contract, allowing them to submit, vote on, and manage curated content.

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A modern web browser with Stacks wallet support (e.g., Hiro Wallet browser extension)

## Installation

1. Clone the repository

2. Install dependencies:
   ```
   npm install
   ```

## Project Structure

```
content-curation-dapp-ui/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
|   |   ├── AdminPanel.js
|   |   ├── ErrorBoundary.js
│   │   ├── Header.js
│   │   ├── ItemDetails.js
│   │   ├── ItemList.js
│   │   ├── Loading.js
│   │   └── SubmitItem.js
|   |
|   ├── hooks
|   |   ├── useConnect.js
|   |   
│   ├── styles/
│   │   ├── AdminPanel.css
│   │   ├── ErrorBoundary.css
|   |   ├── Header.css
|   |   ├── ItemDetails.css
|   |   ├── ItemList.css
|   |   ├── Loading.css
│   │   └── SubmitItem.css
|   |
│   ├── utils/
│   │   ├── contractInteractions.js
│   │   └── utils.js
|   ├── App.css
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Development

To start the development server:

```
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Styling

This project uses Tailwind CSS for styling. You can customize the design by editing the `tailwind.config.js` file and using Tailwind classes in your components.

## Testing

To run the test suite:

```
npm test
```

This will launch the test runner in interactive watch mode.

## Building for Production

To build the app for production:

```
npm run build
```

This will create a `build` folder with a production-ready build of your app.

## Deployment

You can deploy this app to various platforms.

3. Deploy the app:
   ```
   npm run deploy
   ```

For other deployment options, consult the documentation of your preferred hosting platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.