# Environment

This project uses Node version 16.20.0.
Use Node Version Manager to switch to the exact version of Node.

# Installation

In project root directory, run:

### `npm install`

To start localhost:

### `npm start`

# Architecture

## Overview

Controllers are divided per their roles.\
They are defined as separate classes. When instance created, its constructors are initiating its routes and returns express router to the listener.\
Also, they are inherited from Base Class, which will be further classified into different base class structures, esp. when it is decided to follow microservices-based backend.

## Authentication

This project uses jwt as bearer token for authentication.\
Currently, its expiry time is unset, which means it never expires.\

Further development task should be concentrated on implementing refresh tokens.

## Proposals

Reading proposals from smart contract is done by backend.\
But creating proposals not, as it is just a wallet signing with MetaMask.
