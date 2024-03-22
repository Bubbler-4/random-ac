browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { query, count } = message;
    const queryUrl = 'https://solved.ac/api/v3/search/problem?query=' + encodeURIComponent(query) + '&page=1&sort=random';
    (async () => {
        const response = await fetch(queryUrl);
        const responseJson = await response.json();
        const problems = responseJson.items.slice(0, count).map(x => x.problemId);
        return problems;
    })().then(sendResponse);
    return true;
});