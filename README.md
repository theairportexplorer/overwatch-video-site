# Overwatch Video Site
The purpose of the Overwatch Video Site project is to create a framework where
Overwatch videos clips can be fetched (from YouTube) and viewed. Videos listed
are tagged and indexed based on video information (date created, hero, etc),
to which the web backend can fetch the proper video clip.

Also I needed an excuse to learn ReactJS. Opinion: IDK if I'm using it right,
but I feel like I'm doing something wrong.

## Frontend Web Application
The frontend web application is an HTML webpage running a ReactJS application to
provide the rich interface to interact with the project. 

## Backend Web Framework
The backend web framework is a Python Flask application that provides, defines,
and implements all the URL web endpoints for the ReactJS application to talk to.

Ideally a database also runs on the backend to store all the video information.
For development purposes, it's just a static JSON file (created through Python
TinyDB), but at production/deployment it will be MongoDB.