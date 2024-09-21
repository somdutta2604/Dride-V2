import { randomUUID } from "crypto";
import { NextResponse } from "next/server";




const BASE_URL="https://api.mapbox.com/search/searchbox/v1/retrieve/"

export async function GET(request:Request) {

    const session_token = randomUUID()     

    const {searchParams} = new URL(request.url)

    const mapbox_id = searchParams.get('map_id')
    const res = await fetch(`${BASE_URL}${mapbox_id}?session_token=${session_token}&&access_token=${process.env.MAPBOXACCESS_TOKEN}`,
    {
        headers:{
            "Content-Type":"application/json"
        }
    }
    )

    const searchResult = await res.json()


    return NextResponse.json(searchResult)
}