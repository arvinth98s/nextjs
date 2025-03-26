import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

type Date = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
}


async function fetchData(query = "") {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/search?q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    cache: "no-store", // Ensures fresh data on every request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


export default async function Home({ searchParams }: Props) {
  const { q } = await searchParams;

  const data = await fetchData(q || "");

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-4">Server-Side Rendered Search</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchResults data={data.results} />
      </Suspense>
    </main>
  );
}

function SearchResults({ data }: { data: Date[] }) {
  return (
    <ul className="space-y-4">
      {data.length > 0 ? (
        data.map((item) => (
          <li key={item.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <p className="text-green-600 font-bold">${item.price}</p>
          </li>
        ))
      ) : (
        <p>No results found</p>
      )}
    </ul>
  );
}
