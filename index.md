## Welcome to Know-Your-Bias

### **Know Your Bias** is a simple Chrome extension which helps you understand the bias behind the websites you source your news from. 

All the data for the chrome extension is sourced from [All Sides](https://www.allsides.com/media-bias/media-bias-ratings). We obtained this data from an [open source repository of Github](https://github.com/favstats/AllSideR/blob/master/data/allsides_data.csv) from them and then used the values from row #1 and #2 for the current extension. Down the line, we plan on integrating the other data-points, but that's all for another day.

The idea behind this extension is simple - we all know that some journalists/publications have political biases which they conciously or subconciously project to their readers throught their articles and publication. All Sides has compiled an index of the bias ratings if quite a few media houses from accross the globe. However, the problem remains that most people are not aware that these rankings exist and even if they are, opening up the AllSides website and finding the ranking of the url they're on is too much work.

Our simple chrome extension tries to banish that problem. Simply pressing on the 'Know Your Bias' icon in the menu bar would show you a popup giving you a message telling you the ating of the website you're currently on. 

As mentioned above, down the line, we plan on using other data points such as the number of people who agree with this ranking, the confidence level, the AllSides url and more. We're also on the lookout for other **unbiased** sources of media rankings so that we can use other sources of data. 

In case you are aware of some such source, you're facing some problem or you have some ideas on improving the extension feel free to drop an email to [Jai Relan](mailto:jairelan.2005@gmail.com) and [Swayam Tripathy](mailto:tripathy.swayam@gmail.com). 



We would also like to give credits to [this StackOverflow answer](https://stackoverflow.com/a/3689475/15605884) which has helped squash a bug regarding the stripping of the url on a news website. A huge shout out to the [Google Developers Extensions Documentation](https://developer.chrome.com/docs/extensions/) which has been god's gift when it comes to debugging and getting the basics of the extensions out there. 

This extension was built by [Jai Relan](https://www.linkedin.com/in/jairelan/) and [Swayam Sidh Tripathy](https://www.linkedin.com/in/swayam-sidh-tripathy-5330991a8/) 
