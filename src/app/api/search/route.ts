
import { NextRequest, NextResponse } from 'next/server';
const dummyData = generateDummyData(100);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  console.log(dummyData)

  if (!query) {
    return NextResponse.json({ results: dummyData }, { status: 200 }); // Return all data if query is empty
  }

  const filteredData = dummyData.filter((item) =>
    item.category.toLowerCase().includes(query)
  );

  return NextResponse.json({ results: filteredData.slice(0, 100) });
}



function generateDummyData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
    category: ['Electronics', 'Books', 'Clothing', 'Toys'][i % 4],
  }));
}