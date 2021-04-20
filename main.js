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

        var websites = [
            'https://www.aarp.org',
            'https://abcnews.go.com',
            'https://www.abridgenews.com',
            'https://www.aim.org',
            'https://www.aclu.org',
            'https://www.ajplus.net',
            'https://www.aljazeera.com',
            'https://www.alternet.org',
            'https://www.conservative.org',
            'https://www.aei.org',
            'https://amgreatness.com',
            'https://spectator.org',
        ]

        var bias = {
            'https://www.aarp.org' : 'center',
            'https://abcnews.go.com' : 'right',
            'https://www.abridgenews.com': 'right',
            'https://www.aim.org': 'right',
            'https://www.aclu.org': 'right',
            'https://www.ajplus.net': 'right',
            'https://www.aljazeera.com': 'right',
            'https://www.alternet.org': 'left',
            'https://www.conservative.org': 'right',
            'https://www.aei.org': 'right',
            'https://amgreatness.com': 'right',
            'https://spectator.org': 'right',
        }
        var known_url = websites.includes(origin);

        // alert(known_url)

        if (known_url == true){
            var bias_val = bias[origin]
            alert(origin + " is known to hold views falling on the" + bias_val + " of the political bias spectrum. ")
        }
        else if (known_url == false){
            alert("Sorry, but we haven't been able to conclude the bias on " + origin)
        }

    });
});