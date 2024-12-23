export async function GET(){
    const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
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
        console.log(data);
        return new Response(data,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    else{
        return new Response({
            message: "Our system is on maintanence! Please keep some patience!"
        },{
            status: 500
        })
    }

}