# Environment

This project uses Node version 16.20.0.
Use Node Version Manager to switch to the exact version of Node.

# Installation

In project root directory, run:

### `npm install`

To start development server:

### `npm start`

To build distributable bundle:

### `npm run build`

# Architecture

The project follows Layered Architecture.

## Overview

Used MetaMask for web3 integration, and signin.

## Folders

### `./src/pages`

This includes page templates which are for future use.\
Currently it is just a simple implementation.

### `./src/components4`

This is where components reside.\
Data is provided from service layer.

### `./src/services`

This is where service layer functions are defined.\
It is a good practice to keep service functions separated according to the scope they cover.

### `./src/types`

Types/interfaces should be defined in order to provide a uniform management of data types.

# Further notes

Web3 integration should be mostly done from frontend, for safety and privacy.\
But it is using some backend APIs for faster response and development requirement.
