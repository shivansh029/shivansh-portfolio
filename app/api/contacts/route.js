export async function GET(request) {
  const contactMediums = [
    {
      medium: "call / whatsapp",
      username: "+91-7415337201",
      link: "tel:+917415337201",
    },
    {
      medium: "email",
      username: "mail@shivansh_verma",
      link: "mailto:verma.ansh96@gmail.com",
    },
    {
      medium: "linkedin",
      username: "shivansh-verma",
      link: "https://www.linkedin.com/in/shivansh-verma/",
    },
    {
      medium: "github",
      username: "shivansh029",
      link: "https://github.com/shivansh029",
    },
    {
      medium: "instagram",
      username: "shivansh029",
      link: "https://www.instagram.com/shivansh.29/",
    },
  ];

  return Response.json(contactMediums, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
