# COMP5347-Assignment-2

This is a Data Analytics Web Application.  It is a typical three-tier web application using MEAN stack and it can communicate with third party web site through published web services.

Query and compute various summary statistics at the server-side and present the results on a web page.

## Getting Started

- Link to google doc for report: https://docs.google.com/document/d/1ky9xi_2xBfHtDn0A5lXRqHjzOyD6P1PftcR8lY8Za8U/edit?usp=sharing

### Prerequisites

- First cloning the directory into your local machine.

- Download sample data set from 
```
https://canvas.sydney.edu.au/courses/21515/files/9949983/download?wrap=1
```
Extract the zip file and place all files within the main directory.

- Install and  setup mongodb.

  - For mac users

    - Open terminal
    ```
    brew install mongodb-community
    mongod --dbpath "blah/random/path"
    mongo
    ```
  - For windows users

    - Get a Mac :)

- Run project

  - Open terminal and navigate to home directory   
  ```
  'chmod  +x setup.sh' & './setup.sh'
  ```
  
  - Using Eclipse run as node application

  - Using Terminal run 
  ```
  'node server.js'
  ```
  
  - Open up your browser and  navigate to  
  ```
  'localhost:3000'
  ```
  
  - Sign up and login intuitively

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.sydney.edu.au/COMP5347-2020/COMP5347-Assignment-2/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
