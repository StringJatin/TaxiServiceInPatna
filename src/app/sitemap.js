const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
export default async function sitemap() {
    const mainUrl = `${process.env.DOMAIN}`;
  const baseUrl = `${process.env.DOMAIN}/api/getPosts`;
  const baseUrlCity = `${process.env.DOMAIN}/api/getCity`;
  const baseUrlRoute =`${process.env.DOMAIN}/api/getRoute`;
  async function getData() {
    try {
      const res = await fetch(`${process.env.DOMAIN}/api/getPosts`, {
        cache: "no-store",
      });
      if (!res.ok) {
        console.log("Failed to fetch data. Response status:", res.status);
        throw new Error("Failed to fetch data");
      }

      const postData = await res.json();
      
      return postData;
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  }
  const data = await getData();
 
  // const postUrls = data.map((post) => ({
  //   url: `http://localhost:3000/blog/${post.customUrl}`,
  //   lastModified: post.updatedAt,
  // }));
  const postUrls = (await getData(baseUrl)).map((post) => ({
    url: `${mainUrl}/blog/${post.customUrl}`,
    lastModified: lastWeek.toISOString(), // Set to one week ago
    priority: 0.80,
  }));
  // to get city data
  async function getCityData() {
    try {
      const res = await fetch(`${process.env.DOMAIN}/api/getCity`, {
        cache: "no-store",
      });
      if (!res.ok) {
        console.log("Failed to fetch data. Response status:", res.status);
        throw new Error("Failed to fetch data");
      }

      const postData = await res.json();
      return postData;
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  }
  const cityData = await getCityData();
 
  const cityUrls = cityData.map((post) => ({
    url: `${process.env.DOMAIN}/city/${post.customUrl}`,
    lastModified: lastWeek.toISOString(), // Set to one week ago
    priority: 0.80,
  }));




  // end
 
  // to get routess
  async function getRouteData() {
    try {
      const res = await fetch(`${process.env.DOMAIN}/api/getRoute`, {
        cache: "no-store",
      });
      if (!res.ok) {
        console.log("Failed to fetch data. Response status:", res.status);
        throw new Error("Failed to fetch data");
      }

      const postData = await res.json();
      return postData;
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  }
  const routeData = await getRouteData();
 
  const routeUrls = routeData.map((post) => ({
    url: `${process.env.DOMAIN}/route/${post.customUrl}`,
    lastModified: lastWeek.toISOString(), // Set to one week ago
    priority: 0.80,
  }));




  return [
    { url : `${mainUrl}/aboutUs`, lastModified: new Date(),priority: 0.80},
    { url : `${mainUrl}/blog`, lastModified: new Date(),priority: 0.80},
    { url : `${mainUrl}/city`, lastModified: new Date(),priority: 0.80},
    { url : `${mainUrl}/route`, lastModified: new Date(),priority: 0.80},
    { url : `${mainUrl}/contactUs`, lastModified: new Date(),priority: 0.80},
    { url : `${mainUrl}/ourServices`, lastModified: new Date(),priority: 0.80},
    { url : `${mainUrl}/login`, lastModified: new Date(),priority: 0.80},
    { url : `${mainUrl}/dashboard`, lastModified: new Date(),priority: 0.80},
    { url: baseUrl, lastModified: new Date(),priority: 0.80 },
    { url: baseUrlCity, lastModified: new Date() ,priority: 0.80},
    { url: baseUrlRoute, lastModified: new Date(),priority: 0.80 },
    { url: `${baseUrl}/about`, lastModified: new Date(),priority: 0.80 },

    ...postUrls,...cityUrls,...routeUrls
  ]
}