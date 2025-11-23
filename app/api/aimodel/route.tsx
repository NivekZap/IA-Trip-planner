import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { aj } from "../arcjet/route";
import { currentUser } from "@clerk/nextjs/server";


export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `
You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

 Only ask questions about the following details in order, and wait for the user’s answer before asking the next: 

1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/TripDuration/Final) , where Final means AI generating complete final outpur
Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:

{

resp:'Text Resp',

ui:'budget/groupSize/TripDuration/Final)'

}

`;
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


export async function POST(req: NextRequest) {
  const { messages, isFinal} = await req.json();
  const user=await currentUser();
  const decision = await aj.protect(req, { userId:user?.primaryEmailAddress?.emailAddress??'', requested: isFinal?5:0 }); // Deduct 5 tokens from the bucket
  //@ts-ignore
  if(decision?.reason?.remaining==0) {
    return NextResponse.json({
      resp:'no tienes creditos',
      ui: 'limit'
    })

  }

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
