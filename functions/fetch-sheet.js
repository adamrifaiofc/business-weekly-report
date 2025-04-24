const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const spreadsheetId = "12lMzDGZ0f3ZNCRuGxPjCU4d51nAj9T8t2qkkrgnYUik";
    const range = "Sheet1!B2";
    const apiKey = "AIzaSyB6A9qsC-Zcb4JPifR8Lxq4u6PevTPdkIg";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `HTTP error! status: ${response.status}` }),
            };
        }
        const data = await response.json();
        if (!data.values || !data.values[0] || !data.values[0][0]) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No data in specified range (B2)" }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ htmlString: data.values[0][0] }),
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
