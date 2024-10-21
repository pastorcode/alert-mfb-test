# Alert MFB Backend Test

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Database Setup](#database-setup)
    - [Seeding the Database](#seeding-the-database)
    - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Design Patterns](#design-patterns)
- [API Documentation](#api-documentation)
- [Demo](#demo)
- [Feedback](#feedback)

## Introduction

Welcome to the Alert MFB Backend Test, a RESTful API built with NestJS and MySQL. This API provides user management and authentication features, implementing role-based access control to ensure secure operations.

## Features

- **User Management**: Create, update, and delete user accounts.
- **User Authentication**: Secure endpoints with user authentication using JWT.
- **Role-Based Access Control**: Restrict access to certain endpoints based on user roles.

## Requirements

Before getting started, ensure that you have the following prerequisites:

- Node.js (version 18.x)
- npm (version 8.x)
- MySQL (version 8.x)

## Getting Started

Follow the steps below to set up and run the Alert MFB Backend Test application.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pastorcode/alert-mfb-test.git

2. Change into the project directory:

   ```bash
    cd alert-mfb-test

3. Install dependencies:

   ```bash
    npm install

4. Install Prisma CLI globally (if not already installed):

   ```bash
    npm install -g prisma

### Database Setup

1. Create a MySQL database for the project.

2. Create a MySQL database for the project.

   ```bash
   PORT=7008
   DATABASE_URL=mysql://username:password@localhost:3306/alert_mfb_db

### Seeding the Database

1. Run the Prisma migrations to set up the database schema:

   ```bash
   npx prisma migrate dev --name init

2. To populate the database with initial data, run the seed script:

   ```bash
   npm run seed

### Running the Application

1. Start the application with the following command:

   ```bash
   npm run start:dev


## Project Structure

The project structure is based on the [NestJS best practices](https://docs.nestjs.com/techniques/performance).

## Design Patterns
This project uses the following design patterns:
* Repository Pattern
* Service Pattern
* Dependency Injection

The project also uses the following SOLID principles:
* Single Responsibility Principle
* Interface Segregation Principle
* Dependency Inversion Principle
* Open/Closed Principle

## API Documentation

The API documentation is available at [http://localhost:7008/api](http://localhost:8081/api) once the application is running.

## Demo

You can watch a demo of the application [here](https//:youtube.com) and view the live API [https://alert.mfb-test.fly.dev/](https://alert.mfb-test.fly.dev)


## Feedback

Feedback! would be greatly appreciated.






