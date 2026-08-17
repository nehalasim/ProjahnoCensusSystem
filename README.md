# PRF Household Surveillance & Data Collection System

A **React Native mobile application** designed to support Community Health Workers (CHWs) in conducting scheduled household visits and collecting demographic and health-related information for ongoing public-health research.

## Project Overview

The system supports a **two-month household follow-up cycle**, helping CHWs keep household and member information accurate and up to date.

Each CHW has an individual user account and is assigned specific **clusters, blocks, and households**. The application automatically identifies households due for a visit and helps CHWs complete visits within the required **±7-day visit window**.

The system also provides previous, current, and upcoming visit information to support field planning and follow-up activities.


## Key Features

### CHW & Household Management

* Secure login for individual CHWs
* Assignment of clusters, blocks, and households
* Household and member information management
* Previous, current, and next visit information

### Automated Visit Scheduling

* Automatically generates households due for follow-up
* Supports a two-month household visit cycle
* Manages the required **±7-day visit window**
* Helps CHWs organize and plan field visits

### Household & Member Updates

CHWs can record important changes during each household visit, including:

* Marital status changes
* Births and new children
* Newly identified household members
* Deaths
* Guest or temporary members
* Relevant maternal and reproductive health information

### Photo & Identification Management

* Capture household photographs directly from the mobile application
* Capture individual member photographs
* Store and manage up to **three photo-ID/document images per member**

### Dashboard & Data Visualization

The application provides tablet-friendly dashboards and reporting features to make collected information easier to understand.

Visualizations include:

* Pie charts
* Line charts
* Population pyramids
* Demographic summaries
* Household information and trends
* Other graphical research-data views

## Data Management

The application uses **SQLite** for local mobile data management, allowing field information to be managed on the device.

A centralized **Microsoft SQL Server 2008 R2** database is used for central data storage and management.

The React Native application is integrated with a **PHP-based backend** to support communication between the mobile application and centralized database environment.

## Technology Stack

* **Mobile Application:** React Native
* **Programming:** JavaScript
* **Local Database:** SQLite
* **Central Database:** Microsoft SQL Server 2008 R2
* **Backend:** PHP
* **Development Environment:** XAMPP

## Purpose

The project was developed to provide CHWs with a practical digital solution for scheduled household surveillance and field-data collection. It helps organize household visits, maintain current demographic and health information, manage photographs and identification documents, and present collected information through easy-to-understand dashboards and visual reports.
