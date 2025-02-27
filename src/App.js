import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";

const App = () => {
  // ✅ State for Form Inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  // ✅ State for managing fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validate Form Inputs
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.age || isNaN(formData.age) || formData.age < 1)
      newErrors.age = "Age must be a valid number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmittedData(formData);
    setFormData({ name: "", email: "", age: "" }); // Reset form
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6 bg-gray-100 min-h-screen">
      {/* 🏠 Card 1: Welcome Message */}
      <Card title="Welcome to My App" description="Handling Forms in React">
        <Button label="Say Hello" onClick={() => alert("Hello!")} />
      </Card>

      {/* 🏠 Card 2: User Form with Controlled Inputs */}
      <Card title="User Registration" description="Fill in the details below:">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name..."
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email..."
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <Input
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age..."
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}

          <Button label="Submit" type="submit" />
        </form>
      </Card>

      {/* 🏠 Card 3: Display Submitted Form Data */}
      {submittedData && (
        <Card title="Submitted Data" description="Here is what you entered:">
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
        </Card>
      )}

      {/* 🏠 Card 4: Fetched Data */}
      <Card title="Fetched Posts" description="Latest 5 Posts from API">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.map((post) => (
              <li key={post.id} className="mb-2 text-gray-800">
                <strong>{post.title}</strong>: {post.body}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default App;
