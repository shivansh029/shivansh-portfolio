export async function GET(request) {
    const skillsData = {
        overview: "I specialize in building robust backend systems and data pipelines. My core expertise lies in:",
        categories: [
            { name: "Languages", skills: ["Java", "J2EE", "Python", "Golang"] },
            { name: "Frameworks", skills: ["Spring Boot", "Hadoop", "Flask", "React"] },
            { name: "Cloud & Infra", skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes"] },
            { name: "Data & DB", skills: ["MySQL", "PostgreSQL", "Apache Spark", "Snowflake", "HBase"] },
            { name: "Tools", skills: ["Jenkins", "Maven", "Git", "Postman", "JUnit/Mockito"] }
        ]
    };

    return Response.json(skillsData, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}
