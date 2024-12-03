import { useEffect, useState } from "react"

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/json-data.json");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDownload = async () => {
    if (!data) return;
    try {
      const response = await fetch("https://testd5-img.azurewebsites.net/api/imgdownload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api: data.api_secret }),
      });
      const result = await response.json();
      const link = document.createElement("a");
      link.href = `data:image/png;base64,${result.image}`;
      link.download = "downloaded_image.png";
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="card">
        <h2>Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button className="button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
