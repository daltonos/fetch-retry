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
        return Promise.reject("tryFailed");
    }
};


fetchWithRetry(req, 3)
    .then((response) => console.log(response, "Request has been successful"))
    .catch((err) => { console.log(err, "All retries failed"); });
