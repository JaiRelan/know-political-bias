chrome.browserAction.onClicked.addListener(function (tab) {
    // chrome.runtime.sendMessage('', {
    //     type: 'notification',
    //     options: {
    //         title: 'Just wanted to notify you',
    //         message: 'How great it is!',
    //         iconUrl: '/icon.png',
    //         type: 'basic',
    //     });
    // });



    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        var origin = url.match(/^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/)[0];

        // alert(origin)

        var bias = {
            "https://www.aarp.org": ["centre", "﻿AARP"],
            "https://abcnews.go.com": ["centre-left", "ABC News"],
            "https://www.aim.org": ["right", "Accuracy in Media"],
            "https://www.aclu.org": ["centre-left", "ACLU"],
            "https://www.ajplus.net": ["left", "AJ+"],
            "https://www.aljazeera.com": ["centre-left", "Al Jazeera"],
            "https://www.alternet.org": ["left", "AlterNet"],
            "https://www.conservative.org": ["right", "American Conservative Union"],
            "https://www.aei.org": ["centre-right", "American Enterprise Institute"],
            "https://amgreatness.com": ["right", "American Greatness"],
            "https://spectator.org": ["right", "American Spectator"],
            "https://www.americanthinker.com": ["right", "American Thinker"],
            "https://adaction.org": ["left", "Americans for Democratic Action"],
            "https://www.atr.org": ["right", "Americans for Tax Reform"],
            "https://www.judgenap.com": ["right", "Andrew Napolitano"],
            "https://dish.andrewsullivan.com": ["centre-right", "Andrew Sullivan"],
            "https://anncoulter.com": ["right", "Ann Coulter"],
            "https://apnews.com": ["centre", "Associated Press"],
            "https://aquinas.edu": ["left", "Aquinas College Saint"],
            "https://www.arkansasonline.com": ["left", "Arkansas Democrat-Gazette"],
            "https://www.psychologicalscience.org": ["centre", "Association for Psychological Science"],
            "https://www.ajc.com": ["centre-left", "Atlanta Journal-Constitution"],
            "https://www.atlasnetwork.org": ["right", "Atlas Network"],
            "https://www.statesman.com": ["centre-left", "Austin American-Statesman"],
            "https://www.axios.com": ["centre", "Axios"],
            "https://www.azcentral.com": ["centre", "AZ Central"],
            "https://www.barnstablepatriot.com": ["centre", "Barnstable Patriot"],
            "https://www.bbc.com": ["centre", "BBC News"],
            "https://bearingdrift.com": ["right", "Bearing Drift"],
            "https://www.benstein.com": ["centre-right", "Ben Stein"],
            "https://www.bloomberg.com": ["centre", "Bloomberg"],
            "https://bluevirginia.us": ["left", "Blue Virginia"],
            "https://www.gorrellart.com": ["right", "Bob Gorrell (cartoonist)"],
            "https://boingboing.net": ["left", "Boing Boing"],
            "https://www.bostonherald.com": ["centre-right", "Boston Herald"],
            "https://www.bgdailynews.com": ["centre-left", "Bowling Green Daily News"],
            "https://www.breitbart.com": ["right", "Breitbart News"],
            "https://www.brookings.edu": ["centre", "Brookings Institution"],
            "https://www.businessinsider.com": ["centre", "Business Insider"],
            "https://www.bustle.com": ["centre-left", "Bustle"],
            "https://www.buzzfeednews.com": ["left", "BuzzFeed News"],
            "https://www.c-span.org": ["centre", "C-SPAN"],
            "https://calmatters.org": ["centre", "CalMatters"],
            "https://calwatchdog.com": ["centre", "CalWatchdog"],
            "https://www.care2.com": ["left", "Care 2"],
            "https://carnegieendowment.org": ["centre", "Carnegie Endowment for International Peace"],
            "https://www.iwf.org": ["right", "Independent Women's Forum"],
            "https://cathyyoung.wordpress.com": ["centre-right", "Cathy Young"],
            "https://www.cato.org": ["centre-right", "Cato Institute "],
            "https://www1.cbn.com": ["right", "Christian Broadcasting Network"],
            "https://www.cbsnews.com": ["centre-left", "CBS News"],
            "https://www.americanprogress.org": ["centre-left", "centre For American Progress"],
            "https://www.prwatch.org": ["centre-left", "The centre for Media & Democracy's PR Watch"],
            "https://publicintegrity.org": ["centre-left", "centre for Public Integrity"],
            "https://csbaonline.org": ["centre-right", "centre for Strategic and Budgetary Assessments"],
            "https://www.cbpp.org": ["left", "centre on Budget and Policy Priorities"],
            "https://www.tpusa.com": ["right", "Turning Point USA"],
            "https://chicago.suntimes.com": ["centre-left", "Chicago Sun-Times"],
            "https://www.chicagotribune.com": ["centre", "Chicago Tribune"],
            "https://www.childrensdefense.org": ["left", "Children’s Defense Fund"],
            "https://www.csmonitor.com": ["centre", "Christian Science Monitor"],
            "https://www.city-journal.org": ["right", "City Journal"],
            "https://www.civilpolitics.org": ["centre", "CivilPolitics.org"],
            "https://www.cnbc.com": ["centre", "CNBC"],
            "https://www.cnet.com": ["centre", "CNET"],
            "https://edition.cnn.com": ["centre-left", "CNN "],
            "https://cnsnews.com": ["right", "CNS News"],
            "https://www.catholicnews.com": ["right", "CNSNews.com"],
            "https://www.cjr.org": ["centre", "Columbia Journalism Review"],
            "https://www.commentarymagazine.com": ["right", "Commentary Magazine"],
            "https://www.conservativehq.org": ["right", "Conservative HQ"],
            "https://cookpolitical.com": ["centre", "Cook Report"],
            "https://www.cfr.org": ["left", "Council on Foreign Relations"],
            "https://counter-currents.com": ["right", "Counter Currents"],
            "https://countercurrents.org": ["centre-left", "Counter Currents"],
            "https://www.crowdpac.com": ["centre", "CrowdPAC"],
            "https://www.cuindependent.com": ["centre", "CU Independent"],
            "https://www.currentaffairs.org": ["left", "Current Affairs"],
            "https://www.thedailybeast.com": ["left", "The Daily Beast"],
            "https://www.dailycardinal.com": ["centre", "The Daily Cardinal"],
            "https://www.dailykos.com": ["left", "Daily Kos"],
            "https://www.dailymail.co.uk": ["right", "Daily Mail"],
            "https://dailynorthwestern.com": ["centre-left", "Daily Northwestern"],
            "https://www.dailypress.com": ["centre-right", "Daily Press"],
            "https://dailyprogress.com": ["centre", "Daily Progress"],
            "https://www.defenseone.com": ["centre", "Defense One"],
            "https://www.democracynow.org": ["left", "Democracy Now"],
            "https://www.deseret.com": ["centre-right", "Deseret News"],
            "https://www.diplomaticourier.com": ["centre", "Diplomatic Courier"],
            "https://www.drudgereport.com": ["centre-right", "Drudge Report"],
            "https://www.dukechronicle.com": ["centre", "Duke Chronicle"],
            "https://www.epi.org": ["left", "Economic Policy Institute"],
            "https://educationvotes.nea.org": ["left", "EdVotes.org"],
            "https://www.edf.org": ["centre-left", "Environmental Defense Fund"],
            "https://www.esquire.com": ["left", "Esquire"],
            "https://www.eptrail.com": ["centre", "Estes Park Trail Gazette"],
            "https://www.eurekalert.org": ["centre", "Eurek Alert"],
            "https://www.factcheck.org": ["centre", "FactCheck.org"],
            "https://fair.org": ["centre", "Fairness & Accuracy in Reporting"],
            "https://fcnp.com": ["left", "Falls Church News - Press"],
            "https://www.frc.org": ["centre-right", "Family Research Council"],
            "https://fareedzakaria.com": ["centre", "Fareed Zakaria"],
            "https://fas.org": ["centre-left", "Federation of American Scientists"],
            "https://www.ft.com": ["centre", "Financial Times"],
            "https://www.thefiscaltimes.com": ["centre-right", "Fiscal Times"],
            "https://fivethirtyeight.com": ["centre", "FiveThirtyEight"],
            "https://fooddemocracynow.org": ["centre-left", "Food Democracy Now"],
            "https://www.forbes.com": ["centre", "Forbes"],
            "https://www.foreignaffairs.com": ["centre", "Foreign Affairs"],
            "https://www.foxnews.com": ["centre-right", "Fox News"],
            "https://freakonomics.com": ["centre", "Freakonomics"],
            "https://freedomhouse.org": ["centre-right", "Freedom House"],
            "https://www.frontpagemag.com": ["right", "FrontPage Magazine"],
            "https://news.google.com": ["centre-left", "Google News"],
            "https://www.gop.gov": ["right", "GOP.gov"],
            "https://grist.org": ["centre-left", "Grist"],
            "https://hamptonroadsmessenger.com": ["centre", "Hampton Roads Messanger"],
            "https://hbr.org": ["centre-left", "Harvard Business Review"],
            "https://www.heralddemocrat.com": ["left", "Herald Democrat"],
            "https://www.civilbeat.org": ["centre", "Honolulu Civil Beat"],
            "https://hotair.com": ["centre-right", "HotAir"],
            "https://www.howdowefixit.me": ["centre", "How Do We Fix It?"],
            "https://www.huffpost.com": ["left", "HuffPost"],
            "https://www.independent.org": ["centre-right", "Independent Institute"],
            "https://ijr.com": ["centre-right", "Independent Journal Review"],
            "https://www.idsnews.com": ["centre", "Indiana Daily Student"],
            "https://indyweek.com": ["centre-left", "Indy Week"],
            "https://www.infowars.com": ["right", "InfoWars"],
            "https://www.insidephilanthropy.com": ["centre", "Inside Philanthropy"],
            "https://www.ibtimes.com": ["centre", "International Business Times"],
            "https://www.investors.com": ["centre-right", "Investor's Business Daily"],
            "https://ivn.us": ["centre", "IVN"],
            "https://jacobinmag.com": ["left", "Jacobin"],
            "https://jezebel.com": ["left", "Jezebel"],
            "https://journalistsresource.org": ["centre", "Journalist's Resource"],
            "https://www.jubileemedia.com": ["centre", "Jubilee Media"],
            "https://www.judicialwatch.org": ["centre-right", "Judicial Watch"],
            "https://katu.com": ["centre", "KATU"],
            "https://www.kqed.org": ["centre", "KQED"],
            "https://ksltv.com": ["right", "KSL"],
            "https://m.lvsun.com": ["centre-left", "Las Vegas Sun"],
            "https://www.loudountimes.com": ["centre-right", "Loudoun Times"],
            "https://lifehacker.com": ["centre", "Lifehacker"],
            "https://www.liveaction.org": ["centre-right", "Live Action"],
            "https://livingroomconversations.org": ["centre", "Living Room Conversations"],
            "https://www.timescall.com": ["centre-left", "Longmont Times-Call"],
            "https://www.latimes.com": ["centre-left", "Los Angeles Times"],
            "https://www.courier-journal.com": ["centre-left", "Louisville Courier-Journal"],
            "https://www.manhattan-institute.org": ["centre-right", "Manhattan Institute"],
            "https://marketwatch.com": ["centre-right", "MarketWatch"],
            "https://mashable.com": ["left", "Mashable"],
            "https://www.mcclatchydc.com": ["centre", "McClatchyDC"],
            "https://www.mediamatters.org": ["left", "Media Matters"],
            "https://www.mrc.org": ["right", "Media Research centre"],
            "https://www.mediaite.com": ["centre-left", "Mediaite"],
            "https://www.miamiherald.com": ["centre-left", "Miami Herald"],
            "https://www.unz.com": ["right", "UNZ"],
            "https://www.michigandaily.com": ["centre-left", "Michigan Daily"],
            "https://news.mit.edu": ["centre", "MIT News"],
            "https://www.motherjones.com": ["left", "Mother Jones"],
            "https://www.msnbc.com": ["left", "MSNBC"],
            "https://www.mtv.com": ["centre-left", "MTV News "],
            "https://www.ncpssm.org": ["left", "National Committee to Preserve Social Security and Medicare"],
            "https://nationalinterest.org": ["centre", "National Interest"],
            "https://www.nationaljournal.com": ["centre", "National Journal"],
            "https://www.nationalreview.com": ["right", "National Review"],
            "https://www.nbcnews.com": ["centre-left", "NBC News"],
            "https://newrepublic.com": ["left", "New Republic"],
            "https://www.nydailynews.com": ["left", "New York Daily News"],
            "https://nymag.com": ["left", "New York Magazine"],
            "https://nypost.com": ["right", "New York Post"],
            "https://www.nytimes.com": ["centre-left", "New York Times "],
            "https://www.newsbusters.org": ["right", "NewsBusters"],
            "https://www.newsmax.com": ["right", "Newsmax"],
            "https://www.newsweek.com": ["centre-left", "Newsweek"],
            "https://nmpolitics.net": ["centre", "NMPolitics"],
            "https://www.npr.org": ["centre", "NPR  News"],
            "https://www.oann.com": ["centre-right", "One America News Network"],
            "https://www.opensecrets.org": ["centre", "OpenSecrets.org"],
            "https://www.ocregister.com": ["centre-right", "Orange County Register"],
            "https://www.pacificresearch.org": ["right", "Pacific Research Institute"],
            "https://psmag.com": ["centre-left", "Pacific Standard"],
            "https://www.pbs.org": ["centre", "PBS NewsHour"],
            "https://www.peacock-panache.com": ["left", "Peacock Panache"],
            "https://www.pfaw.org": ["left", "People for the American Way"],
            "https://pnhp.org": ["left", "Physicians for a National Health Program"],
            "https://www.post-gazette.com": ["centre-right", "Pittsburgh Post-Gazette"],
            "https://pjmedia.com": ["centre-right", "PJ Media"],
            "https://www.politico.com": ["centre-left", "Politico"],
            "https://www.politicususa.com": ["left", "PoliticusUSA"],
            "https://www.politisect.com": ["centre", "Politisect"],
            "https://www.politifact.com": ["centre-left", "PolitiFact"],
            "https://www.pressherald.com": ["centre", "Portland Press Herald"],
            "https://www.prageru.com": ["right", "Prager University"],
            "https://www.pri.org": ["centre", "Public Radio International"],
            "https://www.procon.org": ["centre", "ProCon.org"],
            "https://www.projectveritas.com": ["centre-right", "Project Veritas"],
            "https://www.propublica.org": ["centre", "ProPublica"],
            "https://qz.com": ["centre", "Quartz"],
            "https://quillette.com": ["centre-right", "Quillette"],
            "https://www.rand.org": ["centre-left", "RAND Corporation"],
            "https://www.rasmussenreports.com": ["centre", "Rasmussen Reports"],
            "https://www.rawstory.com": ["left", "Raw Story"],
            "https://www.realclearpolitics.com": ["centre", "RealClearPolitics"],
            "https://reason.com": ["centre-right", "Reason"],
            "https://reason.org": ["centre-right", "Reason Foundation"],
            "https://www.myrecordjournal.com": ["centre", "Record Journal"],
            "https://redstate.com": ["right", "Red State"],
            "https://www.reuters.com": ["centre", "Reuters"],
            "https://richmond.com": ["centre-right", "Richmond Times Dispatch"],
            "https://www.rollingstone.com": ["left", "Rolling Stone"],
            "https://www.salon.com": ["left", "Salon"],
            "https://www.sfchronicle.com": ["left", "San Francisco Chronicle"],
            "https://www.mercurynews.com": ["centre-left", "San Jose Mercury News"],
            "https://www.sciencedaily.com": ["centre", "Science Daily"],
            "https://www.scientificamerican.com": ["centre", "Scientific American"],
            "https://www.sfweekly.com": ["centre", "SF Weekly"],
            "https://www.sfgate.com": ["centre-left", "SFGate"],
            "https://www.skyhinews.com": ["centre-left", "Sky-Hi Daily News"],
            "https://slate.com": ["left", "Slate"],
            "https://www.smerconish.com": ["centre", "Smerconish"],
            "https://www.socialistalternative.org": ["left", "Socialist Alternative"],
            "https://socialistproject.ca": ["left", "The Bullet"],
            "https://splinternews.com": ["left", "Splinter"],
            "https://www.spokesman.com": ["centre-left", "Spokesman Review"],
            "https://www.state-journal.com": ["centre-left", "State Journal"],
            "https://storycorps.org": ["centre", "StoryCorps"],
            "https://www.tallahassee.com": ["centre", "Tallahassee Democrat"],
            "https://techcrunch.com": ["centre", "TechCrunch"],
            "https://www.teenvogue.com": ["centre-left", "Teen Vogue"],
            "https://www.amnews.com": ["centre-left", "The Advocate-Messenger"],
            "https://www.theamericanconservative.com": ["centre-right", "The American Conservative"],
            "https://www.theatlantic.com": ["centre-left", "The Atlantic"],
            "https://www.bostonglobe.com": ["centre-left", "The Boston Globe"],
            "https://www.kentuckynewera.com": ["centre-left", "The Cadiz Record"],
            "https://www.canyoncountryzephyr.com": ["left", "The Canyon Country Zephyr"],
            "https://www.thecollegefix.com": ["right", "The College Fix"],
            "https://www.commercialappeal.com": ["centre-left", "The Commercial Appeal"],
            "https://www.courier-journal.com": ["centre-left", "The Courier-Journal"],
            "https://dailycaller.com": ["right", "The Daily Caller"],
            "https://www.dailysignal.com": ["right", "The Daily Signal"],
            "https://www.dailywire.com": ["right", "The Daily Wire"],
            "https://www.dallasnews.com": ["centre", "The Dallas Morning News"],
            "https://www.delcotimes.com": ["centre-left", "The Delaware County Daily Times"],
            "https://www.economist.com": ["centre-left", "The Economist"],
            "https://www.theepochtimes.com": ["right", "The Epoch Times"],
            "https://thefederalist.com": ["right", "The Federalist"],
            "https://thefulcrum.us": ["centre", "The Fulcrum"],
            "https://www.thegatewaypundit.com": ["right", "The Gateway Pundit"],
            "https://www.theguardian.com": ["centre-left", "The Guardian"],
            "https://www.heritage.org": ["centre-right", "The Heritage Foundation"],
            "https://thehill.com": ["centre", "The Hill"],
            "https://www.independent.co.uk": ["centre-left", "The Independent"],
            "https://theintercept.com": ["left", "The Intercept"],
            "https://www.jpost.com": ["centre", "The Jerusalem Post"],
            "https://www.thejustice.org": ["centre-left", "The Justice"],
            "https://www.koreaherald.com": ["centre", "The Korea Herald"],
            "https://thelibertarianrepublic.com": ["centre-right", "The Libertarian Republic"],
            "https://www.thenation.com": ["left", "The Nation"],
            "https://www.newyorker.com": ["left", "The New Yorker"],
            "https://observer.com": ["centre", "The New York Observer"],
            "https://www.inquirer.com": ["centre-left", "The Philadelphia Inquirer"],
            "https://thepostmillennial.com": ["centre-right", "The Post Millennial"],
            "https://www.redandblack.com": ["centre", "The Red and Black"],
            "https://www.gop.com": ["centre", "The Republican Party"],
            "https://www.thefirsttv.com": ["right", "The First TV"],
            "https://www.sacbee.com": ["centre-left", "The Sacramento Bee"],
            "https://www.saturdayeveningpost.com": ["centre", "The Saturday Evening Post"],
            "https://www.telegraph.co.uk": ["centre-right", "The Telegraph "],
            "https://www.texasobserver.org": ["centre-left", "The Texas Observer"],
            "https://www.theverge.com": ["centre-left", "The Verge"],
            "https://theweek.com": ["centre", "The Week "],
            "https://www.weeklystandard.com": ["right", "The Weekly Standard"],
            "https://www.theblaze.com": ["right", "Blaze Media"],
            "https://archive.thinkprogress.org": ["left", "ThinkProgress"],
            "https://time.com": ["centre-left", "Time Magazine"],
            "https://townhall.com": ["right", "Townhall"],
            "https://www.truthorfiction.com": ["centre", "Truth or Fiction"],
            "https://www.truthdig.com": ["left", "Truthdig"],
            "https://truthout.org": ["centre-left", "TruthOut"],
            "https://www.usnews.com": ["centre-left", "U.S. News & World Report"],
            "https://www.univision.com": ["centre-left", "Univision"],
            "https://www.upworthy.com": ["left", "Upworthy"],
            "https://www.usatoday.com": ["centre", "USA TODAY"],
            "https://www.vanityfair.com": ["centre-left", "Vanity Fair"],
            "https://www.vice.com": ["left", "Vice"],
            "https://justfacts.votesmart.org": ["centre", "Vote Smart"],
            "https://www.vox.com": ["left", "Vox"],
            "https://vtdigger.org": ["centre-left", "VT Digger"],
            "https://www.wakeuptopolitics.com": ["centre", "Wake Up to Politics"],
            "https://www.wsj.com": ["centre", "Wall Street Journal"],
            "https://www.wandtv.com": ["centre", "WANDTV"],
            "https://www.washingtonexaminer.com": ["centre-right", "Washington Examiner"],
            "https://freebeacon.com": ["right", "Washington Free Beacon"],
            "https://washingtonmonthly.com": ["centre-left", "Washington Monthly"],
            "https://www.washingtonpost.com": ["centre-left", "Washington Post"],
            "https://www.washingtontimes.com": ["centre-right", "Washington Times"],
            "https://www.westernjournal.com": ["right", "The Western Journal"],
            "https://www.wfae.org": ["centre", "WFAE"],
            "https://www.wgbh.org": ["centre", "WGBH"],
            "https://wgntv.com": ["centre", "WGN"],
            "https://www.whatfinger.com": ["right", "Whatfinger News"],
            "https://www.wisconsingazette.com": ["centre-left", "Wisconsin Gazette"],
            "https://www.wnd.com": ["right", "WorldNetDaily"],
            "https://news.yahoo.com": ["centre-left", "Yahoo! News"],
            "https://www.yesmagazine.org": ["left", "Yes! Magazine"],
        }

        if (bias[origin] === undefined){
            alert("Sorry, but we haven't been able to conclude the bias on " + origin)
        }
        else {
            val_website = bias[origin]
            alert(val_website[1] + " is known to hold views falling on the " + val_website[0] + " of the political bias spectrum. ")
        }

    });
});