# AWS S3 Dashboard

A simple dashboard to manage AWS S3 buckets and their objects, displaying access policies and permissions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Introduction

The AWS S3 Dashboard is a web application that provides an intuitive user interface to manage and monitor AWS S3 buckets and their objects. It allows you to view the list of buckets, explore objects within buckets, and analyze access permissions for each object.

## Features

- List all AWS S3 buckets
- Display buckets' access policies (public, private)
- Explore objects within buckets
- View detailed access permissions for each object

## Tech Stack

- React
- React Router
- Bootstrap
- Python (Django) for the backend
- AWS SDK for fetching S3 data


## Getting Started

1. Clone the repository: `git clone https://github.com/mahmoud-elbasiony/aws_task.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
   
### Prerequisites

- Python (>=3.6)
- pip (Python package manager)
- virtualenv (recommended for isolating dependencies)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-django-project.git
   cd your-django-project
2. virtualenv venv
3. source venv/bin/activate   # On Windows: venv\Scripts\activate
4. pip install -r requirements.txt
5. python manage.py runserver


## Usage

1. Enter your AWS access key and secret access key in the provided input fields.
2. Click "Submit" to authenticate with your AWS account.
3. The dashboard will display a list of your AWS S3 buckets.
4. Click on a bucket to view its objects and access policies.
5. Click on an object to see detailed access permissions.

> website url:https://aws-task-mjbscim7o-mahmoud-elbasiony.vercel.app

> the server url:http://localhost:8000

> make sure to run th server before using the site




