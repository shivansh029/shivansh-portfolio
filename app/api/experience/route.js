export async function GET(request) {
    const experienceData = [
        {
            company: "Sigmoid Analytics",
            role: "Software Development Engineer II",
            duration: "Dec 2021 – Feb 2026",
            location: "Bengaluru, India",
            projects: [
                {
                    name: "Goldman Sachs — Global Banking & Markets",
                    highlights: [
                        "Re-engineered legacy stored procedures into Spark 3 refiners integrated with Snowflake.",
                        "Improved backend data processing performance by 25%.",
                        "Removed redundant staging pipelines and duplicate PII datasets to improve governance.",
                        "Optimized Spring Batch workflows ensuring reliable business-date batch execution."
                    ]
                },
                {
                    name: "Goldman Sachs — Compliance Engineering",
                    highlights: [
                        "Reduced surveillance job runtime by 75% (8h → 2h) via code refactoring.",
                        "Built secure encrypted data cloning pipelines replicating ~2TB production datasets to UAT.",
                        "Developed Spring Boot REST APIs serving 50K+ requests/day with <200ms latency.",
                        "Built reporting pipelines analyzing millions of customer activities for operational insights."
                    ]
                }
            ]
        },
        {
            company: "Infosys",
            role: "Systems Engineer",
            duration: "Oct 2019 – Oct 2021",
            location: "Pune, India",
            projects: [
                {
                    name: "Docker Image Vulnerability Scanner",
                    highlights: [
                        "Built an internal vulnerability scanner using Python, Flask, and Trivy.",
                        "Automated container security validation for enterprise Docker images.",
                        "Deployed internally using Nginx with secure access and high availability.",
                        "Adopted across 3 global locations with 780+ active users."
                    ]
                }
            ]
        }
    ];

    return Response.json(experienceData, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}
