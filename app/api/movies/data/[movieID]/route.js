export async function GET(request,{params}){
    const {movieID}=await params;
    const url = `https://api.themoviedb.org/3/movie/${movieID}`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_Read_Token}`
    }
    };

    const movieData=await fetch(url,options);

    
    if(movieData.status===200){
        const data=await movieData.json();
        return Response.json(data);
    }

    else{
        return new Response({
            message: "Our system is on maintanence! Please keep some patience!"
        },{
            status: 500
        })
    }

}