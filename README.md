# Star Wars Data

_RESTful API app using the Star Wars API._

### Tech Used

React, React Hooks, Axios, JavaScript, HTML5, Sass, CSS3, Bootstrap, Heroku, and Netlify.
 
You can check out the app [here](http://sw-data.aarondevon.com/).

![Screen shot of Star Wars API App](https://ch3302files.storage.live.com/y4mvQRRfLYNxY2eHIpGHRntyKp6HeLjLKcVTsmQv-QmRR_0jxLqqvVVB7eIow-BAAOByg0iqEcrc1fwr8t4UgfwVyPh1R5SUDUkw7Q1eTGnczDa9sacbbElkg-CX2D7M4e0bByaC3zW113bfsK4sGsBmt4zRhIi6cJ1AnehFXt55BMv3UEuToLGfRXJ53zK28Q3?width=815&height=711&cropmode=none)

## Summary
This is the third project I have built for my portfolio. I did not use any tutorials while creating this app.
The app pulls character data from the Star Wars API and presents that data in a table format. The user is able to search for a character and any matches will be displayed.


## Author
**Aaron Sawyer** - *Full-Stack* Software Developer - [Website](https://www.aarondevon.com/) | [Linkedin](https://www.linkedin.com/in/aarondsawyer/)



#Good 
#1.Breaking up Code 
#2.moving functions outside of Functional Component Body > a new function is made on each re-render

#Focus 
#1. Naming ? > CamelCase (conventions) + No abbreviation (Andy)
#2. Unnecessary conditional check in Table.jsx  ? > Simpler 
#3. Math.ceil in getNumberOfButtons(props)
#4. change where you call getNumberOfButtons in generateButton(props)
#5. Change generateButton to createButtons
#6. Simplify functions to just being four: getCharacters, handleSearchButtonClick, handlePageButtonClick and handleSearchTermChange
