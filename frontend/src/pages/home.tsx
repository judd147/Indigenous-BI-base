const HomePage = () => {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Indigenous BI</h1>
        <p className="text-gray-600">Your one-stop dashboard for actionable insights and data analytics.</p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2>Total Projects</h2>
          <p className="text-2xl font-bold text-indigo-600">1,234</p>
          <p className="text-sm text-gray-500">Last updated: 1 day ago</p>
        </div>
        <div className="card">
          <h2>Active Contracts</h2>
          <p className="text-2xl font-bold text-indigo-600">567</p>
          <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
        </div>
        <div className="card">
          <h2>Total Vendors</h2>
          <p className="text-2xl font-bold text-indigo-600">$12,345,678</p>
          <p className="text-sm text-gray-500">Last updated: 3 days ago</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;