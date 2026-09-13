function ApplicationCard({ application, onDelete, onEdit }) {
  return (
    <div className="application-card">
      <div>
        <h3>{application.company}</h3>
        <p>{application.role}</p>
      </div>

      <span>{application.status}</span>

      <p>{application.location}</p>

      {application.jobUrl && (
        <a href={application.jobUrl} target="_blank" rel="noreferrer">
          View Job
        </a>
      )}

      <div>
        <button onClick={() => onEdit(application)}>Edit</button>

        <button onClick={() => onDelete(application._id)}>Delete</button>
      </div>
    </div>
  );
}

export default ApplicationCard;
