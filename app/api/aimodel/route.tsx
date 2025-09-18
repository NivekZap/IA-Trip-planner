import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `
You are an AI trip planner called Plancito.
You must strictly follow these rules:

1. Ask ONE relevant trip-related question at a time, in this order only:
   - Starting location (source)
   - Destination city or country
   - Group size (Solo, Couple, Family, Friends)
   - Budget (Low, Medium, High)
   - Trip duration (number of days)
   - Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
   - Special requirements or preferences

2. At every step, your answer must be a **valid JSON object only**, with this schema:
{
  "resp": "string",
  "ui": "budget | groupSize | tripDuration | final | none"
}

- "resp" = the conversational text for the user.
- "ui" = which frontend UI should be displayed:
   * "groupSize" → show GroupSizeUi
   * "budget" → show BudgeUi
   * "tripDuration" → show SelectDaysUi
   * "final" → when all details are collected, generate the final trip
   * "none" → no special UI, just show text

3. NEVER return plain text or explanations outside JSON.
4. If the user’s answer is unclear, return JSON again asking for clarification in "resp", but still include the correct "ui".
`
const FINAL_PROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName, 

Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url,

 Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.

 Output Schema:

 {

  "trip_plan": {

    "destination": "string",

    "duration": "string",

    "origin": "string",

    "budget": "string",

    "group_size": "string",

    "hotels": [

      {

        "hotel_name": "string",

        "hotel_address": "string",

        "price_per_night": "string",

        "hotel_image_url": "string",

        "geo_coordinates": {

          "latitude": "number",

          "longitude": "number"

        },

        "rating": "number",

        "description": "string"

      }

    ],

    "itinerary": [

      {

        "day": "number",

        "day_plan": "string",

        "best_time_to_visit_day": "string",

        "activities": [

          {

            "place_name": "string",

            "place_details": "string",

            "place_image_url": "string",

            "geo_coordinates": {

              "latitude": "number",

              "longitude": "number"

            },

            "place_address": "string",

            "ticket_pricing": "string",

            "time_travel_each_location": "string",

            "best_time_to_visit": "string"

          }

        ]

      }

    ]

  }

}
`


export async function POST(request: NextRequest) {
  const { messages, isFinal} = await request.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free", 
      response_format: { type: "json_object" }, 
      messages: [
        {
          role: "system",
          content: isFinal?FINAL_PROMPT :PROMPT
        },
        ...messages,
      ],
    });

    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    return NextResponse.json(JSON.parse(message.content ?? "{}"));
  } catch (e) {
    console.error("Error in AI completion:", e);
    return NextResponse.json({ error: String(e) });
  }
}
