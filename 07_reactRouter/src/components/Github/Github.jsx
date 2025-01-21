import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
function Github() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://api.github.com/users/shohan2032")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     });
  // }, []);
  const data = useLoaderData();
  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
      {/* Name: {data.name}
      <br />
      Followers: {data.followers}
      <br />
      Public Repositories: {data.public_repos}
      <br />
      Bio: {data.bio || "No bio available"}
      <br />
      Company: {data.company || "No company information"}
      <br />
      Location: {data.location || "No location provided"}
      <img
        className="w-32 h-32 m-4"
        src={data.avatar_url}
        alt="Github Profile Picture"
      /> */}
      {Object.entries(data).map(([key, value]) => {
        if (
          key === "name" ||
          key === "followers" ||
          key === "public_repos" ||
          key === "bio" ||
          key === "company" ||
          key === "public_repos"
        ) {
          return (
            <div key={key}>
              {key}: {value}
            </div>
          );
        }
      })}
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/shohan2032");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
};
