export async function GET(request) {
    const aboutData = {
        content: `
      Hey there!<br/><br/>I’m Shivansh Verma, a Software Engineer who enjoys building scalable backend systems, clean APIs, and reliable services that keep applications running smoothly behind the scenes.
      <br/><br/>
      I spend most of my time working with Java and Spring Boot, designing backend architectures, RESTful services, and distributed data workflows. I’m particularly interested in distributed systems, performance optimization, and making systems faster, more reliable, and easier to scale.
      <br/><br/>
      When I’m not debugging the occasional “this should never happen” production issue, I’m usually thinking about better system design, cleaner abstractions, and how to make backend systems a little more efficient than they were yesterday.
    `
    };

    return Response.json(aboutData, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}
