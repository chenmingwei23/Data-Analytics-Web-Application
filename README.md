# COMP5347-Assignment-2

This is a Data Analytics Web Application.  It is a typical three-tier web application using MEAN stack and it can communicate with third party web site through published web services.

Query and compute various summary statistics at the server-side and present the results on a web page.
Introduction
In this assignment, you will work as a group to build a data analytic web application. Each group must have three members. You will demonstrate that you are able to design and implement a typical three-tier web application using MEAN stack. You will also demonstrate that your application can communicate with third party web site through published web services.

You will be given a data set, containing some historical data. You will need to query and compute various summary statistics at the server-side and present the results on a web page. You may also need to download latest data from the original data source and append that to the data set.

Dataset
The main dataset contains a number of files in JSON formats storing revision histories of Wikipedia articles. The dataset was created by querying Wikipedia API (Links to an external site.) to English Wikipedia page: https://en.wikipedia.org/w/api.php. The articles are selected from Featured Articles (Links to an external site.).

Each file stores the entire revision history of an article up to 22 March 2020 (around 9:00 PM Sydney time). The file is named after the article’s title. Each revision is stored as a JSON object, with many properties. The whole file contains an array of many revision objects. Not all properties will be used in the assignment. Below are the relevant ones:

title: stores the title of the article
timestamp: stores the date and time a revision was made
user: stores the username or IP address of the user that made the revision
anon: the presence of the field indicates that the revision is made by anonymous users.
Explanation of other properties can be found from corresponding MediaWiki API document at this page (Links to an external site.). Below are examples of two typical revision objects (Australia.json):

