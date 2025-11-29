import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

 const fetchNews = async () => {
  const response = await fetch(`http://localhost:5000/api/news?q=${searchTerm || "latest"}`);
  return response.json();
};


  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["news", searchTerm],
    queryFn: fetchNews,
    enabled: false, // ❗ don't fetch automatically
  });

  return (
    <div className="p-6">

     <div className="place-self-center">
       <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={() => refetch()}
        className="bg-blue-600 text-white p-2 rounded ml-2"
      >
        Search
      </button>
     </div>

      {isLoading && <p className="text-gray-500 text-center">Loading…</p>}
      {error && <p className="text-red-500 text-center">Error fetching news</p>}

      <h1 className="text-4xl text-red-500 font-bold mb-6 mt-4 text-center">Latest News</h1>
      <h2 className="text-2xl text-blue-500 font-semibold mb-4 mt-2 text-center">News about {searchTerm}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.articles?.slice(0).map((item, index) => (
          <div key={index} className="p-4 bg-white rounded-xl shadow-md">
            {item.urlToImage ? (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="h-40 w-full object-cover rounded-md"
              />
            ) : (
              <div className="h-40 bg-gray-200 rounded-md"></div>
            )}

            <h3 className="font-semibold text-lg mt-3">{item.title}</h3>

            <p className="text-sm text-gray-600 mt-2">
              {item.description || "No description available."}
            </p>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline mt-2 inline-block"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
