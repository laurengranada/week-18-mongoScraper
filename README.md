# Buzzfeed Scraper

![alt text](https://github.com/laurengranada/week-18-mongoScraper/blob/master/read-images/home-matchesDB.png)

### Overview
User can scrape the Buzzfeed.com/news page for articles and save the ones they like. After the articles are saved, the user can makes notes and save them to the MongoDB.

Below is the 'articles' collection in Robomongo. Each article has a unique id assigned, the title and summary are pulled, as well as the date the article was written. The value for 'saved' is automatically 'false' until the user chooses to save it.

![alt text](https://github.com/laurengranada/week-18-mongoScraper/blob/master/read-images/MongoDB-articles.png)

Under the 'saved articles' tab, the user can views all the articles they have choosen to save.

![alt text](https://github.com/laurengranada/week-18-mongoScraper/blob/master/read-images/saved.png)



### Languages/Technologies Used
- HTML, CSS, and Javascript
- MongoDB
- Mongoose
- Cheerio
- Node
