
export default async function sitemap() {
    const mainUrl = "http://localhost:3000";
  const baseUrl = "http://localhost:3000/api/getPosts";
  const baseUrlCity = "http://localhost:3000/api/getCity";
  const baseUrlRoute ="http://localhost:3000/api/getRoute";
  async function getData() {
    try {
      const res = await fetch("http://localhost:3000/api/getPosts", {
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
 
  const postUrls = data.map((post) => ({
    url: `http://localhost:3000/blog/${post.customUrl}`,
    lastModified: post.updatedAt,
  }));
  // to get city data
  async function getCityData() {
    try {
      const res = await fetch("http://localhost:3000/api/getCity", {
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
    url: `http://localhost:3000/city/${post.customUrl}`,
    lastModified: post.updatedAt,
  }));




  // end
 
  // to get routess
  async function getRouteData() {
    try {
      const res = await fetch("http://localhost:3000/api/getRoute", {
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
  const routeData = await getCityData();
 
  const routeUrls = routeData.map((post) => ({
    url: `http://localhost:3000/route/${post.customUrl}`,
    lastModified: post.updatedAt,
  }));




  return [
    { url : `${mainUrl}/aboutUs`, lastModified: new Date()},
    { url : `${mainUrl}/blog`, lastModified: new Date()},
    { url : `${mainUrl}/city`, lastModified: new Date()},
    { url : `${mainUrl}/route`, lastModified: new Date()},
    { url : `${mainUrl}/contactUs`, lastModified: new Date()},
    { url : `${mainUrl}/ourServices`, lastModified: new Date()},
    { url : `${mainUrl}/login`, lastModified: new Date()},
    { url : `${mainUrl}/dashboard`, lastModified: new Date()},
    { url: baseUrl, lastModified: new Date() },
    { url: baseUrlCity, lastModified: new Date() },
    { url: baseUrlRoute, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },

    ...postUrls,...cityUrls,...routeUrls
  ]
}