[
    {
        "revid": 946512823,
        "parentid": 946509045,
        "minor": true,
        "user": "Moxy",
        "userid": 8729451,
        "timestamp": "2020-03-20T17:05:21Z",
        "size": 204615,
        "sha1": "886f30db5cbb96b5c2b6590cb1122bdb21832ee0",
        "parsedcomment": "...",
        "title": "Australia"
    },
    …
    {
        "revid": 381822921,
        "parentid": 381818575,
        "minor": false,
        "user": "121.72.65.12",
        "anon": true,
        "userid": 0,
        "timestamp": "2010-08-30T04:35:13Z",
        "size": 141813,
        "sha1": "bd34fc05b6af1717e1a430ece9e5aa105e92198b",
        "parsedcomment": "...",
        "title": "Australia"
    },
…
Both revision examples shown above are from an article with title “Australia”. The first revision is made by a registered user with name “Moxy”. The second revision example is made by an anonymous user as indicated by the presence of property ‘anon’. The value of ‘user’ property is an IP address.

The dataset also contains two text files: administrators.txt and bots.txt. The first text file (administrators.txt) contains a list of all administrators in English Wikipedia. Administrators can perform special actions on wiki pages, some of which are recorded as revisions. The second text file, bot.txt, contains a list of all bot users in English Wikipedia. The bot users have registered names but are not human editors (thus they are not considered as registered users). They are scripts designed for automatic tasks, such as fixing grammatical errors or detecting vandalism. Many bot user’s actions would result in new revisions. From the provided files, you may notice that several bot users are also administrators since they received administrator privilege, so they are able to perform special actions.

Functional Requirements
Main/Landing Page
The Landing page should display key information about the application, Wikipdia Analytics, in the form of text and images including description of the available functionality with some sample analytics graphs that can be generated from real data through the application. Also, it should provide three options; Sign-up, Login and Reset Password. Users cannot access or use available statistic functions until they create a valid account and login.

All users must sign-up before they can see and interact with the application’s functionality. So, your application should allow users to create an account first. The user must provide first name and last name, email address (as username), password, and reset password question/answer. You need to do appropriate data validation to ensure valid data is entered before creating an account. The sign-up and login functions must be secure in terms of sign-up and login. Password hashing must be implemented so passwords must not be stored as plain texts i in the database. You do not need to implement any verification for the sign-up process (e.g. email verification). Once all data is entered correctly, an account should be created and maintained in the database.

Once an account is created successfully, a user should be able to login using their email address and password. Users should be able to see and interact with the analytics functionality only upon successful login (you must manage the login sessions properly). Users should also be able to logout from your web application and reset their password (by answering the reset password question).

Article Analytics Functionality
Your application should compute various analytics at overall data set level and at individual article level.

Overall Analytics
For overall analytics, you need to find out and display the following as text (always be displayed on the page in “Overall” state): 

The top two articles with the highest number of revisions and their number of revisions.
The top two articles with the lowest number of revisions and their number of revisions.
The top two articles edited by the largest group of registered users (non bots) and their group size. Each wiki article is edited by a number of users, some making multiple revisions. The number of unique users is a good indicator of an article’s popularity.
The top two articles edited by the smallest group of registered users and their group size.
The top two articles with the longest history (measured by age) and and their age (in days). For each article, the revision with the smallest timestamp is the first revision, indicating the article’s creation time. An article’s age is the duration between now and the article's creation time.
The top two articles with the shortest history (measured by age) and their age (in days).
The user should be provided with a way to change the number of top articles shown, e.g. for highest and lowest number of revisions. The selected number should be applied to all categories above. 
Beside the above functionality, we are also interested in four types of users: anonymous, administrator, bot and regular user. Revisions made by anonymous users are indicated by the “anon” field in the revision JSON object. Revisions without “anon” field can be made by the other three types of users. You will need to compare the user name with the names in the provided text files (administrators.txt and bots.txt) to determine if a user is administrator, bot or just regular ones. You also need to provide some visual analytics including (end user should be able to switch between these two charts):

A bar chart of revision number distribution by year and by user type across the whole dataset (an example is shown in Figure 1). There should also be an option to switch between bar chart and line chart to show the the number of revisions of each user type.


Figure 1: Example bar chart showing overall yearly revision number distribution

A pie chart of revision number distribution by user type across the whole data set (an example is shown in Figure 2). When users click or users’ mouse hovers to each part of the pie chart, you must show the revision numbers and the percentage. You also need to show a description/summary of the pie chart. You should first construct a summary template which represents the rudimentary information demonstrated in the pie chart, with a few blanks left intentionally. These blanks could be filled automatically from the information in the graph. The following paragraph below shows an example summary in which the bold words are obtained from from the pie chart data. You are encouraged to design your own template that could help users interpret the graph. Note: The figures and numbers in the example may not reflect the data provided in the json files (only for demonstration purposes). 
The graph shows the revision number distribution by user type, in which 1100 number of users are taken into consideration for this analysis. From the pie chart, it is clear that the revisions were made mostly by regular users that cover for 65 percent, followed by anonymous users with 24 percent. The administrator users stands at 9 percent, which is larger than  revisions made by bot users (3 percent).

Figure 2: Example pie chart of revision number distribution by user type

Figure 2: Example pie chart of revision number distribution by user type

Individual Article Analytics
The individual statistics should provide a simple drop-down list, so end users are able to select an article from a list of all available article titles in the data set. You should also show total number of revisions, next to the article title in the drop-down list, to assist with the selection.

Once an end user selects an article, your application needs to check if the history of that article in the database is up to date. We consider histories less than one day old as up to date. For instance, if a user has selected article “Australia” at 8:00 PM on 21 March 2020 and the latest revision of “Australia” in the database was made on 10:00 PM, 20 March 2020; the history is considered as up to date and you do not need to do anything. However, if the latest revision of “Australia” was made on 10:00 AM, 20 March 2020, the history is considered as not up to date. You need to query MediaWiki API to pull all possible new revisions made after last update.

There should be a message indicating if a data pulling request is made and if so, how many new revisions have been downloaded. It is possible that a data pulling request is made, but the article has no new revision to be downloaded. You must notify users for either scenario.

For the selected article, display the following summary information:

The title
The total number of revisions
The top 5 regular users ranked by total revision numbers on this article, and the respective revision numbers
The top 3 news about the selected individual article obtained using Reddit API (Links to an external site.). You need to show the top 3 posts (based on the score/upvotes) from r/news (Links to an external site.) from "all time" by showing the titles and the correspond links. For example. if the selected individual article is "Australia", then you need to search for "Australia" in the subreddit r/news (Links to an external site.) and show a list like this:
Naturopath who said bicarbonate soda cures cancer banned for life by health watchdog | Australia news (Links to an external site.)
Australia to plant 1 billion trees to help meet climate targets (Links to an external site.)
7 Dead In What May Be Australia's Worst Mass Shooting In 22 Years (Links to an external site.)
You also need to show three charts:

A bar chart of revision number distributed by year and by user type for this article.
A pie chart of revision number distribution based on user type for this article.
A bar chart of revision number distributed by year made by one of the top 5 regular users for this article. For this chart, you need provide a way to select a user from the top 5 list.
You should also provide year filter (i.e., “From:” and “To:”) selection. If users change the year filter, both summary information and charts must be generated based on data from this range of years only.

Figure 3 shows an example of the yearly revision distribution using data in file “Germany.json”. Figure 4 shows a pie chart of user type distribution for article “Germany”. Figure 5 shows a bar chart of the year revision distribution of user “Horst-schlaemma” for article “Germany”. These figures are just some illustrations, you can use different colour or design to show the chart. The data shown in these figures may not reflect the actual data provided in the json files. The charts should not be displayed in one page, you should provide a mechanism for end users to switch among charts.



Figure 3: Example bar chart showing yearly revision number distribution

Figure 4: Example Pie chart showing user type distribution

Figure 4: Example Pie chart showing user type distribution



Figure 5: Example single user yearly revision distribution

Author Analytics
In this function, you should enable the end user to display all articles that are changed (or have revisions made) by a specific author. To do so, you should allow the end user to an author name in a free text format. You may also allow end users to enter the first few letters and use autocomplete feature to quickly locate the author name of interest.

You should display the articles’ names along with number of revisions made by that author next to it. After selecting one of the article names, the end user should also be able to see timestamps of all revisions made to the selected article.

Design and Implementation Requirements
Your application should operate on a single page, with all communications between client and server need to be asynchronous. For simplicity, it is allowed to implement the main/landing page functions in a separate page. The other functions (overall, individual and author statistics) must be implemented within a single page (following SPA principles).

You should design your own layout. You must use the MVC pattern to structure your application and interaction among components. The design and UI interfaces should be user-friendly and intuitive.

You should use JavaScript to implement both front and back end of the application. The back-end application should use Node.js framework. The back-end storage system must be MongoDB. You can use other popular JavaScript libraries not covered in this course.

Your application should show good performance when running any functionality. You should consider techniques for optimising application performance including communications among tiers and database design and implementation. Your design and implementation should not be specific for the provided dataset. You should consider a dynamic design and implementation that work properly and scale with any dataset.

You need to make sure that your web application follows the requirements clarified or specified in the Ed discussion (Links to an external site.).

We have created an organisation on Sydney Github, you can access it from this linkLinks to an external site.. You will also receive a Github invitation via email to join this organisation. Github is an effective tool to easily collaborate with your team members and to keep track on code revisions. All contributions will be evaluated from Github, so make sure you and group members use it from the start, not at the end or close to the assignment deadline. Most web development projects and companies use Github to maintain and manage their code nowadays, thus this is a perfect opportunity for you to get familiarise with this tool. You must create a new repository for your project (within our Github organisationLinks to an external site.) and use this Github repository to maintain your code and project. We will use Github to verify each group member’s contributions. Please follow this link to find some useful resources for learning the basics of GitHub. You must only commit/push codes that written by you, it is not acceptable if only one member uploads all the code. Your repository must include README to explain how to set up (e.g. installing the dependencies and importing the dataset to the database) and run your code. Please refer to this template (Links to an external site.) as a good example of README file. 

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
  - Setup MongoDb first
    Import revision data to MongoDB with collection name: "revisions"
    The database should be: "Assignment2"

  - Open terminal and navigate to home directory   
  ```
  'chmod  +x setup.sh' & './setup.sh'
  ```
  
  - Using Eclipse run as node application

  - Using Terminal run 
  
  ```
  'node setupDB.js'
  ```
  
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
