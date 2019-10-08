## Steps to running this project
1. open up the cloned or downloaded folder that contains the source in VSCode
2. open up a new terminal (bash) and paste the following ``` npm install ```
    * what this does is install all the necessary packages from npm in order for the project to compile and run
3. open up a new terminal (docker) and paste the following: ```docker run -p 4222:4222 -ti nats:latest ```
    * what this does is opens up a docker container and runs it on port 4222, the port that is listening is 3000 though, this is because of a gateway connection.
4. open up the terminal (bash) and paste the following: ```node index.js```
    * what this does is start up the application
5. open up [product list](http://localhost:3000/products) in a new browser window
    * if json data is returned then the application is functioning properly
    * other urls that work include (parameters can be different values and do get passed along to perform the requested operation): 
        * [add operation (alias)](http://localhost:3000/add?a=1&b=2) or [add operation (exact path)](http://localhost:3000/math/add?a=1&b=2)
        * [subtract operation (alias)](http://localhost:3000/subtract?a=2&b=1) or [subtract operation (exact path)](http://localhost:3000/math/subtract?a=2&b=1)
        * [multiply operation (alias)](http://localhost:3000/multiply?a=2&b=3) or [multiply operation (exact path)](http://localhost:3000/math/multiply?a=2&b=3)
        * [divide operation (alias)](http://localhost:3000/divide?a=10&b=5) or [divide operation (exact path)](http://localhost:3000/math/divide?a=10&b=5)