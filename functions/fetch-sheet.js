const { google } = require('googleapis');

exports.handler = async (event, context) => {
    try {
        // Debugging: Log variabel lingkungan dan ID spreadsheet
        console.log("Google Client Email:", process.env.GOOGLE_CLIENT_EMAIL);
        console.log("Spreadsheet ID:", "12lMzDGZ0f3ZNCRuGxPjCU4d51nAj9T8t2qkkrgnYUik");

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = '12lMzDGZ0f3ZNCRuGxPjCU4d51nAj9T8t2qkkrgnYUik';
        const range = 'Sheet1!B2';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const htmlString = response.data.values[0][0];
        if (!htmlString) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "No data found in the specified cell" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ htmlString }),
        };
    } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
