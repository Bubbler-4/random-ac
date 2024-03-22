chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { query, count } = message;
    const queryUrl = 'https://solved.ac/api/v3/search/problem?query=' + encodeURIComponent(query) + '&page=1&sort=random';
    (async () => {
        const response = await fetch(queryUrl);
        const responseJson = await response.json();
        const problems = responseJson.items.slice(0, count).map(x => x.problemId);

        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: (problems) => {
                problems.forEach(problem => {
                    problem_add(problem, 1);
                });
            },
            args: [problems],
            world: 'MAIN',
        });
        return problems;
    })().then(sendResponse);
    return true;
});