chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { query, count } = message;
    const queryUrl = 'https://solved.ac/api/v3/search/problem?query=' + encodeURIComponent(query) + '&page=1&sort=random';
    (async () => {
        const response = await fetch(queryUrl);
        const responseJson = await response.json();
        const problems = responseJson.items.slice(0, count).map(x => x.problemId);

        if (problems.length === 0) {
            return { isSuccess: false, errorMessage: '검색 결과가 없습니다. 다른 쿼리를 입력해 보세요.' };
        }

        if (problems.length < count) {
            return {
                isSuccess: false,
                errorMessage: `검색 결과로 나온 문제 수가 ${problems.length}문제로, 요청하신 문제 수인 ${count}문제보다 적습니다. 문제 수를 줄이거나, 다른 쿼리를 사용해 보세요.`
            };
        }

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

        return { isSuccess: true, problems };
    })().then(sendResponse);
    return true;
});
