// import axios from "axios";
import Papa from "papaparse";
// const API_URL = "https://your-database-api-url.com/events";

// export const getEvents = async () => {
//   try {
//     // const response = await axios.get(API_URL);
//     // return response.data;
//     return [
//       {
//         id: 1,
//         title: "Summer Music Festival",
//         date: "2025-06-15",
//         description: "Enjoy live music from top artists in the park.",
//         category: "Concerts",
//       },
//       {
//         id: 2,
//         title: "City Marathon",
//         date: "2025-07-01",
//         description: "Join the annual city marathon and run for a cause.",
//         category: "Sports",
//       },
//       {
//         id: 3,
//         title: "Art Expo",
//         date: "2025-06-20",
//         description: "Explore modern art from local and international artists.",
//         category: "Art",
//       },
//       {
//         id: 4,
//         title: "Food Truck Fiesta",
//         date: "2025-06-25",
//         description: "Taste delicious food from the best food trucks in town.",
//         category: "Food",
//       },
//     ];
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     throw error;
//   }
// };

export const getEvents = async () => {
  const response = await fetch("/data/Events.csv");
  const csvText = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
        // Assuming your CSV column is named "date" or "Event Date"
        const filtered = results.data.filter(
          (event) =>
            (event.date && event.date === today) ||
            (event["Event Date"] && event["Event Date"] === today)
        );
        resolve(filtered);
      },
      error: (err) => reject(err),
    });
  });
};
