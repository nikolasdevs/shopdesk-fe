// type Organization = {
//   name: string;
//   id: string;
// };

// export async function getOrganization(): Promise<Organization[] | null> {
//   try {
//     const response = await fetch("api/organization", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//       },
//     });
//     if (!response.ok) throw new Error("Failed to get organizations");
//     const organizations = await response.json();
//     return organizations.data;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error:", error.message);
//     } else {
//       console.error("Error:", error);
//     }
//     return null;
//   }
// }
