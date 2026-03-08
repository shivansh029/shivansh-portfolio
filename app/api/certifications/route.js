export async function GET(request) {
    const certificationsData = [
        {
            name: "Red Hat Certified Architect in Infrastructure",
            id: "160-081-162"
        },
        {
            name: "AWS Certified Cloud Practitioner",
            id: "6CSCVN3DNJQ41ESN"
        }
    ];

    return Response.json(certificationsData, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
}
