const fetchWithRetry = (req, maxRetries) => {
    if (maxRetries > 0) {
        maxRetries -= 1;
        return new Promise((rResolve, rReject) => {
            fetch(req)
                .then(() => { rResolve("tryWorked") })
                .catch(() => {
                    fetchWithRetry(req, maxRetries);
                });
        });
    } else {
        Promise.reject("tryFailed");
    }
};


fetchWithRetry(req, 3)
    .then(() => console.log(response, "Request has been successful"))
    .catch(() => { console.log(err, "All retries failed"); });
