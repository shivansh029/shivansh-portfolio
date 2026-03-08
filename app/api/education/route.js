export async function GET(request) {
    const educationData = [
        {
            institution: "Oriental Institute of Science and Technology",
            degree: "B.E. in Information Technology",
            duration: "Aug 2015 – Jun 2019",
            description: "My journey into tech started with a B.E. in Information Technology, where I learned the fundamentals before diving deeper into software engineering and problem solving to build real world systems."
        },
        {
            institution: "Scaler Academy",
            degree: "Specialization in Software Development & Problem Solving",
            duration: "Oct 2020 – Oct 2021",
            description: ""
        }
    ];

    return Response.json(educationData, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}
