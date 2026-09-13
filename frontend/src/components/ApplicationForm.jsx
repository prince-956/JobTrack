import { useEffect, useState } from "react";
import axios from "axios";

function ApplicationForm({ applicationToEdit, onApplicationSaved }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Saved",
    location: "",
    jobUrl: "",
    notes: "",
    appliedDate: "",
  });

  useEffect(() => {
    if (applicationToEdit) {
      setFormData({
        company: applicationToEdit.company || "",
        role: applicationToEdit.role || "",
        status: applicationToEdit.status || "Saved",
        location: applicationToEdit.location || "",
        jobUrl: applicationToEdit.jobUrl || "",
        notes: applicationToEdit.notes || "",
        appliedDate: applicationToEdit.appliedDate
          ? applicationToEdit.appliedDate.substring(0, 10)
          : "",
      });
    }
  }, [applicationToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (applicationToEdit) {
        await axios.put(
          `http://localhost:5000/api/applications/${applicationToEdit._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert("Application updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/applications", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Application added successfully!");
      }

      setFormData({
        company: "",
        role: "",
        status: "Saved",
        location: "",
        jobUrl: "",
        notes: "",
        appliedDate: "",
      });

      onApplicationSaved();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="application-form">
      <h2>{applicationToEdit ? "Edit Application" : "Add Application"}</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="url"
          name="jobUrl"
          placeholder="Job URL"
          value={formData.jobUrl}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
        />

        <button type="submit">
          {applicationToEdit ? "Update Application" : "Add Application"}
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;
