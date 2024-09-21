import { randomUUID } from "crypto";
import { NextResponse } from "next/server";




const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest"

export async function GET(request:Request) {

    const session_token = randomUUID()
    console.log(session_token)   

    const {searchParams} = new URL(request.url)

    const searchText =  searchParams.get('q');

    const res = await fetch(`${BASE_URL}?q=${searchText}?language=en&limit=8&session_token=${session_token}&country=IN&access_token=${process.env.MAPBOXACCESS_TOKEN}`,
    {
        headers:{
            "Content-Type":"application/json"
        }
    }
    )

    const searchResult = await res.json()


    return NextResponse.json(searchResult)
}