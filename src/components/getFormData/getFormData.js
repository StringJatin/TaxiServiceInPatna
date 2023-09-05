
import React from 'react'


async function getData() {
  const res = await fetch("http://localhost:3000/api/formdata" , {
    method: 'GET',
    cache : "no-store",
  })
  if(!res.ok){
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const Blog = async() => {
  const data = await getData();
  return (
    <div >
      {data.map((item) =>(
    <p>{item.date}</p>
      ))}
    </div>
  )
}

export default Blog